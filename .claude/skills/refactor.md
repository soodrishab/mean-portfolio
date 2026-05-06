# /refactor - Intelligent Code Refactoring

## Description
AI-powered refactoring that improves code quality while maintaining functionality.

## Usage
```
/refactor [file-path]           # Refactor specific file
/refactor [file-path] --dry-run # Preview changes without applying
/refactor --component [name]    # Refactor Angular component
/refactor --service [name]      # Refactor service
```

## Refactoring Capabilities

### Angular Components
- Convert to standalone components
- Add OnPush change detection
- Replace BehaviorSubject with Signals
- Extract reusable logic into services
- Optimize template expressions
- Add trackBy to *ngFor / track to @for

### Services
- Implement proper dependency injection
- Add error handling
- Convert callbacks to async/await
- Add proper typing
- Extract interfaces

### TypeScript
- Remove `any` types with proper interfaces
- Add readonly modifiers
- Simplify complex conditionals
- Extract magic numbers/strings to constants
- Apply DRY principle

## Workflow

### Step 1: Analyze Current Code
```bash
# Read the target file
cat [file-path]

# Check for related files (tests, interfaces)
find . -name "*[component-name]*"
```

### Step 2: Identify Improvements
- Code smells
- Performance issues
- Missing best practices
- Duplicated logic

### Step 3: Apply Refactoring
- Make incremental changes
- Preserve functionality
- Update related tests

### Step 4: Verify
```bash
# Run tests
npm test

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## Example Transformations

### Before: BehaviorSubject
```typescript
private dataSubject = new BehaviorSubject<Data[]>([]);
data$ = this.dataSubject.asObservable();

updateData(data: Data[]) {
  this.dataSubject.next(data);
}
```

### After: Signals
```typescript
private readonly _data = signal<Data[]>([]);
readonly data = this._data.asReadonly();

updateData(data: Data[]) {
  this._data.set(data);
}
```

## Output
- List of changes made
- Before/after comparisons
- Test verification results
