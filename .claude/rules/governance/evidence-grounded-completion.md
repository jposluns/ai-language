# Evidence-Grounded Completion Claims

Never declare a piece of work "done", "complete", "fixed", "shipped", "ready", "resolved", "merged-and-clean", or any synonym without evidence that supports the claim. The cost of an unsupported completion claim compounds: a downstream reader, reviewer, or operator trusts the claim and skips their own verification, and a defect that the claim missed proceeds further into the system.

This rule applies to human developers and to AI coding assistants equally; in practice it is binding more often on AI assistants, because the failure mode (declaring victory based on inference rather than observation) is the dominant pattern when an assistant feels pressure to summarize progress.

The rule is a discipline, not a vocabulary ban. The words above are fine when an evidence-grounded verification supports them. The words are forbidden when they are decorative narration.

---

## What counts as a completion claim

Any statement that asserts a state about the work, rather than describing an action you just performed. Both of these are completion claims:

- "The bug is fixed."
- "All tests pass."

Neither of these is:

- "I just ran the test suite."
- "I edited `foo.py` to change the comparison from `==` to `is`."

The first pair makes assertions a reader will rely on. The second pair reports actions; the reader still has to do their own verification.

Synonyms that count as completion claims include: done, complete, completed, finished, fixed, shipped, ready, resolved, addressed, handled, sorted, taken care of, all set, good to go, merged-and-clean, green, passing, working, validated, verified (in the conclusory sense), confirmed, looks good, LGTM. "Good catch" is also a completion claim when used to acknowledge a user-reported issue: it implies the issue is now understood and being acted on, which is a state assertion the user will rely on.

---

## Beyond completion: claims about artefact state

The verification protocol below is written for completion claims, but the discipline it encodes (a claim requires a read, not an inference) applies to any factual assertion about an artefact's contents, structure, or requirements, made in any phase: research, assessment, planning, or review, not only at completion.

A *state assertion* is a claim about what an artefact is or needs. "This file contains X", "this template lacks field Y", "this document requires Z", and "the matrix maps controls at the identifier level" are all state assertions. Each is a claim a reader will rely on, and each requires the artefact to have been read. An assertion about an artefact that has not been opened is an inference, not a finding.

The discipline for state assertions:

- **Read before characterizing.** Open the artefact before asserting what it contains, lacks, or requires. A plausible inference about an unread file is the failure mode this section exists to prevent.
- **Label hypotheses explicitly.** Where the read has not happened yet, mark the statement as unverified (for example, "unverified: I have not read X") and do not let a downstream decision depend on it until the read is done.
- **Separate findings from hypotheses in analysis.** In an assessment or review, present findings (grounded in a read, with a quote or a location reference) separately from hypotheses (inferences pending a read). Never present an unverified inference in the same register as a verified fact; a reader cannot tell the two apart unless the labelling does it for them.
- **Own a caught inference plainly.** Where an assertion about an unread artefact has already been made, say so and read the artefact before anything depends on it. Do not retrofit the assertion as though it had been verified.

This is the same machinery as the completion protocol: enumerate what is claimed, read the source, quote or locate the support, and label what remains unverified. Only the trigger is broader, reaching any state assertion rather than the vocabulary of completion alone.

---

## Un-observable state, inventory, and external-version currency

Three assertion classes need a sharper rule than "read before characterizing", because the thing to be read is not a single artefact sitting in front of you.

