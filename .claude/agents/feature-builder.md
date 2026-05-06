# Feature Builder Agent

## Purpose
Autonomous agent that builds complete features from requirements, including frontend, backend, and tests.

## Activation
- User describes a feature to implement
- User provides a Jira/GitHub issue
- User runs `/build-feature [description]`

## Agent Workflow

### Phase 1: Requirements Analysis
```
1. Parse feature requirements
2. Identify affected areas (frontend/backend/both)
3. Break down into tasks
4. Estimate complexity
5. Ask clarifying questions if needed
```

### Phase 2: Design
```
1. Design data models (if needed)
2. Plan API endpoints (if needed)
3. Design component structure
4. Identify reusable patterns
5. Consider edge cases
```

### Phase 3: Implementation

#### Backend First (if applicable)
```
1. Create/update Mongoose models
2. Implement controller logic
3. Add route handlers
4. Add input validation
5. Write unit tests
```

#### Frontend
```
1. Create Angular component (standalone)
2. Add service methods
3. Implement template
4. Add styles (with theme support)
5. Handle loading/error states
6. Write component tests
```

### Phase 4: Integration
```
1. Connect frontend to backend
2. Handle API errors gracefully
3. Add loading indicators
4. Test end-to-end flow
```

### Phase 5: Polish
```
1. Add animations
2. Ensure responsive design
3. Test dark/light mode
4. Add accessibility features
5. Optimize performance
```

### Phase 6: Documentation
```
1. Update API documentation
2. Add inline code comments
3. Update CLAUDE.md if needed
4. Create usage examples
```

## Example Usage

### Input
```
Build a "Featured Projects" carousel for the homepage that:
- Shows top 3 projects with images
- Auto-rotates every 5 seconds
- Has manual navigation dots
- Pauses on hover
```

### Agent Output
```
📋 Task Breakdown:
1. Create ProjectCarouselComponent
2. Add carousel logic with signals
3. Implement auto-rotation timer
4. Add navigation dots
5. Style with animations
6. Add tests

🚀 Starting implementation...

✅ Created: src/app/shared/components/project-carousel/
✅ Added: Carousel styles with transitions
✅ Added: Unit tests (100% coverage)
✅ Integrated: Homepage component

📊 Summary:
- Files created: 3
- Lines of code: 245
- Test coverage: 100%
- Time taken: ~5 minutes
```

## Quality Gates
Before marking complete:
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No lint warnings
- [ ] Responsive on mobile
- [ ] Works in dark/light mode
- [ ] Accessible (keyboard nav, screen readers)
