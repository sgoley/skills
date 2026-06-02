# Examples

## Scoring run

```bash
node scripts/score_profile.js --input responses.json --output profile.json
```

## Minimal responses.json

```json
{
  "subject": {
    "name": "Example User",
    "age": 29,
    "height_cm": 170,
    "goals": ["Improve consistency", "Lead teams more effectively"]
  },
  "context": {
    "habits_current": ["Late-night scrolling", "Morning planning", "Daily reading"],
    "habits_to_change": [
      {
        "current": "Late-night scrolling",
        "target": "30-minute reading + lights out by 11pm",
        "reason": "Improve sleep and next-day focus"
      }
    ],
    "goals_near_term": ["Ship a portfolio project", "Exercise 3x weekly"],
    "goals_long_term": ["Move into people leadership", "Build durable health routines"],
    "resources": ["Remote flexibility", "Budget for coaching", "AI tools"],
    "support_network": [
      { "role": "Partner", "support_type": "Routine support", "reliability_1_5": 5 },
      { "role": "Manager", "support_type": "Career feedback", "reliability_1_5": 4 }
    ],
    "social_circles": ["Work peers", "Local fitness group", "Online builder community"],
    "influential_inputs": [
      { "type": "book", "name": "Atomic Habits", "why_it_matters": "Habit design language" },
      { "type": "author", "name": "Derek Sivers", "why_it_matters": "Pragmatic simplicity" }
    ],
    "daily_structure": {
      "weekday_pattern": "Morning deep work, afternoon meetings, evening family block",
      "weekend_pattern": "Family-first with one planning block",
      "focus_windows": ["8:30-11:00", "13:00-14:00"],
      "constraints": ["School pickup", "Shared evening responsibilities"]
    }
  },
  "responses": {
    "B5_O_1": 5,
    "B5_O_2R": 2,
    "B5_C_1": 4,
    "B5_C_2R": 2,
    "B5_E_1": 3,
    "B5_E_2R": 3,
    "B5_A_1": 4,
    "B5_A_2R": 2,
    "B5_N_1": 3,
    "B5_N_2R": 3,
    "PS_1": 5,
    "PS_2": 4,
    "PS_3R": 2,
    "PS_4": 4,
    "PS_5": 4,
    "SOC_1": 3,
    "SOC_2": 4,
    "SOC_3R": 3,
    "SOC_4": 4,
    "EMP_1": 4,
    "EMP_2": 4,
    "EMP_3R": 2,
    "EMP_4": 4,
    "RES_1": 3,
    "RES_2": 4,
    "RES_3R": 2,
    "ENG_1": 3,
    "ENG_2": 3,
    "ENG_3": 4,
    "CHR_1": 2
  },
  "via_top_strengths": ["Curiosity", "Kindness", "Perseverance"],
  "disc": { "D": 3, "I": 4, "S": 3, "C": 4 }
}
```

For the Likert items, treat `1` as `not like me` and `5` as `very like me` unless the prompt says it uses a different anchor.

## Output usage pattern

1. Use `scores` for objective signal and confidence.
2. Use `derived_attributes` for the RPG framing.
3. Use context captures (`habits`, `goals`, `resources`, `support`, `influences`, `daily_structure`) to expand the narrative by roughly 25-50% versus minimal output.
4. Use `recommendations_context` to shape practical advice:
   - `leverage` -> strengths to exploit
   - `watchouts` -> risk patterns to mitigate
   - `evidence_gaps` -> what to ask next