- **Un-observable state is never assertable.** Some states have no instrument you can read at all: your own context depth, how degraded your reasoning is, "I feel done", "this is getting long". Unlike an unread-but-readable file (which you resolve by reading it), there is no read that grounds these, so they are never the basis of an assertion or a decision. In particular, an internal-state claim is never a valid trigger for winding down, stopping, or deferring; the trigger for those must be a named, externally-observable signal (a failing check, a surfaced finding, a maintainer correction, a concrete self-inconsistency you can quote). "I think I am degraded" is not such a signal; "the last gate run reported finding X" is.
- **Inventory and absence claims require the index, not a partial look.** A claim that a collection contains, lacks, or holds-a-given-version-of something ("the repo has no MITRE data", "there is no template for X") is a state assertion about a *set*, and a single directory listing or one grep is not a read of the set. Consult the set's own index or catalogue (the manifest the collection maintains to describe itself) before asserting presence, absence, or location. Asserting absence from a partial look is the same failure as characterizing an unread file.
- **External-version currency: the upstream source is the only authority.** For any externally-versioned reference (a standard, a framework, a dataset), the authoritative answer to "is this the current version?" is the upstream / primary source verified in the current turn, never a stored note, a cached copy, a local catalogue, or memory: each of those records what was believed current when it was written, which is exactly the belief that goes stale. The discipline whenever such a reference is load-bearing: (1) find what is held, via the collection's index, not a guess; (2) verify the current version upstream this turn; (3) act only after both. Do not write or rely on a version you have not confirmed current upstream, and do not proceed on a version known to be superseded unless the responsible authority explicitly authorizes working from the older one.
- **A set-completeness claim that a decision rests on is a completion-class claim.** An assertion of the form "all / every / no / none X remain", "the queue is exhausted", "everything is blocked", or "nothing is actionable" over a COLLECTION is a claim about the whole set, and when a decision rests on it (especially a stop, hold, defer, or wind-down) it carries the full weight of a completion claim: enumerate every member of the set through its index or tool (never a partial look), give each member a disposition, and SHOW the enumeration. The claim without the shown full enumeration is forbidden, exactly as a "done" without the verification is. A partial review that found a blocker on each item it happened to inspect does not establish that every item is blocked.
- **Asymmetric skepticism: a claim that licenses less work must clear a higher evidence bar.** A claim whose consequence is to do LESS (I can stop, hold, defer, or wind down) is self-serving in a way that a claim licensing more work is not, so it requires MORE evidence, not less: a false "nothing left to do" both deceives and halts productivity, the worst of the two failure directions. When the evidence for a stop-licensing claim is only partial, the required default is to CONTINUE on the highest-priority open item, never to stop; the burden of proof sits on the stop, not on the continuation.

These are corollaries of the same principle as the rest of the rule (a claim requires an observation, not an inference); they are called out because the failure mode is subtler when the observation requires reading a manifest or an upstream source rather than a single named file, and because an un-observable internal state tempts a confident assertion precisely because nothing can contradict it in the moment.

**A missing load-bearing reference is acquired, or the work pauses, never worked around.** The external-version-currency discipline above covers a reference the collection HOLDS at a stale version; the same principle governs a reference the collection does NOT hold at all and that is load-bearing for the task (a standard, regulation, framework, or dataset a citation or an attributed value depends on). Do not proceed on the gap and do not merely record it as a "source-not-held" note: (1) PAUSE at the point the missing reference is needed; (2) attempt to acquire it from its authoritative or primary source and add it to the collection via the ingest path, then continue against the now-held source; (3) if acquisition fails (egress-blocked, licensed, paywalled, or otherwise unavailable), surface it to the responsible authority with named options (they provide it; the task defers and routes around to the next independent item; or the artefact is reworded so it does not depend on the missing reference, or cites it corroboratively-only with a tracked verification item). Routing a "source-not-held" finding WITHOUT first attempting the acquisition is the shortcut this forecloses.


### Never sum a measured figure with an estimated one

When a report pairs an INSTRUMENTED measurement with a SELF-REPORTED estimate (a system's own
recorded counters beside a collaborator's or a subagent's best-effort figure), keep the two in
separate columns and do NOT present a combined total. A single total inherits the precision of its
most precise input in the reader's mind while inheriting the error of its least precise one, which
launders an estimate into a measurement. Label each column with its evidence quality at the point
of display, not in a footnote, and where a figure could not be read at all, report it as UNKNOWN
rather than zero: a parsing gap that reads as zero understates the total silently, and silence that
reads as a real value is the failure this rule family exists to prevent.

The same applies to a derived ratio: state which inputs are measured and which are estimated before
the ratio is used to justify a decision, because a ratio of a measurement to an estimate is an
estimate, however many digits it prints.

---

## The verification protocol

Before stating a completion claim, perform every step:

### 1. Enumerate every file in scope

List, by path, every file you touched or made claims about in this round of work. Files you read but did not touch count if your claim references them; files unrelated to the claim do not.

If the round of work was large, "this round of work" is the set of files relevant to *the claim you are about to make*, not every file the agent has ever touched in the session.

### 2. Re-read each file in full

