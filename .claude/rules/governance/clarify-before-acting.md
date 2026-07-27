# Clarify Before Acting

When a request has more than one reasonable interpretation, or when proceeding requires an external value that the request does not pin down, surface the ambiguity in one sentence and ask before proceeding. Do not silently pick.

The discipline exists because an AI coding assistant that picks silently is taking an authorial decision the requestor did not delegate. If the silent pick matches what the requestor wanted, the work proceeds and no one notices. If it does not match, the requestor pays the cost of unwinding work that should never have started, and the trust relationship erodes.

A one-sentence clarification is cheap. An unwound implementation is expensive. The asymmetry justifies the discipline.

This rule applies to human collaborators (a junior developer should not invent a target branch when the senior did not specify one) and to AI coding assistants (an assistant should not pick a date format, a library version, a target branch, or a behavioural interpretation without surfacing the choice). The failure mode is more common with AI assistants because the assistant feels pressure to make forward progress and the silent pick looks like progress.

---

## What ambiguity looks like

Ambiguity is present when any of the following is true about the request:

1. **The request supports more than one reasonable interpretation**, and the two interpretations would lead to materially different implementations. "Make this run faster" could mean optimize the algorithm, parallelize, cache, or rewrite in a faster language; the implementations diverge.
2. **An external value is required and not stated**: a date, a timezone, a library version, a target branch, an output format, a file path, a permission level, a default behaviour for an edge case.
3. **A project-specific convention must be chosen**: whether the change warrants a CHANGELOG entry, whether to bump a per-document version, whether the work should land on a feature branch or a phase branch, whether tests are required for this kind of change.
4. **A trade-off must be made** that the requestor would reasonably want to weigh in on: backwards compatibility vs cleanliness, performance vs readability, breadth of fix vs scope of PR.
5. **The state of the world is unclear**: an unfamiliar branch exists, a lock file is present, a partially-applied migration is detected. The right response is investigate-then-ask, not "let me clean that up for you".

Ambiguity is not always present. A request with one clear interpretation, no missing external values, and no trade-offs needing user input is unambiguous; proceed.

---

## When to ask vs when to use sensible defaults

Asking the user about every micro-decision is itself a failure mode (the over-ask anti-pattern). The rule is not "ask about everything"; the rule is "ask when the ambiguity matters".

**The compute-first gate (check before asking when the answer is findable).** Before surfacing a question at all, apply one prior test: is the answer a findable fact the assistant can retrieve itself? A file location, a citation, a count, a version string, where a term is used in the corpus, whether a path exists, or what a document currently says are not ambiguities for the requestor to resolve; they are facts, retrievable with a `grep`, a file read, or a status call. When the answer is findable, neither ask nor guess: run the search or the read, and surface the answer (or a now-narrower question grounded in what was found), not the raw question. Asking the requestor for a fact the assistant could have computed spends their attention on work that was the assistant's to do, and it is the inverse of silent-picking: silent-picking takes a decision that was the requestor's, while asking-the-findable hands back a retrieval that was the assistant's. Both are discipline failures; the ask-vs-default test below governs only what survives this gate, the genuine ambiguities and authorial choices, never findable facts.

This is the action-side companion to the `validate-inference-before-action` rule: that rule says validate a state claim before acting on it; this gate says retrieve a findable fact before asking about it. Both substitute a cheap, concrete observation (a `grep`, a read, a status call) for an unnecessary step, a wrong guess in the one case, an unnecessary question in the other.

A useful test:

- **Ask** when the wrong choice would produce work the requestor would want to unwind, or when the choice has consequences beyond this PR (target branch, public API shape, dependency choice, security-sensitive default).
- **Default** when a sensible convention exists in the project, the language community, or the immediate context, and the cost of guessing wrong is bounded to a quick edit. Document the default in the response so the requestor can override it.

Examples of sensible defaults that do not require asking:

- File path conventions when the project already has a clear pattern (a new lint script goes in `tools/lint-*.py` if every other lint script does).
- Code style decisions already enforced by the project's linter or formatter.
- Test placement when the project's convention is unambiguous.

Examples that should be asked, not defaulted:

- The target branch when the project has more than one active development branch and the maintainer rotates between them.
- A new dependency, especially one not already present in the project.
- A breaking change to a public API, even if the breakage is "obviously correct".
- Whether a change warrants a CHANGELOG entry or qualifies for the documented opt-out trailer (see the change-tracking rule).

When in doubt, ask. The cost of one extra clarification is always lower than the cost of an unwound implementation.

---

## How to ask

A good clarification has four properties:

1. **One sentence**. The user reads one line, picks an answer, and the work proceeds. Multi-paragraph clarifications hide the actual decision and create friction.
2. **Named alternatives**. List two-to-four specific options, not "what should I do?". Open-ended questions push the work back onto the requestor; named alternatives let them pick.
3. **Recommended option, if one stands out**. Identify it as "(recommended)" and put it first. The requestor can accept the recommendation with a one-word confirmation or pick a different option.
4. **State the consequence**. One short clause explaining what each option implies, so the requestor can answer without re-reading the request.

A clarification is *not* a request to re-explain the original task. The requestor explained it; the assistant's job is to identify the specific ambiguity and resolve it with minimal friction.

