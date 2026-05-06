# /generate-tests - AI Test Generation

## Description
Automatically generate comprehensive unit tests for Angular components, services, and Node.js modules.

## Usage
```
/generate-tests [file-path]           # Generate tests for file
/generate-tests --component [name]    # Generate component tests
/generate-tests --service [name]      # Generate service tests
/generate-tests --coverage            # Generate tests for uncovered code
```

## Test Frameworks
- **Angular**: Jasmine + Karma / Jest
- **Node.js**: Jest

## What It Generates

### Angular Components
- Component creation tests
- Input/Output binding tests
- Template rendering tests
- User interaction tests (click, input)
- Async operation tests
- Lifecycle hook tests

### Angular Services
- Dependency injection tests
- Method behavior tests
- HTTP call mocking
- Error handling tests
- State management tests

### Node.js Controllers
- Request/response tests
- Input validation tests
- Error handling tests
- Database mock tests
- Authentication tests

## Test Structure

### Angular Component Test
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [
        { provide: ServiceName, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('methodName', () => {
    it('should handle success case', () => {
      // Arrange, Act, Assert
    });

    it('should handle error case', () => {
      // Arrange, Act, Assert
    });
  });
});
```

### Node.js Controller Test
```typescript
describe('POST /api/endpoint', () => {
  it('should return 200 with valid data', async () => {
    const response = await request(app)
      .post('/api/endpoint')
      .send({ valid: 'data' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return 400 with invalid data', async () => {
    const response = await request(app)
      .post('/api/endpoint')
      .send({});

    expect(response.status).toBe(400);
  });
});
```

## Coverage Target
- Minimum 80% code coverage
- All public methods tested
- Edge cases covered
- Error paths tested