Not just the section you edited. Not just the lines around the diff. The full file, or, for very long files where re-reading is impractical, the sections that are relevant to the claim plus an explicit statement of which sections were read and which were not.

The re-read is the step that catches stale claims: a preamble that contradicts a body change, a downstream reference that the edit broke, a CHANGELOG entry that lists files the actual diff did not touch.

### 3. Quote specific lines that support each claim

Paraphrases do not count. For each completion claim, identify the lines in the re-read files that ground the claim, and quote them (with file path and line number) in the message that carries the claim.

If a claim depends on a passing audit, gate, lint, or test suite, the supporting evidence is the gate's output and exit code, not "I ran it and it looked fine". Quote the relevant lines from the output.

### 4. Proactively search for contradictions

For each completion claim, run a search across the affected files for phrases that would *falsify* the claim if present. Report the search command and its result.

Examples of contradiction searches:

- For "the README is updated to v1.8.0": grep the README for `1.7` and any earlier version string. If a stale reference appears, the claim is not yet supported.
- For "the new rule is wired into all four surfaces": grep the four surface files for the rule's name. If any one is missing, the claim is not yet supported.
- For "the version-monotonicity audit passes": run the audit standalone (not piped through `tail` or `head` or `grep`, where a non-zero exit code can be masked) and report the actual exit code.

A contradiction search that returns nothing is evidence. A contradiction search that was not performed is not.

### 5. Distinguish mechanical from semantic verification

A passing gate, lint, or test suite proves only what that gate covers. The audit programme verifies the things the audit programme was built to verify; it does not verify everything.

"All gates pass" is evidence for the claims those gates check. It is not evidence for claims those gates do not check, such as "the rule is internally consistent with the project's existing discipline", "the prose is accurate", or "the references are not stale". Those claims require a separate verification protocol (re-read, quote, contradiction-search) of their own.

State the boundary explicitly: "All N gates pass; the gate-coverage limits mean this does not by itself prove [list of unchecked claims]; I have also verified [list of separately-verified claims] by re-reading and quoting from [files]".

### 6. State unverified items explicitly

If part of the claim is unverified, name the unverified part. Do not imply verification you did not perform.

"The CHANGELOG entry is added and links resolve; I have not separately checked that every downstream document that cites the bumped version has been updated, because that audit is not part of the gate programme and I did not run it manually" is honest. "Done" with no scope is not.

**Accepting an unverified item requires a durable tracker.** Naming the unverified part discharges the honesty obligation; but when the work then *accepts* the unverified item rather than resolving it (proceeding on it, annotating a claim as unverified-for-now, or relying on a value not confirmed current), the acceptance is recorded as a durable tracking item in the project's backlog so it is revisited and verified. An accepted-unverified claim with no tracker is how "unverified for now" silently becomes "assumed true": the tracker is the forcing function for the later verification, and it names what must be verified, where the unverified claim lives, and what would confirm or refute it. The trigger is *acceptance*, not mention: noting a gap in passing needs no tracker, but building on the gap, or leaving an unverified assertion standing in a shipped artefact, does.

---

## Prohibited anti-patterns

- **Declaring victory in the response that carries the failing evidence**. If the same message contains "all gates pass" and a tool result showing a non-zero exit code, the claim is incoherent. Read the tool result before composing the summary.
- **Treating "the user did not push back" as confirmation**. Silence from the operator is not a verification step. The user may not have noticed.
- **Relying on prior runs**. "It passed last time, and the only change is small" does not substitute for running the gates on the current state. The whole point of the audit programme is that "small" changes break things.
- **Saying "good catch" to a user-reported issue without first verifying that the issue is real and bounded**. "Good catch" implies "you caught what I should have caught, and I now understand the scope". If you have not yet enumerated the scope, you do not yet know whether the catch is one stale claim or ten.
- **Stating a claim and immediately performing the search that would have falsified it**. The search is part of the claim, not a coda. Run it first.
- **Hedging with "should" or "appears to" while still making a state assertion**. "The fix should work" or "the entry appears to be present" are still claims a reader will rely on. Either you ran the verification (state the result) or you did not (state the gap).
- **Conflating "I edited the file" with "the file is correct"**. The edit happened; the file's correctness is a separate proposition that needs its own verification.
- **Bypassing the verification protocol to make progress faster**. The protocol exists precisely because skipping it is the failure mode. The minute saved by skipping is paid back many times when the unsupported claim turns out to be wrong.
- **Characterizing an artefact you have not opened**. Asserting that a file, template, schema, or document contains, lacks, or requires something by inference rather than by reading it. If you have not read it, the statement is a hypothesis, not a finding; label it as such and read it before anything depends on it. This anti-pattern fires in analysis and assessment, not only at completion.
- **Asserting a set-completeness claim from a partial look, especially to license stopping**. Claiming "every remaining item is blocked" or "the backlog is exhausted" on the strength of a partial review, and then resting a hold or wind-down on it, is the inventory-from-a-partial-look failure applied to a decision, and it is doubly costly: a false set-claim that also halts productivity. Enumerate the whole set through its index or tool and show each member's disposition before any decision depends on the claim.

