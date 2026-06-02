# Enrich Actor Examples

## Example 1: Web-first stakeholder dossier

User: "Enrich Jane Doe at ExampleCo before my sales call."

Workflow:

1. Confirm the goal: sales-call preparation, not personal profiling.
2. Search exact name, company, title, talks, interviews, posts, and company announcements.
3. Collect sources into an artifact index.
4. Extract decisions, stated priorities, objections, projects, collaborators, and communication signals.
5. Return a concise dossier with citations and follow-up questions for the call.

Output should include:

- Actor Snapshot
- Decision and Artifact Timeline
- Pattern Map
- Evidence-Backed Implications for the sales call
- Unknowns and Follow-Up Queries

## Example 2: Directory-first internal context

User: "Use this folder of meeting notes and transcripts to enrich the VP of Product."

Workflow:

1. Confirm the user is authorized to use the folder.
2. Scan file names and contents for the actor's name, aliases, team, products, and recurring topics.
3. Extract dated decisions, objections, approvals, and repeated phrases.
4. Link every claim to file paths and quote snippets where useful.
5. Produce a timeline plus working-style pattern map.

Useful searches:

```text
"VP name"
product codename
"decision" OR "approved" OR "blocked"
"action item" OR "follow up"
```

## Example 3: Inbox/search integration

User: "Use my authorized email search integration to collect everything relevant to Alex and Project Orion."

Workflow:

1. Confirm the scope: actor, project, date range, and authorized account/search integration.
2. Query actor name, email, domain, project name, aliases, and common thread subjects.
3. Summarize relevant messages without exposing unrelated private content.
4. Preserve stable message locators and dates.
5. Extract commitments, unanswered requests, decision bottlenecks, and relationship context.

## Example 4: Final brief shape

```md
## Actor Snapshot

Jane Doe is VP Product at ExampleCo. The relevant evidence set is mostly public interviews and three user-provided meeting notes, so confidence is strongest on product priorities and weaker on internal approval mechanics.

## Pattern Map

| Pattern | Evidence | Confidence | Practical implication |
| --- | --- | --- | --- |
| Values deployment speed over custom workflows | web-002 quote, note-004 | High | Lead with implementation timeline and migration risk reduction. |
| Asks for customer proof before budget discussion | call-003, email-008 | Medium | Bring 2-3 similar customer examples before pricing. |

## Unknowns and Follow-Up Queries

- Who owns budget approval after Jane recommends a tool?
- Whether Project Orion is still the active migration path.
- Whether legal/security review has already started.
```
