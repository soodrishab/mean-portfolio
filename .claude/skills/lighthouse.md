# /lighthouse - Performance Audit

## Description
Run Lighthouse performance audit on the portfolio website.

## Usage
```
/lighthouse [url]
```

### Default URL
- Local: `http://localhost:4200`
- Production: `https://rishabsood9.github.io`

## Commands

### Run Lighthouse CLI
```bash
# Install Lighthouse globally if not installed
npm install -g lighthouse

# Run audit
lighthouse http://localhost:4200 --output=html --output-path=./lighthouse-report.html

# Run with specific categories
lighthouse http://localhost:4200 \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --output-path=./lighthouse-report.json
```

### Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Select categories and device
4. Click "Analyze page load"

## Target Scores
| Category | Target | Minimum |
|----------|--------|---------|
| Performance | 95+ | 90 |
| Accessibility | 100 | 95 |
| Best Practices | 100 | 95 |
| SEO | 100 | 95 |

## Common Issues & Fixes

### Performance
- Lazy load images with `loading="lazy"`
- Use WebP format for images
- Minimize bundle size with lazy loading
- Enable compression (gzip/brotli)

### Accessibility
- Add alt text to images
- Ensure color contrast ratios
- Use semantic HTML
- Add ARIA labels where needed

### Best Practices
- Use HTTPS
- Avoid deprecated APIs
- No console errors

### SEO
- Add meta descriptions
- Use semantic headings (h1-h6)
- Add Open Graph tags
