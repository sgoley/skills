# Reference

## Response JSON schema

```json
{
  "subject": {
    "name": "optional",
    "age": 31,
    "height_cm": 178,
    "sex_or_gender_context": "optional",
    "health_constraints": ["optional"],
    "schedule_constraints": ["optional"],
    "goals": ["optional"]
  },
  "context": {
    "habits_current": ["optional"],
    "habits_to_change": [
      {
        "current": "optional",
        "target": "optional",
        "reason": "optional"
      }
    ],
    "goals_near_term": ["optional"],
    "goals_long_term": ["optional"],
    "resources": ["optional"],
    "support_network": [
      {
        "role": "optional",
        "support_type": "optional",
        "reliability_1_5": 4
      }
    ],
    "social_circles": ["optional"],
    "influential_inputs": [
      {
        "type": "book|author|media|community|other",
        "name": "optional",
        "why_it_matters": "optional"
      }
    ],
    "daily_structure": {
      "weekday_pattern": "optional",
      "weekend_pattern": "optional",
      "focus_windows": ["optional"],
      "constraints": ["optional"]
    }
  },
  "responses": {
    "B5_O_1": 4,
    "B5_O_2R": 2
  },
  "via_top_strengths": ["Curiosity", "Kindness", "Perseverance"],
  "disc": { "D": 3, "I": 4, "S": 2, "C": 5 },
  "notes": "optional context"
}
```

- Likert answers are `1-5`, where `1 = not like me` and `5 = very like me` unless noted otherwise.
- `R` suffix means reverse-scored.
- Script ignores invalid or missing responses and lowers confidence.

## Question bank (IDs used by script)

Use `1-5` scale: `1 = not like me` / `strongly disagree`, `5 = very like me` / `strongly agree`, unless noted.

### Big Five (10 items)

- `B5_O_1`: I enjoy exploring unfamiliar ideas, art, or perspectives.
- `B5_O_2R`: I avoid abstract or unconventional ideas.
- `B5_C_1`: I finish important tasks before relaxing.
- `B5_C_2R`: I leave projects unfinished when motivation drops.
- `B5_E_1`: I feel energized by group interaction.
- `B5_E_2R`: I avoid social contact even when invited.
- `B5_A_1`: I try to understand the other person's point of view in conflict.
- `B5_A_2R`: I prioritize winning arguments over maintaining trust.
- `B5_N_1`: Small setbacks noticeably affect my mood.
- `B5_N_2R`: I stay calm and steady under pressure.

### Problem-solving style

- `PS_1`: When stuck, I break the problem into smaller parts.
- `PS_2`: I test assumptions with small experiments.
- `PS_3R`: I usually commit to the first plausible solution.
- `PS_4`: I review outcomes and adjust my approach after failures.
- `PS_5`: I can clearly explain my reasoning process to others.

### Social ability

- `SOC_1`: I can build rapport quickly with unfamiliar people.
- `SOC_2`: I adapt my communication style to the audience.
- `SOC_3R`: I struggle to read social cues in live conversation.
- `SOC_4`: I handle disagreement without escalating tension.

### Empathy

- `EMP_1`: I can infer what someone is feeling before they say it directly.
- `EMP_2`: I validate others' feelings even when I disagree with conclusions.
- `EMP_3R`: I dismiss emotional concerns if they are not immediately logical.
- `EMP_4`: I notice when someone needs support without being asked.

### Resilience and stress recovery

- `RES_1`: I can regain focus quickly after emotional disruption.
- `RES_2`: Under sustained stress, I still maintain useful routines.
- `RES_3R`: Stress causes prolonged decision paralysis for me.

### Energy and chronotype

- `ENG_1`: My baseline physical energy is consistently high.
- `ENG_2`: I recover quickly after demanding days.
- `ENG_3`: I can sustain effort without frequent energy crashes.
- `CHR_1`: Time-of-day preference (`1 strong night owl` -> `5 strong morning person`).

### Context and taste capture (non-scored)

Use these prompts to make the final sheet less condensed and more useful for personalization.

- `CTX_HAB_1`: What are your current recurring habits (work, learning, health, social)?
- `CTX_HAB_2`: Which habits do you want to change, and what do you want to replace them with?
- `CTX_GOAL_1`: What are your top goals over the next 30-90 days?
- `CTX_GOAL_2`: What are your top goals over the next 6-24 months?
- `CTX_RES_1`: What resources can you use (time slack, budget, tools, mentors, partner/family help)?
- `CTX_SOC_1`: Who is in your support network, and what support do they provide?
- `CTX_SOC_2`: Which social circles/communities most influence your behavior and standards?
- `CTX_INF_1`: Which books, writers, media, creators, or communities most influence your thinking?
- `CTX_DAY_1`: What does a typical day look like (wake/sleep tendency, work blocks, caregiving, interruptions)?

## VIA strengths capture

Ask user to select top 3-7 VIA strengths and provide one real example for each:

- Creativity, Curiosity, Judgment, Love of Learning, Perspective
- Bravery, Perseverance, Honesty, Zest
- Love, Kindness, Social Intelligence
- Teamwork, Fairness, Leadership
- Forgiveness, Humility, Prudence, Self-Regulation
- Appreciation of Beauty, Gratitude, Hope, Humor, Spirituality

## DISC capture

Use self-ratings `1-5` for each:

- `D`: directness, decisiveness, pace in ambiguity
- `I`: enthusiasm, persuasion, social influence
- `S`: steadiness, patience, support orientation
- `C`: precision, structure, quality control

## Interpretation guardrails

- Treat output as coaching context, not clinical diagnosis.
- Surface confidence per dimension before making strong recommendations.
- For high-impact advice, require follow-up when confidence < 60 on key dimensions.
- Expand narrative output moderately (about 25-50% over minimal baseline), especially around habits, goals, support systems, influences, and daily structure.
