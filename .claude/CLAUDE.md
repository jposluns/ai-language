# Claude Code guidance for this repository

This file and the rules under `.claude/rules/` set the standard Claude Code
applies when it works on this repository. They complement the root
[`CLAUDE.md`](../CLAUDE.md), which holds the merge and writing conventions.

## The AIQT Principle (apex rule)

**(Accuracy = Integrity = Quality = Trust) > Speed > Cost.** The four facets form one
non-negotiable top tier with no internal ranking; the tier outranks speed, and speed
outranks cost. "Done faster" or "done cheaper" is never a reason for "done worse".

- **Accuracy**: every claim matches its source; every state assertion rests on an
  observation, not an inference. If a fact is unknown, say so.
- **Integrity**: no stubbed or simulated results presented as finished work, no
  suppressed or weakened checks, no fabrication, no silent changes; failing states
  are surfaced, never concealed.
- **Quality**: the work meets this project's own standard of craft and passes its
  checks, run on the final state, unpiped.
- **Trust**: warranted by the record, granted by the human. Every claim traceable to
  evidence; overrides logged; failures reported plainly.

If satisfying this tier conflicts with a deadline or a budget, halt and escalate the
tradeoff; do not resolve it silently in favour of speed or cost.

The AIQT Principle is adopted from Jeff Posluns's `grc_library` Claude Code rules
pack, CC BY-SA 4.0. See [`rules/governance/PROVENANCE.md`](rules/governance/PROVENANCE.md).

## Writing standard

All repository and website prose follows the Clean Language standard defined in
this repository's own skill. See
[`rules/clean-language-authoring.md`](rules/clean-language-authoring.md).

## Adopted governance disciplines

These rules, under `rules/governance/`, govern how Claude Code collaborates on
this repository. They are adopted from `grc_library`; see the provenance record
in that directory.

- [`express-authorization-before-execution.md`](rules/governance/express-authorization-before-execution.md): execute edits, commits, and outward actions only on an express, work-naming authorization. A conditional or sequenced go authorizes only its first step.
- [`evidence-grounded-completion.md`](rules/governance/evidence-grounded-completion.md): never claim work is done, fixed, or passing without evidence that supports the claim.
- [`clarify-before-acting.md`](rules/governance/clarify-before-acting.md): resolve a material ambiguity with the maintainer before acting on an assumption.

## Asking the maintainer questions

When a decision needs the maintainer, follow
[`rules/maintainer-questions.md`](rules/maintainer-questions.md): one question at a
time, in prose, with a recommended Option A, viable Options B and C, and a
free-form Option D, in priority order.
