# Reference

## Guardrails

- Prepare the user for uncertainty; do not choose for them.
- Separate facts from assumptions.
- Ask one question at a time during interview mode.
- Represent each actor fairly, including actors the user disagrees with.
- Include de-escalation and exit paths for high-conflict branches.

## Interview flow (question IDs)

Use this order unless the user asks to skip.

### A) Scenario frame

- `SF_1`: What situation are we preparing for, in one sentence?
- `SF_2`: What would a "good outcome" look like for you?
- `SF_3`: What are your non-negotiables?
- `SF_4`: What constraints must be respected (time, legal, emotional, reputational)?

### B) Timeline and facts

- `TF_1`: What happened so far, chronologically?
- `TF_2`: Which facts are verified vs uncertain?
- `TF_3`: What deadlines or forcing events are coming?

### C) Actor inventory

- `AI_1`: Who are the primary actors?
- `AI_2`: Who are secondary actors or silent influencers?
- `AI_3`: Who can block progress even without formal authority?

### D) Incentives and pressures (per actor)

- `IP_1`: What does this actor want to gain?
- `IP_2`: What are they trying to avoid?
- `IP_3`: What pressures are acting on them (boss, family, board, legal, social)?
- `IP_4`: What leverage do they hold?
- `IP_5`: What are likely red lines?

### E) Strategic uncertainty

- `SU_1`: What unknowns could change the direction quickly?
- `SU_2`: Which assumptions are weak or untested?
- `SU_3`: What signals should we watch live during the conversation?

### F) Response shaping

- `RS_1`: What tone should you maintain under stress?
- `RS_2`: What questions can uncover hidden constraints?
- `RS_3`: What fallback offers or compromises are acceptable?
- `RS_4`: When should you pause, escalate, or exit?

### G) Evidence intake for role fidelity

- `EV_1`: What written sources can you share (emails, thread excerpts, notes, transcripts, prior decisions)?
- `EV_2`: Which source best captures each actor's true priorities?
- `EV_3`: What are 2-5 direct quotes per key actor that reveal tone or preferences?
- `EV_4`: What prior decisions show each actor's risk tolerance and tradeoff pattern?
- `EV_5`: Which claims are first-hand vs hearsay?

## Evidence collection checklist

Ask for these explicitly when available:

1. Email threads and critical replies
2. Meeting transcripts or call summaries
3. Decision logs (what was chosen, by whom, and why)
4. User notes (sales/CRM notes, negotiation prep, private reflections)
5. Stakeholder docs (policies, proposals, redlines, agendas)

For each artifact, capture:

- source type
- date/time
- actors present
- reliability (`high|medium|low`)
- key quotes
- inferred incentives/constraints

## Scenario data model

```json
{
  "scenario": {
    "name": "Contract renegotiation",
    "goal": "Preserve relationship while improving terms",
    "non_negotiables": ["No exclusivity clause"],
    "constraints": ["Decision due by Friday"]
  },
  "timeline": [{ "date_or_marker": "2026-05-20", "event": "Vendor sent revised terms" }],
  "evidence": [
    {
      "source_type": "email_thread",
      "title": "Renewal terms thread",
      "date_or_range": "2026-05-20 to 2026-05-24",
      "actors": ["Procurement lead", "Legal counsel"],
      "reliability": "high",
      "key_quotes": ["We can move on price, not on liability cap."],
      "signals": ["Hard line on legal risk", "Flexible on commercial terms"]
    }
  ],
  "actors": [
    {
      "name": "Procurement lead",
      "role": "Counterparty",
      "goals": ["Reduce cost"],
      "fears": ["Miss quarterly savings target"],
      "pressures": ["CFO scrutiny"],
      "leverage": ["Can delay signature"],
      "red_lines": ["No uncapped liability"],
      "style_cues": ["Data-first", "Direct and brief"],
      "decision_history": ["Rejected prior proposal over liability exposure"]
    }
  ],
  "uncertainties": ["Whether legal will approve fallback clause"],
  "pathways": []
}
```

## Pathway design template

Create 3-6 branches:

1. **Branch label**: Cooperative / Neutral / Adversarial / Mixed.
2. **Trigger signals**: what indicates this branch is active.
3. **Likely moves**: what each actor does next.
4. **Impact**: near-term and second-order consequences.
5. **User response**: prepared language and tactical move.
6. **Recovery path**: how to regain alignment if this branch degrades.

## Required output template

1. **Scenario Snapshot**
2. **Actor Incentive Matrix** (actor, wants, fears, pressure, leverage, red lines)
3. **Evidence Dossier** (sources, reliability, key quotes, inferred signals)
4. **Pathway Tree**
5. **Response Menu**
6. **Risk / Escalation / Exit Plan**
7. **Information Gaps + Validation Questions**
8. **Rehearsal Drills**

## Optional sub-agent orchestration

If role agents are available:

1. Spin one role agent per key actor plus one facilitator agent.
2. Give each role agent:
   - actor card
   - private incentives
   - unacceptable outcomes
   - communication style constraints
   - evidence snippets and direct quotes from artifacts
3. Run short rounds (3-5 turns) and collect:
   - branch triggered
   - arguments used
   - negotiation pressure points
   - where user prep failed/succeeded
4. Update readiness pack from findings.

### Role prompt skeleton

```text
You represent [Actor Name]. Your goals are [goals]. Your constraints are [constraints].
You must protect [red lines] and seek [wins]. Respond in-character based on your incentives.
Do not optimize for fairness; optimize for this actor's interests.
```