When the toolchain offers a structured prompt (`AskUserQuestion`, an IDE picker, a chat-message option set), use it. Structured prompts make the decision auditable and reduce ambiguity in the answer.

---

## Prohibited anti-patterns

- **Silently picking**. The most common failure mode. The assistant infers what the requestor "probably" wanted, proceeds, and either gets it right (no one notices the silent pick) or gets it wrong (the requestor pays). Either way, the discipline is gone.
- **Asking after acting**. "I went ahead and used branch X; want me to switch?" is not a clarification; it is post-hoc consent-seeking. The work is already done and the friction of unwinding is real. Ask before, not after.
- **Asking trivia**. Pinging the user for every micro-decision that has a sensible default produces friction. The signal-to-noise erodes; eventually the user starts hand-waving "do whatever," which collapses the discipline back into silent picking.
- **Hiding the ambiguity in narration**. "I'll pick X, but let me know if that's not right" is a silent pick with a fig leaf. The fig leaf does not protect the user from the work being done wrong; it only protects the assistant from being told "you should have asked".
- **Treating a previously-given answer as durable when the scope has changed**. The user approved Option A for last week's task; that does not authorize Option A for this week's different task. Authorization stands for the scope specified, not beyond.
- **Combining a clarification with a leading recommendation that hides the trade-off**. "Should I do X (which is obviously what you want) or Y (which makes no sense)?" is not a clarification; it is theatre. Name the real alternatives honestly.
- **Asking a question that the user cannot answer without reading more than the question**. If the question requires the user to scroll back to context, you have failed to make it self-contained; restate the relevant context inline.
- **Asking for a findable fact**. Surfacing a question whose answer the assistant could retrieve itself (a file location, a citation, a count, a version, where a term appears in the corpus, what a document currently says) instead of running the `grep` or read and surfacing the answer. This spends the requestor's attention on the assistant's own retrieval work; it is the inverse of silent-picking and equally a discipline failure. Run the compute-first gate before forming any question.

---

## Tool-specific guidance for AI coding assistants

### Structured-question tools

When the toolchain provides a question primitive (e.g. `AskUserQuestion`), prefer it over open-ended chat. The primitive produces a structured answer that is easy to parse and audit. Pass:

- A complete, one-sentence question.
- 2-4 named options as a closed set; the user can still type a custom answer if the primitive supports it.
- A recommended option labelled `(recommended)` and listed first when one stands out.
- One-line `description` clauses per option explaining the consequence.

Do not ask "Is my plan ready?" or "Should I proceed?" via the question primitive. Use the plan-mode submit flow for those (see the gate-discipline rule about not making decorative gates).

### Plan mode

When the project has a plan-mode flow (`EnterPlanMode` / `ExitPlanMode` in Claude Code), use it for non-trivial requests:

1. Switch into plan mode with `EnterPlanMode` to indicate research-and-design without implementation.
2. While planning, use the question primitive for ambiguities the user must resolve.
3. Submit the plan only when ambiguities are resolved and the plan is implementable as-is.
4. Begin implementation only after plan approval.

A plan that hand-waves a choice ("I'll figure it out as I go") is not approved; the ambiguity must be resolved before submission.

### Investigation-first when state is unclear

If you encounter unexpected state (an unfamiliar branch, a lock file, a partially-applied migration, a stash with content), investigate before acting. Do not assume the state is debris; it may be the user's in-progress work. Once investigated, surface what you found and ask whether to preserve, resolve, or discard.

### Scope creep

If midway through a task you discover the request implicitly required a larger change than the request stated (touching files outside the request's scope, refactoring an interface to make the requested change work), pause and surface the scope expansion. Do not silently expand. The user may want the scope expansion; they may also want the request descoped to fit; the choice is theirs.

---

## Exception-handling protocol

The clarification discipline has natural exceptions:

- **Pre-authorized durable instructions**: a `CLAUDE.md` file, a project README, a documented runbook may pre-authorize classes of choices ("always use branch `develop` for non-release work"). Honour the pre-authorization; you do not need to re-ask. If the pre-authorization is silent on the current ambiguity, the discipline applies.
- **Emergency response**: when the user has explicitly invoked an urgent mode ("the build is broken in production, fix it now"), the bar for asking rises but does not disappear. Ask only about choices that materially change the response; default the rest and report.
- **Reversible exploration**: experimental work in a sandbox where the cost of a wrong choice is a redo. Default and report; do not ask. But do not confuse "this PR is reversible" with "this choice is reversible"; some choices (database migrations, public API changes) are not reversible even from a feature branch.

---

## Framework alignment

| Requirement | NIST SSDF | CSA CCM | ISO 27001 |
| --- | --- | --- | --- |
| Documented decisions before action | PO.1, PO.5 | GRC-01, GRC-04 | A.5.1, A.5.4 |
| Scope-bounded authorization | PO.5 | IAM-09 | A.5.15, A.5.18 |
| Investigation before destructive action | RV.1, RV.2 | TVM-01 | A.5.27, A.8.16 |
| Change-management for scope expansion | PO.5 | CCC-01 to 03 | A.5.4, A.8.32 |
