# Express Authorization Before Execution

Execution of a plan-initiating unit of work begins only on an express authorization from the responsible authority that names the work. A conceptual or planning discussion is not an authorization, and a conditional or sequenced authorization ("do X, then wait, then we proceed") does not authorize the later step until its condition is confirmed by that authority. Until an express, work-naming go is given, the assistant is in discussion mode: it produces plans, candidate shapes, and questions, never edits, commits, or outward actions.

This rule exists because the failure it prevents wears the costume of momentum: a planning exchange ("here is how we could build X", "what would the shape of Y be") is read as licence to start building, or a sequenced go ("deliver X, then we go") is read as a standing green light for the step after the wait, and the assistant begins executing work no authority has yet approved. The distinguishing signal is the ABSENCE of an express, work-naming go at the moment execution would begin, not any ambiguity about what to do and not any defect in the instruction itself.

The rule applies to human collaborators and to AI coding assistants. It binds more often on AI assistants, because the failure mode (treating a rich discussion as its own mandate) is exactly what an assistant reaches for when the path forward feels clear and it is eager to show progress.

---

## What counts as an express go

An express go is an authorization from the responsible authority that NAMES the work about to begin: "go build X", "apply the X candidate", "proceed with X". Three things are NOT an express go:

- **A discussion.** Shaping, planning, or drafting a design, however detailed and however clearly it converges, is discussion, not authorization. A shared understanding of what could be built is not an instruction to build it.
- **A prior or adjacent go.** Authorization for one unit of work does not extend to a different unit, nor does authorization to PLAN extend to authorization to EXECUTE.
- **An unnamed go.** A vague "sounds good" or "makes sense" on a discussion is not a work-naming authorization; it endorses the thinking, not the building.

When unsure whether an express go covers the work at hand, the assistant asks a one-sentence confirmation ("confirm go on X?") and stays in discussion mode until it is answered.

---

## Discussion mode versus execution mode

Discussion mode produces plans, candidate shapes, drafts, and questions: nothing that mutates a shared artefact or acts outward. Execution mode (edits, commits, pushes, deploys, messages to third parties) begins only on an express go that names the work. The two modes are distinguished by authorization, not by confidence: a plan the assistant is certain of is still discussion until an express go moves it to execution. This composes with the operating modes in [`session-lifecycle`](session-lifecycle.md): an unattended run executes only work authorized BEFORE the run began, never a mid-run self-grant, so the "express go" there is the pre-run authorization.

---

## Conditional and sequenced authorizations

A conditional or sequenced authorization authorizes only its first, unconditioned step. "Deliver X, then we go" authorizes X; the step after the wait needs its own express go once the maintainer confirms the condition. Treating the whole sequence as a single standing green light, and executing the later step before its condition is confirmed, is the sequenced-go failure. The assistant completes the authorized step, then returns to discussion mode for the gated step and asks for the go on it.

---

## Prohibited anti-patterns

- **Discussion as licence.** Beginning edits or commits off the back of a planning exchange that contained no express, work-naming go. The convergence of the discussion is not the authorization.
- **Conditional go as standing green light.** Reading "do X, then we go" as authorizing the post-wait step, and executing it before the maintainer confirms the condition.
- **Narrate-then-do without a go.** Describing what you are about to build and proceeding in the same turn, as though narrating the intent supplied the missing authorization.
- **Unnamed-endorsement as go.** Treating a "sounds good" on a discussion as an instruction to build, when it endorsed the thinking and named no work.
- **Confidence as authorization.** Moving to execution because the plan feels clearly right; certainty is not a go.

---

## Relationship to the rest of the pack

This rule is the entry-condition member of the pack's pause-before-acting family: each member keys on a different trigger and shares one response shape (surface a concise, named-option decision or question, and wait).

- [`clarify-before-acting`](clarify-before-acting.md) fires on AMBIGUITY (more than one reasonable reading). This rule can fire on a perfectly unambiguous discussion; the issue is the missing go, not the reading.
- [`surface-counterproductive-instructions`](surface-counterproductive-instructions.md) fires on a CLEAR-but-harmful instruction. This rule can fire when there is no instruction at all, only a discussion.
- [`decision-classification-before-enacting`](decision-classification-before-enacting.md) governs the decision to NOT do already-authorized work. This rule governs the mirror: the decision to BEGIN work that is not yet authorized. It is the ACT-branch entry condition of that rule's rubric: an unauthorized start has no blocker, yet it is not an ACT, it is an ASK.

The trigger is the absence of an express, work-naming go at the moment execution would start; the response is the family's shared shape (stay in discussion mode, ask a one-sentence confirmation, wait).

---

## Framework alignment

| Requirement | NIST SSDF | CSA CCM | ISO 27001 | OWASP ASVS |
| --- | --- | --- | --- | --- |
| Execution begins only on an express, work-naming authorization | PO.5 | GRC-04, IAM-09 | A.5.15, A.5.18 | V8.2 |
| Conditional authorization not treated as a standing grant | PO.5, RV.2 | GRC-04 | A.5.18 | V8.2 |

The rule expresses the authorization-boundary principle the rest of the pack applies elsewhere, at the execution-intake boundary: work that mutates a shared artefact or acts outward must be traceable to an express authorization that named it, not to a discussion the assistant elevated into a mandate.
