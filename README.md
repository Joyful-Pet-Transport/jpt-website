# Joyful Pet Transport Website

A modern web application built with Next.js and Convex for Joyful Pet Transport services.

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Convex
- **Styling**: Tailwind CSS
- **Animation**: GSAP
- **Icons**: Lucide React, React Icons
- **UI Components**: Class Variance Authority, clsx, tailwind-merge

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Convex account (for backend deployment)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Joyful-Pet-Transport/jpt-website.git
cd jpt-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
# Edit .env.local with your Convex deployment URL and other secrets
```

4. Initialize Convex (if not already done):

```bash
npx convex dev --once
```

## 🚀 Development

### Start the development server:

```bash
npm run dev
```

### Start Convex development server:

```bash
npx convex dev
```

### Run both servers simultaneously:

```bash
# Terminal 1 - Start Next.js dev server
npm run dev

# Terminal 2 - Start Convex dev server
npx convex dev
```

## 📜 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🔧 Convex Commands

- `npx convex dev` - Start Convex development server
- `npx convex deploy` - Deploy Convex functions to production
- `npx convex dashboard` - Open Convex dashboard in browser
- `npx convex logs` - View Convex function logs
- `npx convex import --table <table-name> <file-path>` - Import data from JSONL file to a table

### Data Import Examples

```bash
# Import user roles
npx convex import --table roles initialData/RolesData.jsonl
# Import services data
npx convex import --table services initialData/ServiceData.jsonl
# Import booking process data
npx convex import --table booking_process initialData/BookingProcess.jsonl
# Import faq data
npx convex import --table frequently_asked_questions initialData/FrequentlyAskedQuestions.jsonl
# Import post service data sample
npx convex import --table post_services initialData/PostService.jsonl
# Import available countries sample
npx convex import --table available_countries initialData/AvailableCountries.jsonl


```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/             # Reusable React components
│   ├── containers/         # Layout containers
│   ├── contents/           # Page content components
│   ├── elements/           # Basic UI elements
│   └── ui/                 # UI components
├── convex/                 # Convex backend functions
├── contexts/               # React contexts
├── lib/                    # Utility libraries
├── public/                 # Static assets
├── utils/                  # Helper functions
└── hooks/                  # Custom React hooks
```

## 🎨 Styling

This project uses Tailwind CSS with custom design tokens. Key styling features:

- Responsive design with mobile-first approach
- Custom color palette
- Component-based styling with class-variance-authority
- GSAP animations for enhanced user experience

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Add other environment variables as needed
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm run build
npm run start
```

### Backend (Convex)

```bash
npx convex deploy
```

## 🤖 AI Development Guide

For AI IDE agents and contributors, see [AI_ARCHITECTURE_GUIDE.md](./AI_ARCHITECTURE_GUIDE.md) for architecture, coding patterns, and implementation workflow conventions.

Tool-specific auto-discovery files are also included: `AGENTS.md`, `.github/copilot-instructions.md`, `.cursorrules`, and `.windsurfrules`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## 📝 License

This project is private and proprietary to Joyful Pet Transport.

## 📞 Support

For support or questions, please contact the development team.
