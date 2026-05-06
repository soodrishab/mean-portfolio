#!/bin/bash
# Post-edit hook for auto-formatting

FILE="$1"

# Check if file exists
if [ ! -f "$FILE" ]; then
  exit 0
fi

# Get file extension
EXT="${FILE##*.}"

# Format based on file type
case "$EXT" in
  ts|js)
    # Format TypeScript/JavaScript with Prettier if available
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;
  scss|css)
    # Format styles
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;
  html)
    # Format HTML
    if command -v npx &> /dev/null; then
      npx prettier --write "$FILE" 2>/dev/null || true
    fi
    ;;
esac

exit 0
