# /review-pr - Review Pull Request

## Description
Comprehensive AI-powered pull request review that analyzes code changes, identifies issues, and provides actionable feedback.

## Usage
```
/review-pr [pr-number]
/review-pr              # Reviews current branch changes
```

## What It Does

### 1. Gathers Context
- Fetches PR details (title, description, files changed)
- Identifies the base branch and compares changes
- Understands the scope of modifications

### 2. Code Analysis
- **Security**: Checks for vulnerabilities, exposed secrets, injection risks
- **Performance**: Identifies potential bottlenecks, unnecessary re-renders
- **Best Practices**: Angular/Node.js conventions, TypeScript strict mode
- **Testing**: Verifies test coverage for new code

### 3. Review Output
Generates a structured review with:
- Summary of changes
- Issues categorized by severity (🔴 Critical, 🟡 Warning, 🔵 Info)
- Specific line-by-line suggestions
- Approval recommendation

## Workflow

```bash
# Step 1: Get changed files
git diff main...HEAD --name-only

# Step 2: Get detailed diff
git diff main...HEAD

# Step 3: For GitHub PRs
gh pr view [number] --json title,body,files,additions,deletions
gh pr diff [number]
```

## Review Checklist

### Angular Frontend
- [ ] Standalone components used correctly
- [ ] Signals preferred over BehaviorSubject
- [ ] OnPush change detection where applicable
- [ ] No memory leaks (unsubscribe from observables)
- [ ] Lazy loading for routes
- [ ] Accessibility (ARIA, semantic HTML)
- [ ] Responsive design
- [ ] Theme support (dark/light)

### Node.js Backend
- [ ] Input validation with express-validator
- [ ] Proper error handling (try/catch, next(error))
- [ ] No sensitive data in responses
- [ ] Rate limiting on public endpoints
- [ ] Mongoose schema validation

### TypeScript
- [ ] No `any` types
- [ ] Proper interface/type definitions
- [ ] Readonly where applicable
- [ ] No unused variables/imports

### Security
- [ ] No hardcoded secrets/API keys
- [ ] Input sanitization
- [ ] XSS prevention
- [ ] NoSQL injection prevention
- [ ] CORS properly configured

## Output Format

```markdown
# PR Review: [Title]

## Summary
Brief description of what this PR does.

## Changes Analyzed
- `path/to/file.ts` (+25, -10)
- `path/to/other.ts` (+5, -2)

## Issues Found

### 🔴 Critical
1. **Security Risk** - `file.ts:42`
   Hardcoded API key detected.
   ```typescript
   // Bad
   const apiKey = "sk-abc123";
   // Good
   const apiKey = process.env.API_KEY;
   ```

### 🟡 Warnings
1. **Performance** - `component.ts:15`
   Missing OnPush change detection strategy.

### 🔵 Suggestions
1. **Style** - `service.ts:30`
   Consider using readonly for this property.

## Test Coverage
- New code coverage: 85%
- Files missing tests: None

## Verdict
✅ **APPROVED** - Ready to merge
❌ **CHANGES REQUESTED** - Please address critical issues
```
