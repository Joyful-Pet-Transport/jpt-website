---
description: Deploy Joyful Pet Transport website to production
---

# Deployment Workflow

This workflow handles the deployment of the Joyful Pet Transport website to production.

## Prerequisites
- Access to Vercel account (for frontend)
- Access to Convex account (for backend)
- All environment variables configured
- Project tested and ready for production

## Steps

### 1. Prepare for Deployment
```bash
# Run linting to ensure code quality
npm run lint

# Build the application to check for errors
npm run build
```

### 2. Deploy Backend (Convex)
```bash
# Deploy Convex functions and schema to production
npx convex deploy
```

### 3. Deploy Frontend (Vercel)
```bash
# If using Vercel CLI
vercel --prod

# Or connect your GitHub repository to Vercel for automatic deployments
```

### 4. Environment Variables Setup
Ensure the following environment variables are set in your production environment:
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`
- Any other required environment variables

### 5. Post-Deployment Verification
- Test the live website functionality
- Verify all forms are working (contact, booking)
- Check authentication flows
- Test dashboard functionality
- Verify Convex data is accessible

## Monitoring and Maintenance

### Check Logs
```bash
# Convex logs
npx convex logs

# Vercel logs (through Vercel dashboard)
```

### Database Management
```bash
# Open Convex dashboard
npx convex dashboard
```

### Rollback Procedures
- Use Vercel's rollback feature for frontend issues
- Use Convex deployment history for backend issues

## Production Data Management

### Import Production Data
```bash
# Only if needed for production setup
npx convex import --table <table-name> <file-path> --prod
```

### Backup Data
- Regular Convex data exports
- Database backups through Convex dashboard

## Security Checklist
- [ ] Environment variables are properly secured
- [ ] No development code in production
- [ ] Authentication is properly configured
- [ ] HTTPS is enabled
- [ ] CORS settings are correct
- [ ] Rate limiting is configured if needed