---

## Tool-specific guidance for AI coding assistants

### Reading tool results

A tool result (subagent return, bash output, file read) is the source of truth. Read it before composing the summary. If it contains an error, a failure indicator, or unexpected content, address that before proceeding.

A common failure mode is composing the next message in parallel with the tool call and committing to a summary before reading the result. Resist this; the summary is downstream of the result, not upstream of it.

### Async work

When a background task is in flight, do not begin work that depends on its output. Wait for the completion notification, read the full result, and then act. Forecasting the result and proceeding optimistically is the failure mode this rule is designed to prevent.

### Pipe-masked exit codes

When verifying via a command pipeline, the pipe can mask the verification command's exit code. Use one of:

- Run the verification standalone first, observe its result, then act in a separate step.
- Use `set -o pipefail` so the pipeline's exit code reflects the first failure.
- Inspect `${PIPESTATUS[@]}` after the pipeline.
- Run with no pipe and accept the full output.

Never chain a verification step with a dependent action step using `&&` when the verification's exit code may be masked. Concretely: `audit-script | tail && commit` is forbidden when `audit-script` can fail in a way the pipe hides.

### API polling and webhook subscriptions

When the verification you need is "wait until an external system reports a result" (CI completion, a build job's status, a deployed service's health), prefer the platform's webhook or subscription primitive over a polling loop. Polling against an external API is the same failure class as a pipe-masked exit code, but with extra ways to fail silently: rate-limit responses, transient HTTP errors, and authentication failures all produce output that is easy to ignore in a loop and indistinguishable from "still pending" if the loop is written without care.

The discipline:

- **Use the platform's wake-on-event primitive when one exists.** GitHub Actions emits webhook events for PR status changes; the Claude Code GitHub MCP server exposes `subscribe_pr_activity` (or equivalent) that surfaces those events into the session. Subscribing eliminates polling: the harness wakes the session on the event, the session reads the event's full payload, and acts. No exhaustion risk because no polling happens.
- **If polling is unavoidable** (no event primitive available, or the condition is not event-shaped), the polling script must be fail-loud, bounded, and authenticated:
  - Use the authenticated tool (MCP / SDK / `gh` CLI) rather than raw `curl`. Authenticated calls have orders-of-magnitude higher rate limits; raw `curl` against unauthenticated public endpoints exhausts the per-IP cap in tens of requests.
  - Drop `curl -f` (which suppresses the response body on HTTP errors) and do not `2>/dev/null` blindly. The body that explains *why* the call failed is often the only signal that distinguishes "rate-limited" from "endpoint moved" from "transient outage".
  - Bound the loop with a maximum attempt count and an explicit timeout. An unbounded `until` loop is a defect: when the condition never flips, the loop never exits, no notification fires, and the operator concludes the verification is still pending. Silence becomes indistinguishable from progress.
  - Print one terminal-state line per iteration so the operator can see the loop's actual behaviour, not just its exit code.
  - Inspect the task output file when a poll spans more than a couple of minutes. A loop that emits a stack trace per iteration is failing, even if its exit code looks clean. Bash captures stdout into `$(...)` and only writes stderr to the file, so a silently-failing API call may show as tracebacks-only in the file while the operator sees nothing in the conversation.
- **Trust the wake-on-event primitive's negative space.** Subscriptions deliver failure events (CI fail, comment, review) but usually not success transitions, new pushes, or merge-conflict state changes. The operator's mental model must account for this: if the subscription has been silent, that may mean "still running" or "succeeded silently", but never "definitely failed" or "definitely succeeded". When the next interaction occurs, do one explicit status check (single shot, authenticated, not a poll loop) to resolve the ambiguity.

