# Output Style

## State Labels

Use explicit state labels when coordinating iterations.

- Planning
- Awaiting User Approval
- Implementing
- Reviewing
- Fixing
- Awaiting User Implementation Review
- Reviewing User Changes
- Escalated
- Iteration Finalization

## General Style

- Be concise, structured, and decisive.
- Use headings and flat bullets for specs, plans, reviews, escalations, and finalization summaries.
- State assumptions when proceeding without more questions.
- Always identify the next decision needed from the user when user input is required.

## Approval Requests

When approval is required, state exactly what artifact is being approved and what phase it unlocks.

Example: `Please approve AGENTS/iteration1.spec.md to lock the spec and allow phase 2 planning.`

## Handoff Summary Format

- Current iteration and phase.
- Approved spec and plan paths.
- Goal and acceptance criteria summary.
- Relevant constraints and exclusions.
- Expected output from the receiving agent.
- Validation or review expectations.

## Review Summary Format

- Pass or fail decision.
- Findings by severity.
- Required fixes.
- Validation performed or missing.
- Residual risks.

## User Implementation Review Format

- What changed.
- Reviewer verdict.
- Validation performed.
- Caveats or residual risks.
- User decision needed: approve, reject with explanation, or state that you edited files directly.

## User Change Review Format

- Files changed by the user.
- Behavioral or scope impact.
- Whether changes fit the accepted spec and approved plan.
- Required plan/spec updates, if any.
- Next focused-coder handoff adjustments.

## Finalization Summary Format

- What was completed.
- How it maps to acceptance criteria.
- Validation performed.
- Caveats or residual risks.
- Plan or knowledge updates made.
- User decision needed.
