# CyberSapient Dashboard

A modern dashboard application built with Next.js, featuring widget-based analytics and user authentication.

## Prerequisites

- Node.js 18.x or higher
- npm package manager
- A Clerk account for authentication

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd cst-dashboard
```

2. Install dependencies:
```bash
npm install

```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```env
DATABASE_URL=database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Available Commands

```bash
# Development server    
npm run dev       # Start development server

# Production build
npm run build    # Create production build

# Start production server
npm start        # Run production server

# Database commands
npm run db:push  # Push database changes

npm run db:studio # Open Drizzle Studio
```


## Features

- 🔐 Authentication with Clerk
- 📊 Customizable widgets
- 🎨 Tailwind CSS styling
- 🗃️ Database integration
- 📱 Responsive design

## Development

The application uses:
- Next.js 14 with App Router
- Clerk for authentication
- Tailwind CSS for styling
- Drizzle ORM for database operations

