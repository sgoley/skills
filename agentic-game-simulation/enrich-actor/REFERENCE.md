# Enrich Actor Reference

## Source schema

Use this structure internally while collecting evidence:

| Field | Meaning |
| --- | --- |
| `source_id` | Stable short ID, e.g. `web-001`, `email-014`, `file-003` |
| `title` | Human-readable title or subject |
| `locator` | URL, file path, message ID, meeting title, or integration result pointer |
| `source_type` | `official`, `web`, `social`, `video`, `transcript`, `email`, `chat`, `doc`, `repo`, `filing`, `note`, `other` |
| `date` | Publication, send, meeting, commit, or observed date when available |
| `actor_role` | Author, recipient, speaker, subject, quoted party, collaborator, or observer |
| `reliability` | `high`, `medium`, `low`, or `unknown` |
| `relevance` | Why this source matters to the user goal |
| `key_evidence` | Direct quotes, decisions, links, artifacts, or observed behavior |
| `follow_up` | Missing context or next query triggered by this source |

## Collection strategy

Start narrow, then widen:

1. Exact actor name plus organization, title, project, domain, email domain, username, and known aliases.
2. Actor plus artifact types: `interview`, `podcast`, `talk`, `slides`, `transcript`, `paper`, `repo`, `commit`, `filing`, `newsletter`, `press release`, `case study`.
3. Actor plus decision verbs: `announced`, `launched`, `joined`, `left`, `founded`, `invested`, `hired`, `approved`, `rejected`, `recommended`, `published`, `testified`, `presented`.
4. Actor plus relationship terms: `with`, `advisor`, `board`, `partner`, `customer`, `client`, `collaborator`, `coauthor`, `reported to`.
5. Negative/contradiction checks: actor plus `controversy`, `correction`, `retraction`, `lawsuit`, `resigned`, `criticism`, only when relevant to the user's stated purpose.

For local directories, search file names first, then content. Prioritize files with dates, names, senders/recipients, transcript speakers, meeting titles, or links.

For inbox/search integrations, use scoped queries that avoid over-collection: actor name, email address/domain, organization, project names, and date ranges. Summarize only relevant messages and preserve message IDs or stable locators where possible.

## Extraction rubric

Extract these categories when supported by evidence:

- **Documented decisions:** explicit choices, approvals, commitments, priorities, tradeoffs, reversals, and deadlines.
- **Artifacts:** documents, videos, transcripts, emails, decks, repos, posts, meetings, tickets, files, datasets, or public records.
- **Patterns:** repeated topics, recurring objections, preferred framing, decision criteria, tone, cadence, and collaboration norms.
- **Constraints:** budget, timing, legal, organizational, technical, personal availability, public commitments, or stated red lines.
- **Signals:** exact phrases, repeated questions, objections, praise, conflict markers, escalation language, or deference patterns.
- **Relationships:** collaborators, sponsors, blockers, teams, institutions, communities, and likely information channels.

## Confidence labels

- **High:** directly stated in a primary source or repeated consistently across reliable independent sources.
- **Medium:** supported by several artifacts but requiring interpretation, or stated in a secondary source with partial corroboration.
- **Low:** plausible inference from sparse evidence; useful as a hypothesis only.
- **Unknown:** important question with no reliable evidence yet.

Never upgrade confidence because a claim "sounds right." Confidence follows source quality, recency, independence, and directness.

## Safety and privacy rules

- Use only public data or private data the user has authorization to provide.
- Do not infer protected characteristics, health, finances, intimate life, or other sensitive traits unless the user supplied the information and it is directly necessary.
- Do not produce doxxing, harassment, impersonation, credential discovery, stalking, or evasion guidance.
- Prefer professional, decision-relevant patterns over personal speculation.
- If the actor is a private individual and the user goal is unclear or invasive, narrow the scope to user-provided artifacts or ask for a legitimate purpose.

## Output table templates

### Artifact index

| ID | Date | Type | Source | Relevance | Reliability |
| --- | --- | --- | --- | --- | --- |
| web-001 | 2025-01-14 | Interview | URL/title | Shows stated decision criteria for vendor selection | High |

### Decision timeline

| Date | Decision / artifact | Evidence | Confidence | Implication |
| --- | --- | --- | --- | --- |
| 2025-01-14 | Chose X over Y | Quote/source ID | High | Prioritizes integration speed over customization |

### Pattern map

| Pattern | Evidence | Confidence | Practical implication |
| --- | --- | --- | --- |
| Prefers written pre-reads | `email-004`, `meeting-002` | Medium | Send concise context before asking for a decision |
