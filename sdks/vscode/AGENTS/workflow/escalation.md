# Escalation

## Escalate When

- The phase 3 loop reaches 3 rejection rounds. Count reviewer rejections and user implementation rejections that require another focused-coder pass.
- Requirements are contradictory or cannot be satisfied as stated.
- Implementation requires a major scope or architecture change outside the approved spec or plan.
- A dependency, credential, environment, or external decision blocks progress.
- Continuing would risk data loss, security issues, or substantial rework.
- The accepted spec or approved plan needs a critical change.

## Escalation Rules

- Stop the current implementation loop before escalating.
- Do not edit locked specs or plans without user approval.
- Escalate early when continuing would create avoidable rework or violate approved scope.
- If the accepted spec must change, return to phase 1 after user approval.
- If only the approved plan must change, return to phase 2 after user approval unless the change affects accepted scope.

## Escalation Summary Format

- Current iteration and phase.
- What was attempted.
- Current blocker.
- Recurring review issues, if any.
- Likely root cause.
- Options for resolving.
- Recommended path.
- User decision needed.
