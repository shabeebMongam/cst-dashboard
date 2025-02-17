# Dashboard

A dashboard built with Next.js and TypeScript.

## Setup Instructions

1. **Environment Setup**
```bash
# Clone the repository
git clone <repository-url>
cd dashboard

# Install dependencies
npm install

# Configure environment variables
# Create .env file and add required variables:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_database_connection_string
```

2. **Database Setup**
```bash
# Initialize database
npm run db:generate
npm run db:migrate
```

3. **Start Development**
```bash
npm run dev
```

<!-- ## Technology Choices & Rationale -->

### Core Technologies
- **Next.js 14 (App Router)**
  - Server-side rendering capabilities
  - Efficient routing and data fetching
  - Built-in performance optimizations

- **TypeScript**
  - Type safety and better developer experience
  - Enhanced code maintainability
  - Better IDE support

- **Clerk Authentication**
  - Comprehensive auth solution
  - Built-in user management
  - Easy integration with Next.js

- **Drizzle ORM**
  - Type-safe database operations
  - Better performance compared to Prisma
  - Simpler migration handling

### UI & Styling
- **Tailwind CSS**
- **Shadcn/ui**

## Project Structure
```
dashboard/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/            # API routes
│   │   └── _components/    # Page-specific components
│   ├── components/         # Shared components
│   ├── context/           # React context providers
│   ├── lib/               # Utility functions
│   ├── config/            # Configuration files
│   └── db/                # Database schema & config
├── public/                # Static assets
└── types/                # TypeScript type definitions
```

## Architecture

1. **Widget-based Architecture**
   - Modular widget system for extensibility
   - Dynamic widget loading
   - Configurable layouts

2. **State Management**
   - React Context for global state
   - Server components for data fetching
   - Optimistic updates for better UX

3. **Database Design**
   - Normalized schema design
   - Type-safe database access

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run db:studio    # Open database GUI
```

