# /test - Run Test Suites

## Description
Run tests for the portfolio application with coverage reports.

## Usage
```
/test [target] [options]
```

### Targets
- `client` - Run Angular tests
- `server` - Run Node.js API tests
- `all` - Run all tests (default)

### Options
- `--watch` - Run in watch mode
- `--coverage` - Generate coverage report

## Commands

### Run All Tests
```bash
# Client tests
cd client && ng test --watch=false --code-coverage

# Server tests
cd server && npm test
```

### Watch Mode
```bash
# Client
cd client && ng test

# Server
cd server && npm run test:watch
```

## Coverage Requirements
- **Minimum**: 80% across all metrics
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Coverage Reports
- Client: `client/coverage/lcov-report/index.html`
- Server: `server/coverage/lcov-report/index.html`
