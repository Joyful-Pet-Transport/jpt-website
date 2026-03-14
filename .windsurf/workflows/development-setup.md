---
description: Complete development environment setup for Joyful Pet Transport website
---

# Development Setup Workflow

This workflow sets up the complete development environment for the Joyful Pet Transport website project.

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Convex account

## Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.local.template .env.local
# Edit .env.local with your Convex deployment URL and other secrets
```

### 3. Initialize Convex
```bash
npx convex dev --once
```

### 4. Import Initial Data
```bash
# Import user roles
npx convex import --table roles initialData/RolesData.jsonl

# Import services data
npx convex import --table services initialData/ServiceData.jsonl

# Import booking process data
npx convex import --table booking_process initialData/BookingProcess.jsonl

# Import FAQ data
npx convex import --table frequently_asked_questions initialData/FrequentlyAskedQuestions.jsonl

# Import post service data
npx convex import --table post_services initialData/PostService.jsonl

# Import available countries
npx convex import --table available_countries initialData/AvailableCountries.jsonl
```

### 5. Start Development Servers
You need to run both servers simultaneously:

**Terminal 1 - Start Next.js dev server:**
```bash
npm run dev
```

**Terminal 2 - Start Convex dev server:**
```bash
npx convex dev
```

### 6. Verify Setup
- Open http://localhost:3000 in your browser
- Check that the Convex dashboard is accessible
- Verify all data imports are successful

## Common Commands

### Development
- `npm run dev` - Start Next.js development server
- `npx convex dev` - Start Convex development server
- `npm run lint` - Run ESLint

### Convex Management
- `npx convex dashboard` - Open Convex dashboard
- `npx convex logs` - View Convex function logs
- `npx convex deploy` - Deploy to production

### Building
- `npm run build` - Build for production
- `npm run start` - Start production server

## Troubleshooting

### Convex Connection Issues
- Ensure your `.env.local` has the correct Convex deployment URL
- Check that Convex dev server is running
- Verify network connectivity

### Data Import Issues
- Ensure JSONL files are properly formatted
- Check that table names match the schema
- Verify Convex dev server is running before importing

### Port Conflicts
- Next.js default: 3000
- Convex default: 4327
- Use different ports if conflicts occur
