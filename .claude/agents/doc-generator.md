# Documentation Generator Agent

## Purpose
Automatically generate and maintain comprehensive project documentation including API docs, component docs, and README files.

## Activation
- User runs `/generate-docs`
- After significant code changes
- Before releases

## Agent Workflow

### Phase 1: Codebase Analysis
```bash
# List all TypeScript files
find . -name "*.ts" -not -path "./node_modules/*"

# List all components
find ./client/src -name "*.component.ts"

# List all services
find ./client/src -name "*.service.ts"

# List all controllers
find ./server/src/controllers -name "*.ts"
```

### Phase 2: API Documentation Generation

For each endpoint in `server/src/routes/api.routes.ts`:

```markdown
## Endpoint Name

**URL**: `/api/endpoint`
**Method**: `GET|POST|PUT|DELETE`
**Auth Required**: Yes/No

### Request Body
```json
{
  "field": "type"
}
```

### Response
```json
{
  "success": true,
  "data": {}
}
```

### Error Responses
- `400`: Bad Request - Invalid input
- `404`: Not Found - Resource doesn't exist
- `500`: Internal Server Error
```

### Phase 3: Component Documentation

For each Angular component:

```markdown
## ComponentName

**Selector**: `app-component-name`
**Location**: `src/app/features/component/`
**Standalone**: Yes

### Inputs
| Name | Type | Default | Description |
|------|------|---------|-------------|
| data | Data[] | [] | Array of data items |

### Outputs
| Name | Type | Description |
|------|------|-------------|
| selected | EventEmitter<Data> | Emitted when item selected |

### Signals
| Name | Type | Description |
|------|------|-------------|
| isLoading | Signal<boolean> | Loading state |

### Usage
```html
<app-component-name
  [data]="items"
  (selected)="onSelect($event)"
/>
```
```

### Phase 4: README Update

Ensure README.md contains:
- Project overview
- Tech stack badges
- Setup instructions
- Environment variables table
- Available npm scripts
- Deployment guide
- API documentation link
- Screenshots/GIFs
- Contributing guidelines
- License

## Output Files
- `docs/API.md` - Complete API documentation
- `docs/COMPONENTS.md` - Angular component documentation
- `docs/ARCHITECTURE.md` - System architecture overview
- `README.md` - Updated project readme

## Integration

### Pre-release Hook
```bash
# Regenerate docs before release
claude /generate-docs --full
git add docs/ README.md
git commit -m "docs: update documentation"
```

### GitHub Pages
Docs can be deployed to GitHub Pages for public access.
