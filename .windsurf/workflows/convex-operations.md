---
description: Common Convex database operations and management tasks
---

# Convex Operations Workflow

This workflow covers common Convex database operations for the Joyful Pet Transport website.

## Convex Project Structure

```
convex/
├── _generated/         # Auto-generated types
├── mutations/          # Database write operations
├── queries/           # Database read operations
├── tables/            # Database table schemas
├── auth.config.ts     # Authentication configuration
├── auth.ts           # Authentication implementation
└── cron.ts           # Scheduled tasks
```

## Development Operations

### 1. Start Convex Development Server
```bash
npx convex dev
```

### 2. View Convex Dashboard
```bash
npx convex dashboard
```

### 3. View Function Logs
```bash
npx convex logs
```

## Data Management

### Import Data from JSONL Files
```bash
# Import available countries
npx convex import --table available_countries initialData/AvailableCountries.jsonl

# Import booking process data
npx convex import --table booking_process initialData/BookingProcess.jsonl

# Import FAQ data
npx convex import --table frequently_asked_questions initialData/FrequentlyAskedQuestions.jsonl

# Import post service data
npx convex import --table post_services initialData/PostService.jsonl

# Import contact us messages
npx convex import --table contact_us initialData/ContactUsData.jsonl
```

### Export Data
```bash
# Export entire database
npx convex export

# Export specific table
npx convex export --table-name <table-name>
```

### Clear Database
```bash
# Clear all data (development only)
npx convex dev --clear
```

## Schema Management

### Update Table Schema
1. Edit files in `convex/tables/`
2. Convex automatically detects schema changes
3. Test with development data before deploying

### Common Table Operations

#### Available Countries
```typescript
// Add new country
await ctx.db.insert("available_countries", {
  name: "Country Name",
  code: "XX",
  flag: "🏳️",
  domestic: false,
  international: true,
});
```

#### Booking Process
```typescript
// Create new booking step
await ctx.db.insert("booking_process", {
  step: 1,
  title: "Step Title",
  description: "Step description",
  fields: ["field1", "field2"],
});
```

#### Contact Us
```typescript
// Save contact message
await ctx.db.insert("contact_us", {
  name: "Customer Name",
  email: "customer@example.com",
  phone: "+1234567890",
  message: "Customer message",
  timestamp: Date.now(),
});
```

## Authentication Operations

### User Management
```typescript
// Create user role
await ctx.db.insert("roles", {
  name: "admin",
  permissions: ["read", "write", "delete"],
});

// Check user permissions
const user = await auth.getUserIdentity();
const role = await ctx.db.query("roles").first();
```

### Authentication Configuration
- Edit `convex/auth.config.ts` for auth providers
- Configure `convex/auth.ts` for custom auth logic
- Update environment variables for auth secrets

## Deployment Operations

### Deploy to Production
```bash
npx convex deploy
```

### Production Data Management
```bash
# Import to production
npx convex import --table <table-name> <file-path> --prod

# Export from production
npx convex export --prod
```

## Scheduled Tasks (Cron Jobs)

### Configure Scheduled Tasks
Edit `convex/cron.ts` to add scheduled operations:

```typescript
export const cronJobs = {
  // Daily backup at 2 AM
  dailyBackup: {
    scheduler: "cron(0 2 * * *)",
    handler: async (ctx) => {
      // Backup logic here
    },
  },
};
```

## Troubleshooting

### Common Issues
- **Schema mismatches**: Ensure table definitions match data
- **Import failures**: Check JSONL file format
- **Permission errors**: Verify auth configuration
- **Connection issues**: Check environment variables

### Debug Commands
```bash
# Check Convex status
npx convex status

# Reset development database
npx convex dev --reset

# Validate schema
npx convex schema validate
```

## Best Practices

### Data Validation
- Use Zod schemas for data validation
- Implement proper error handling
- Validate inputs before database operations

### Performance
- Use indexes for frequently queried fields
- Implement pagination for large datasets
- Cache frequently accessed data

### Security
- Implement proper authentication
- Validate all user inputs
- Use environment variables for secrets
- Implement rate limiting where appropriate
