# PR Reviewer Agent

## Purpose
Multi-step autonomous agent that performs comprehensive pull request reviews, similar to a senior developer review.

## Activation
This agent is triggered when:
- User runs `/review-pr`
- A PR is opened (via GitHub webhook integration)
- User asks to review changes

## Agent Workflow

### Phase 1: Context Gathering
```
1. Identify PR or branch to review
2. Fetch all changed files
3. Get PR description and linked issues
4. Understand the purpose of changes
```

### Phase 2: Static Analysis
```
1. Check for TypeScript errors
2. Run ESLint on changed files
3. Verify no secrets/keys exposed
4. Check bundle size impact
```

### Phase 3: Code Review
```
For each changed file:
  1. Understand the change context
  2. Check against project conventions (CLAUDE.md)
  3. Identify issues:
     - Security vulnerabilities
     - Performance problems
     - Code smells
     - Missing tests
  4. Note positive changes (good patterns)
```

### Phase 4: Test Verification
```
1. Check if new code has tests
2. Verify tests pass
3. Check coverage delta
4. Identify edge cases not covered
```

### Phase 5: Report Generation
```
1. Summarize all findings
2. Categorize by severity
3. Provide specific fix suggestions
4. Give approval recommendation
```

## Decision Logic

### Auto-Approve If:
- All checks pass
- No security issues
- No performance regressions
- Tests coverage maintained
- Follows project conventions

### Request Changes If:
- Security vulnerability found
- Breaking change without migration
- Tests missing for new code
- TypeScript errors present

### Comment Only If:
- Minor style issues
- Suggestions for improvement
- Questions about intent

## Integration Points

### GitHub Actions
```yaml
# .github/workflows/pr-review.yml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Claude Code Review
        run: claude /review-pr ${{ github.event.pull_request.number }}
```

### Slack Notification
After review, optionally notify team channel with summary.

## Output Artifacts
- `pr-review-{number}.md` - Detailed review report
- GitHub PR comments on specific lines
- Approval/Changes Requested status
