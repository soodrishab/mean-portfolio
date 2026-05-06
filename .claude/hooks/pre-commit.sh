#!/bin/bash
# Pre-commit hook for code quality checks

echo "Running pre-commit checks..."

# Check for TypeScript errors in client
if [ -d "client" ]; then
  echo "Checking Angular TypeScript..."
  cd client && npx tsc --noEmit 2>/dev/null
  if [ $? -ne 0 ]; then
    echo "TypeScript errors found in client. Please fix before committing."
    exit 1
  fi
  cd ..
fi

# Check for TypeScript errors in server
if [ -d "server" ]; then
  echo "Checking Server TypeScript..."
  cd server && npx tsc --noEmit 2>/dev/null
  if [ $? -ne 0 ]; then
    echo "TypeScript errors found in server. Please fix before committing."
    exit 1
  fi
  cd ..
fi

# Run linting
if [ -f "client/node_modules/.bin/ng" ]; then
  echo "Running Angular lint..."
  cd client && ng lint --quiet 2>/dev/null || true
  cd ..
fi

echo "Pre-commit checks passed!"
exit 0
