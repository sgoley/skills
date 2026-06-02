---
name: write-character-sheet
description: Builds an in-depth RPG-style personal character sheet by running a structured interview and converting answers into evidence-weighted scores plus narrative insights. Use when users ask for deep self-profiling, personality mapping (Big Five, VIA, DISC), or context-rich advice based on social, cognitive, emotional, and physical traits.
---

# Write Character Sheet

## Quick start

1. Confirm consent, intended advice domain, and privacy boundaries.
2. Run the interview in [REFERENCE.md](REFERENCE.md) using question IDs.
3. Save answers to JSON (schema in `REFERENCE.md`).
4. Score with `node scripts/score_profile.js --input responses.json --output profile.json`.
5. Deliver an RPG-style sheet with both numeric scorecard and narrative guidance, aiming for about 25-50% more detail than the minimal format.

## Workflows

### 1) Intake and framing

- Clarify what advice this profile will support (career, relationships, health habits, leadership, etc.).
- Explain this is non-clinical profiling for guidance, not diagnosis.
- Ask one question at a time and keep wording neutral.
- Tell the user the final write-up will be concise but richer than baseline, with extra detail on habits, goals, support systems, influences, and daily structure.

### 2) Interview execution

- Collect baseline attributes (age, height, biological constraints, schedule realities).
- Run Big Five mini-inventory.
- Run problem-solving, social ability, empathy, resilience, energy, and chronotype modules.
- Collect VIA top strengths and DISC self-ratings.
- Capture context: obligations, stressors, resources, and hard constraints.
- Capture habits: current patterns, what to keep, what to change, and the desired replacement behavior.
- Capture goals across time horizons (near-term and longer-term).
- Capture resources and support context (tools, budget/time slack, mentors, partner/family support, social circles).
- Capture influential inputs (books, writers, creators, communities, media) and why they matter.
- Capture daily structure (wake/sleep tendency, work blocks, caregiving load, recovery windows, recurring interruptions).
- Use `1-5` ratings as `1 = not like me` and `5 = very like me` unless a question explicitly says otherwise.

### 3) Scoring and synthesis

- Run the scoring script on captured answers.
- Keep low-confidence dimensions visible; do not over-interpret sparse data.
- Convert results into actionable guidance with explicit tradeoffs.
- Integrate taste/context captures into the narrative sections so the output is moderately richer without becoming verbose.

### 4) Output format (required)

Return:

1. **Character Sheet Summary**: archetype sentence and key context.
2. **Core Stats (0-100)**: Big Five + problem solving + social ability + empathy + resilience + energy + chronotype label.
3. **Derived Attributes**: strategist, executor, connector, regulator, vitality.
4. **Habits and Change Intent**: current habits, which to keep, which to change, and target replacements.
5. **Goals and Horizon**: near-term and longer-term goals with priority order.
6. **Resources and Support Map**: tools, slack, support network, and social circles that can help or hinder.
7. **Influential Inputs**: examples of writing/books/media/communities shaping taste and decision style.
8. **Daily Structure Snapshot**: typical day rhythm, constraints, and usable windows.
9. **Strength Perks**: what to lean on.
10. **Known Debuffs / Watchouts**: likely failure modes under stress.
11. **Quest Advice**: concrete next actions tuned to the profile.
12. **Evidence Gaps**: missing data needed before high-stakes advice.

Narrative density target:

- Keep the total output roughly 25-50% longer than the minimal baseline.
- For sections 4-8, provide at least 2-4 concise, specific bullets each.
- Avoid fluff; prefer concrete behaviors, constraints, and examples.

## Advanced features

- Full question bank, scoring IDs, and response schema: [REFERENCE.md](REFERENCE.md)
- Example interview payload + output shape: [EXAMPLES.md](EXAMPLES.md)