The asymmetry justifies the discipline: a webhook subscription costs one tool call to arm and produces a single high-signal wake on each event. A polling loop costs N tool calls per minute, consumes per-user / per-IP rate budget across the session, and produces output the operator must inspect to know whether the loop is healthy. The first form is the default; the second form is an exception that must be justified.

### No decorative external links

When prose references a tool name, an API name, a CLI flag, a library, a class, or any other identifier that looks linkable, do not wrap it in a markdown link unless the link target is a URL drawn from a verified source. Verified sources include: a documentation URL the operator just pasted into the conversation, an URL returned by an MCP tool call in the current session, a path under the repository the prose is shipping in, or an entry on a maintained allow-list. Inventing a URL because the identifier "feels like it should have one" is the failure mode this rule prevents.

The discipline:

- **Backticked code spans are the default rendering for identifiers.** A reference to `TaskStop`, `boto3.client`, `--no-verify`, or `pre-commit run --all-files` renders as a backticked span. The reader can search for the identifier; the prose does not have to claim a canonical URL.
- **Links are reserved for verified destinations.** A repository-internal path written as a markdown link to a real file is verified by the broken-link audit (the gate's number is project-specific). An external URL is verified by the maintainer at the moment they paste it; if no verified URL is available, render the reference without a link.
- **Domain plausibility is not verification.** A plausibly-pathed URL on a real documentation domain may resolve, may 404, or may have never existed. The domain being on the project's allow-list (typical entries: `docs.python.org`, `claude.com`, `github.com`) means the gate that checks domains will pass; it does not mean the path is correct. Domain-allow-list gates catch off-domain hallucinations; they do not catch plausible-path hallucinations.
- **Auto-pilot is the trigger to slow down.** The failure mode is reflexive: "I just wrote a tool name, file paths get links in this project, therefore this tool name should get a link." File paths are verified by the build, the lint, and the test suite. Tool names are not. The reflex extends the linking convention past the boundary of verifiability.
- **If a link would genuinely help the reader and the URL is not at hand**, write the prose without the link and either add a TODO marker for follow-up verification or omit the link entirely. The reader can still find the referenced thing via the backticked identifier; they cannot recover from being misled by a confidently-wrong URL.

This rule is a layered defence with the repository-level external-link domain allow-list (the `lint-external-link-domains.py` style gate in projects that ship one). The allow-list catches references to entirely off-list domains; the discipline here catches plausibly-pathed URLs on allow-listed domains, which the domain check cannot detect.

### Stop hooks and pre-commit failures

A failing pre-commit hook, a stop-hook warning, or a "this branch has uncommitted changes" notice is signal, not noise. Address the underlying state. Do not bypass with `--no-verify` (see the gate-discipline rule) and do not treat it as a UI annoyance.

### Self-honesty in summaries

When narrating what you did, describe what actually happened, not what you intended. If you committed before noticing a failure, say so plainly. If you needed to amend, the amendment is part of the story. If you took a shortcut, name it.

The cost of plain narration is small (one extra clause); the cost of softened narration is large (a misled reader who relies on the softer claim).

---

## Exception-handling protocol

For genuinely impractical re-reads (a generated file that is millions of lines long, a binary artefact, a third-party dependency that you cannot read in full), state the scope of what you read and what you did not. The exception is not "I skipped the re-read"; the exception is "I read sections A, B, and C; I did not read sections D and E because [reason]; here are the claims my re-read supports and the claims that remain unverified".

---

## Framework alignment

| Requirement | NIST SSDF | CSA CCM | ISO 27001 | OWASP ASVS |
| --- | --- | --- | --- | --- |
| Evidence-grounded assertions | RV.1, RV.2 | GRC-05, LOG-02 | A.5.36, A.8.15 | V15.1, V16.2 |
| Distinguishing mechanical from semantic verification | RV.1 | GRC-05 | A.5.36 | V15.1 |
| Documented exception handling | PO.5 | GRC-04 | A.5.4 | V15.1 |
| Audit trail of verifications performed | PS.1, RV.2 | LOG-02, LOG-04, LOG-10 | A.8.15, A.5.36 | V16.2, V16.4 |
