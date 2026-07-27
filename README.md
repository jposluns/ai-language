# Clean Language

Clean Language is a cross-platform language and editorial skill for drafting, rewriting, proofreading, adapting, and reviewing precise, direct, natural prose.

The project uses one canonical skill definition for ChatGPT and Claude. The core skill lives in [`clean-language/`](clean-language/). Platform-specific metadata is additive: ChatGPT uses `agents/openai.yaml`; Claude ignores that file and reads the same `SKILL.md` and references.

Project site: [cleanlanguage.ai](https://cleanlanguage.ai)

## Design goals

- Preserve factual, technical, legal, policy, contractual, and standards meaning.
- Lead with conclusions, decisions, requests, findings, and required actions.
- Produce concise, information-dense Oxford English.
- Remove common AI-writing patterns without imposing arbitrary grammatical bans.
- Adapt correctly to executive, technical, governance, incident, email, Teams, and LinkedIn contexts.
- Separate mandatory language rules from contextual heuristics.

## Repository structure

```text
ai-language/
├── README.md
├── LICENSE
├── NOTICE.md
├── site/
│   ├── index.html
│   ├── styles.css
│   ├── patterns/
│   ├── install/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _headers
└── clean-language/
    ├── SKILL.md
    ├── agents/
    │   └── openai.yaml
    └── references/
        ├── anti-patterns.md
        ├── context-modes.md
        ├── examples.md
        └── qa-checklist.md
```

## Website deployment with Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages using these settings:

- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `site`
- Root directory: leave blank

Add `cleanlanguage.ai` as the custom domain after the first deployment. The `site/` directory contains static HTML, responsive CSS, Open Graph metadata, structured data, a sitemap, crawler directives, and Cloudflare Pages security headers.

## ChatGPT installation

Package the `clean-language` directory as `skill.zip`, then upload it through the ChatGPT Skills interface.

```bash
python /path/to/skill-creator/scripts/package_skill.py ./clean-language ./dist
```

The resulting archive must be named `skill.zip` and contain one skill entry point.

## Claude Code installation

Copy or clone the skill directory into the project or user skill location used by Claude Code:

```bash
mkdir -p .claude/skills
cp -R /path/to/ai-language/clean-language .claude/skills/clean-language
```

For a user-level installation, place the directory under the corresponding user Claude skills directory. Keep `SKILL.md` and its relative `references/` paths together.

## Claude Projects or other LLMs

Upload or include `clean-language/SKILL.md` and the referenced files as project knowledge or system instructions. Preserve the precedence section and contextual exceptions; they prevent anti-pattern rules from changing technical or legal meaning.

## Usage examples

- "Rewrite this email using Clean Language."
- "Audit this report for generic AI language without changing the technical meaning."
- "Draft a CIO-level Teams message from these notes."
- "Proofread this policy clause with minimal intervention."
- "Adapt this email into a LinkedIn-compatible response."

## Maintenance

Treat `SKILL.md` as the control plane. Put detailed pattern catalogues, examples, and channel rules in `references/`. Update the canonical skill once; both ChatGPT and Claude consume the same content.
