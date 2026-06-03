---
name: enrich-actor
description: Builds an evidence-backed actor dossier by gathering and organizing public web results, user-provided directories, inbox/search integrations, transcripts, links, and prior artifacts around a person or organization. Use when users ask to enrich, research, map, profile, or prepare for an actor, stakeholder, decision maker, lead, counterparty, interview panelist, creator, company, or relationship using documented decisions, communication patterns, and source artifacts.
---

# Enrich Actor

## Quick start

1. Confirm the actor, purpose, decision context, and privacy boundaries.
2. Inventory available sources: web search, URLs, local directory, transcripts, notes, inbox/search integration, CRM, calendar, or chat exports.
3. Collect and cite artifacts before synthesis; do not invent sources.
4. Extract decisions, patterns, stated preferences, constraints, relationships, and communication signals.
5. Deliver an evidence-backed dossier with source links, confidence, gaps, and next collection steps.

## Workflows

### 1) Intake and boundaries

- Clarify the actor identity, aliases, organization, role, and why the user needs the enrichment.
- Ask what sources are authorized. Use only public sources or private sources the user explicitly provides or authorizes.
- Set a non-clinical, non-invasive scope: document decisions, artifacts, public claims, professional patterns, and communication signals; avoid protected-class inference or sensitive personal speculation.
- Define the target output: quick brief, relationship map, prep dossier, due-diligence pack, or artifact index.

### 2) Source collection

- **Web search / URLs:** collect official pages, profiles, talks, podcasts, interviews, publications, repos, filings, press, public posts, videos, and transcripts.
- **Directory mode:** when pointed at a folder, scan for relevant files and extract names, dates, decisions, commitments, documents, links, and recurring themes.
- **Inbox/search integration:** when the user authorizes an email or search integration, query for the actor's names, aliases, organization, domains, projects, and known topics.
- **LLM/search integration:** when available, use it to expand queries and summarize large source sets, but keep primary citations tied to original artifacts.
- Track every source with title, URL/path, date, source type, access method, reliability, and relevance.

### 3) Evidence extraction

- Pull direct quotes or precise paraphrases for important claims.
- Extract documented decisions, commitments, preferences, repeated behaviors, artifacts created, artifacts referenced, and relationship links.
- Separate facts from interpretations. Label each inference with confidence and the evidence that supports it.
- Deduplicate repeated claims across mirrors, syndications, reposts, and quoted material.
- Note contradictions, stale information, missing context, and sources that could not be accessed.

### 4) Actor model synthesis

- Build a timeline of dated artifacts and decisions.
- Identify recurring patterns: topics, values, decision criteria, objections, communication style, cadence, collaborators, and constraints.
- Map related actors, organizations, projects, and artifact clusters.
- Convert evidence into practical implications for the user's context without claiming certainty.

### 5) Output format (required)

Return:

1. **Actor Snapshot**: identity, roles, affiliations, aliases, and why they matter.
2. **Source Inventory**: searched locations, collected artifacts, inaccessible sources, and reliability notes.
3. **Decision and Artifact Timeline**: dated decisions, publications, videos, transcripts, emails, meetings, or documents.
4. **Pattern Map**: repeated themes, preferences, objections, communication style, and working norms with citations.
5. **Relationship and Influence Map**: collaborators, counterparties, organizations, communities, and relevant links.
6. **Evidence-Backed Implications**: what the evidence suggests for the user's goal, with confidence labels.
7. **Unknowns and Follow-Up Queries**: gaps, next sources to request, and high-value searches.
8. **Artifact Index**: compact table of links/paths with one-line relevance notes.

## Advanced features

- Detailed source schema, extraction rubric, query patterns, and confidence labels: [REFERENCE.md](REFERENCE.md)
- Example prompts and output shapes: [EXAMPLES.md](EXAMPLES.md)
