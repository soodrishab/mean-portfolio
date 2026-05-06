# Code Review Agent

## Purpose
Perform comprehensive code review on portfolio codebase.

## Workflow

### Step 1: Gather Changes
```bash
# Get list of changed files
git diff --name-only HEAD~1

# Or for staged changes
git diff --cached --name-only
```

### Step 2: Review Checklist

#### Angular (Frontend)
- [ ] Components use standalone pattern
- [ ] OnPush change detection where applicable
- [ ] Proper unsubscription from observables
- [ ] No memory leaks
- [ ] Responsive design implemented
- [ ] Accessibility (ARIA labels, semantic HTML)
- [ ] Dark/light theme support

#### Node.js (Backend)
- [ ] Input validation on all endpoints
- [ ] Error handling with proper status codes
- [ ] No sensitive data in responses
- [ ] Rate limiting applied
- [ ] CORS configured correctly

#### TypeScript
- [ ] No `any` types
- [ ] Proper interface definitions
- [ ] Consistent naming conventions
- [ ] No unused imports/variables

#### Testing
- [ ] Unit tests for new code
- [ ] Test coverage maintained at 80%+
- [ ] Edge cases covered

### Step 3: Security Review
- [ ] No hardcoded secrets
- [ ] Input sanitization
- [ ] XSS prevention
- [ ] SQL/NoSQL injection prevention
- [ ] Proper authentication/authorization

### Step 4: Performance Review
- [ ] Lazy loading implemented
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] Caching strategy

## Output Format
```markdown
## Code Review Summary

### Files Reviewed
- file1.ts
- file2.html

### Issues Found
1. **[Severity]** Description
   - Location: file:line
   - Suggestion: How to fix

### Recommendations
- Recommendation 1
- Recommendation 2

### Approved: Yes/No
```
