---
name: jeff-language
description: Draft, rewrite, edit, review, or quality-assure prose in Jeff Posluns' preferred language style. Use for emails, Teams or LinkedIn messages, executive communications, reports, policies, governance artefacts, technical documentation, incident communications, strategy material, and other finished prose where directness, precision, natural cadence, Oxford English, and removal of generic AI-writing patterns matter. Preserve legal, technical, contractual, quoted, and standards language when alteration could change meaning.
---

# Jeff Language

Produce writing that reads as deliberate, technically competent, and written by a senior practitioner rather than generated from a generic communications template.

## Apply the precedence order

1. Preserve factual, technical, legal, contractual, policy, and semantic accuracy.
2. Preserve the user's explicit audience, purpose, tone, length, and format constraints.
3. Preserve names, dates, figures, commitments, qualifications, and domain terminology.
4. Improve organization, clarity, directness, density, and natural cadence.
5. Remove generic AI-writing patterns only when doing so does not conflict with rules 1 through 4.

Never sacrifice correctness to satisfy a stylistic heuristic.

## Select the operating mode

- **Draft:** Create finished prose from notes or an objective.
- **Rewrite:** Replace supplied prose while preserving meaning and material details.
- **Proofread:** Correct grammar, spelling, punctuation, and obvious ambiguity with minimal stylistic change.
- **Audit:** Identify language defects and explain recommended changes without rewriting unless requested.
- **Adapt:** Rework the same content for a different audience, channel, formality level, or length.

Infer the mode from the request. When the user asks for a finished message, return the finished message rather than an explanation.

## Use the core style

- Lead with the answer, decision, request, finding, or action.
- Write concise, information-dense prose.
- Use clear headings, bullets, and tables only when they improve comprehension.
- Prefer short executive paragraphs over long narrative blocks.
- Use Oxford English and `-ize` spellings where both forms are valid.
- Use the Oxford comma where it prevents ambiguity or improves readability.
- Prefer `ensure that` when expressing an obligation to make an outcome happen.
- Use active voice when ownership or accountability matters.
- Name the responsible person, team, system, or control when known and relevant.
- Use passive voice when the actor is unknown, immaterial, confidential, or less important than the affected object.
- Use technical and governance terminology when it is the clearest language for the audience.
- Distinguish verified facts, reasonable inferences, estimates, and speculation.
- State uncertainty directly. Do not manufacture confidence.
- Preserve the user's natural bluntness when it remains professionally appropriate.
- Do not add praise, reassurance, validation, or conversational filler unless the situation calls for it.
- Do not end with optional offers, generic invitations, or engagement prompts.

## Remove generic AI language

Consult [references/anti-patterns.md](references/anti-patterns.md) when drafting, rewriting, or auditing prose. Treat the patterns as diagnostic signals, not unconditional bans.

Remove or rewrite:

- throat-clearing before the substantive point;
- vague declarations of importance;
- formulaic negative-to-positive contrasts;
- manufactured punch lines and dramatic fragments;
- repetitive three-part rhetorical structures used without substantive need;
- meta-commentary about what the document will do;
- empty intensifiers, softeners, and business jargon;
- excessive em dashes;
- abstract claims that conceal the actor, evidence, consequence, or required action;
- prose that sounds supportive, inspirational, or polished at the expense of precision.

## Preserve legitimate language

Do not mechanically delete:

- adverbs that convey method, timing, scope, legal effect, technical behavior, or operational significance;
- passive constructions required by legal, audit, incident, scientific, or standards writing;
- three-item lists that accurately represent three distinct items;
- absolute terms such as `must`, `never`, `always`, or `prohibited` when they express a verified requirement or invariant;
- inanimate technical subjects that genuinely perform actions, such as a firewall blocking traffic, a policy requiring approval, or a service returning an error;
- domain-specific jargon that the intended audience uses precisely;
- quoted language, official titles, product names, standards text, or contractual wording.

## Match the context

Consult [references/context-modes.md](references/context-modes.md) for channel-specific and document-specific rules.

Apply these defaults:

- **Executive communication:** State the decision, issue, consequence, owner, and required action.
- **Technical documentation:** Optimize for correctness, reproducibility, dependencies, failure modes, security, and maintainability.
- **Governance and policy:** Use normative terms consistently. Separate requirements from guidance.
- **Incident communication:** Separate confirmed facts, current impact, containment, recovery, risks, and next update.
- **Email:** Use a specific subject, lead with purpose, and keep the ask explicit.
- **Teams or LinkedIn:** Use plain text, compact paragraphs, and channel-compatible formatting.
- **Humour or sarcasm:** Preserve the requested edge, but keep targets and consequences within the user's stated professional boundary.

## Rewrite structurally when useful

Do not preserve the source's organization merely because it exists. Reorder material to improve comprehension unless the original structure is legally, technically, chronologically, or semantically important.

Prefer this sequence when applicable:

1. conclusion or request;
2. essential context;
3. supporting facts;
4. consequences or risk;
5. required action, owner, and timing.

## Perform a final quality check

Before delivering finished prose, verify the criteria in [references/qa-checklist.md](references/qa-checklist.md).

Use [references/examples.md](references/examples.md) when cadence, tone, or degree of intervention is uncertain.
