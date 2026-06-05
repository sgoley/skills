# Rubber Duck Examples

## Example 1: Plan critique before implementation

User:
"Grill this plan for adding optimistic updates to our dashboard."

Expected critique pattern:

1. Confirm goal and constraints.
2. Surface state-consistency risks (stale cache, rollback gaps, race windows).
3. Mark severity by impact.
4. Propose concrete design adjustments before coding begins.

## Example 2: PR-level implementation review

User:
"Review these auth changes and call out only issues that matter."

Expected critique pattern:

- **Blocking**: token validation bypass, missing audience/issuer checks, refresh token replay risk.
- **Non-Blocking**: weak error signaling that hinders incident response.
- **Suggestion**: tighter test matrix for expiry and rotation behavior.

## Example 3: Test strategy challenge

User:
"I wrote tests for this queue retry system. What did I miss?"

Expected critique pattern:

1. Verify retries are bounded and idempotent.
2. Check backoff behavior under partial outages.
3. Check poison-message handling and dead-letter routing.
4. Identify missing assertions for duplicate delivery and ordering assumptions.

## Example 4: No-issues response

User:
"Pressure-test this migration plan."

If solid, acceptable response shape:

- Assessment Summary: "No blocking issues found; plan appears execution-ready."
- Blocking Issues: None.
- Non-Blocking Issues: optional minor hardening notes only if meaningful.

## Compact issue write-up template

```md
### Blocking: Missing rollback path for failed write-after-read
- Issue: Partial updates can be committed without compensating rollback.
- Impact: Users can observe inconsistent state and duplicate side effects.
- Evidence: `src/orders/service.ts` writes status before downstream confirmation.
- Recommended fix: Wrap status change + side effects in one transaction or add explicit compensation on downstream failure.
```
