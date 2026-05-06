# /debug - AI-Powered Debugging Assistant

## Description
Intelligent debugging that analyzes errors, traces root causes, and suggests fixes.

## Usage
```
/debug [error-message]          # Debug specific error
/debug --file [path]            # Debug issues in file
/debug --runtime                # Analyze runtime errors from logs
/debug --build                  # Fix build/compilation errors
```

## Capabilities

### Error Analysis
- Parse stack traces to identify root cause
- Cross-reference error with codebase
- Check for common Angular/Node.js issues
- Identify dependency conflicts

### Common Issues Handled

#### Angular
- "NG0100: Expression changed after checked"
- "NullInjectorError: No provider for..."
- "Can't bind to 'ngModel'"
- Routing issues
- Lifecycle hook errors
- Change detection problems

#### Node.js
- "Cannot find module"
- "ECONNREFUSED" database errors
- Unhandled promise rejections
- Memory leaks
- CORS errors

#### TypeScript
- Type mismatches
- Missing type definitions
- Strict mode violations

## Workflow

### Step 1: Capture Error
```bash
# Get recent errors from Angular
ng serve 2>&1 | tail -50

# Check Node.js logs
npm run dev 2>&1 | tail -50

# Or paste error directly
```

### Step 2: Analyze
- Identify error type and source
- Find related code
- Check recent changes (git diff)
- Search for similar issues

### Step 3: Suggest Fix
- Provide specific code fix
- Explain why error occurred
- Prevent future occurrences

## Output Format

```markdown
# Debug Report

## Error
`[Error message]`

## Root Cause
The error occurs because...

## Location
`src/app/component.ts:42`

## Fix
```typescript
// Change this:
[incorrect code]

// To this:
[corrected code]
```

## Prevention
To avoid this in the future:
- Recommendation 1
- Recommendation 2
```
