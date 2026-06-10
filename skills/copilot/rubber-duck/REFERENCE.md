# Rubber Duck Reference

## Purpose

Use this skill to pressure-test plans, code, tests, and rollout strategies before costly mistakes happen.

The goal is not broad brainstorming. The goal is to surface high-impact risks, explain why they matter, and suggest practical fixes.

## Review priorities (in order)

1. Correctness and logic safety
2. Security and abuse resistance
3. Data integrity and state consistency
4. Failure handling and recovery behavior
5. Performance/scalability risks with real impact
6. Test coverage gaps that hide the above

## Severity model

- **Blocking**: likely to break expected behavior, cause incorrect output, create exploitable risk, or invalidate the delivery goal.
- **Non-Blocking**: important weakness that should be fixed for reliability/maintainability but does not immediately prevent shipping.
- **Suggestion**: useful improvement with clear upside but not required for success.

Only raise issues with credible impact. If uncertain, say so and lower severity.

## Critique workflow

1. Identify the target goal and constraints.
2. Read enough context to understand assumptions and invariants.
3. Look for realistic failure paths, not hypothetical edge cases with no impact.
4. For each issue, provide evidence and a concrete fix path.
5. If no meaningful issues are found, explicitly say so.

## Required output shape

1. **Assessment Summary** (2-4 lines)
2. **Blocking Issues** (or "None")
3. **Non-Blocking Issues** (or "None")
4. **Suggestions** (optional)

For each issue include:

- **Issue**: one-line statement of the problem
- **Impact**: what fails and why it matters
- **Evidence**: file/behavior/assumption that supports the claim
- **Recommended fix**: specific next action

## What to avoid

- Style-only comments (formatting, naming, grammar)
- "Could be cleaner" advice without concrete risk
- Scope creep into unrelated pre-existing defects
- Vague recommendations without implementation direction
- Contradictory feedback that ignores stated constraints

## Fast quality checks before finalizing critique

- Is each issue tied to the user's goal?
- Is severity justified by impact?
- Is there at least one actionable fix for each issue?
- Are false positives removed?
- If no issues remain, is "looks good to proceed" stated clearly?
