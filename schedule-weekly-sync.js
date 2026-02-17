// GitHub Actions workflow for weekly sync
// Save this as .github/workflows/weekly-sync.yml

/*
name: Weekly Google Reviews Sync
on:
  schedule:
    # Run every Sunday at 2:00 AM UTC
    - cron: '0 2 * * 0'
  workflow_dispatch: # Allow manual triggering

jobs:
  sync-reviews:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Trigger weekly sync
        run: npx convex run --trigger cron/triggerWeeklySync
        env:
          CONVEX_DEPLOYMENT: ${{ secrets.CONVEX_DEPLOYMENT }}
          CONVEX_TOKEN: ${{ secrets.CONVEX_TOKEN }}
*/

// Alternative: Vercel Cron Jobs
// Add this to vercel.json:
/*
{
  "crons": [
    {
      "path": "/api/sync-reviews",
      "schedule": "0 2 * * 0"
    }
  ]
}
*/

// Then create /api/sync-reviews endpoint that calls the Convex action
