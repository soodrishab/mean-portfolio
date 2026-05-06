# /deploy - Deploy Portfolio to Production

## Description
Deploy the portfolio application to production environments.

## Usage
```
/deploy [target]
```

### Targets
- `frontend` - Deploy Angular app to GitHub Pages
- `backend` - Deploy Node.js API to Railway
- `all` - Deploy both (default)

## Steps

### Frontend Deployment (GitHub Pages)
1. Build Angular for production:
   ```bash
   cd client && ng build --configuration production --base-href /
   ```

2. Copy dist to repository root or use `angular-cli-ghpages`:
   ```bash
   npx angular-cli-ghpages --dir=dist/client/browser
   ```

### Backend Deployment (Railway)
1. Ensure Railway CLI is installed and authenticated
2. Deploy:
   ```bash
   cd server && railway up
   ```

### Post-Deployment Checklist
- [ ] Verify frontend loads at https://rishabsood9.github.io
- [ ] Test API health endpoint
- [ ] Verify MongoDB connection
- [ ] Test contact form submission
- [ ] Check AI chat functionality
