# GutWise - AI-Powered Gut Health Platform

## Project Overview
GutWise is a comprehensive gut health tracking application that uses AI to analyze dietary patterns, identify food sensitivities, and provide personalized recommendations for optimal digestive health.

## Tech Stack
- **Framework**: Next.js 15.5.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom organic theme
- **State**: Zustand with persistence
- **Animations**: Framer Motion, Three.js
- **Validation**: Zod
- **Database**: PostgreSQL with Prisma (pending)
- **Auth**: NextAuth.js (pending)

## Commands

### Development
```bash
npm install        # Install dependencies
npm run dev        # Start development server (port 3000)
npm run dev:debug  # Start with debug logging (future)
```

### Build & Production
```bash
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Database (When Implemented)
```bash
npm run db:push    # Push schema to database
npm run db:migrate # Run migrations
npm run db:seed    # Seed with sample data
npm run db:studio  # Open Prisma Studio
```

## Project Structure
```
src/
├── app/              # Next.js app router pages
│   ├── api/         # API routes (to be implemented)
│   ├── (auth)/      # Auth pages (login, register)
│   ├── (dashboard)/ # Protected dashboard pages
│   └── ...          # Public pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── dashboard/   # Dashboard components
│   ├── logger/      # Food/symptom logging
│   ├── insights/    # AI insights visualization
│   └── ...          # Feature-specific components
├── lib/             # Utilities and helpers
│   ├── validation.ts # Zod schemas
│   ├── storage.ts   # Local storage utilities
│   └── utils.ts     # General utilities
├── services/        # API service layer
│   └── api.ts       # API client
├── store/           # Zustand state management
└── types/           # TypeScript definitions
```

## Key Features & Routes

### Public Routes
- `/` - Landing page with hero section
- `/how-it-works` - Feature explanation
- `/about` - About the platform
- `/login` - User authentication

### Protected Routes
- `/onboarding` - New user setup wizard
- `/logger` - Food & symptom tracking
  - Time Spiral Logger
  - Detailed Logger
  - Quick Meal Logger
- `/insights` - AI-powered pattern analysis
- `/microbiome` - Interactive microbiome visualization
- `/health-3d` - 3D health patterns
- `/recommendations` - Personalized recipes & products
- `/account` - User settings & profile

## Environment Variables
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gutwise"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
APPLE_ID=""
APPLE_SECRET=""

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# AI Services
OPENAI_API_KEY="sk-..."

# Storage
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

## Design System

### Colors
- **Bio Green**: `#00FF88` - Primary actions, success states
- **Probiotic Purple**: `#8B5CF6` - Secondary elements, insights
- **Enzyme Orange**: `#FF6B35` - Warnings, symptoms
- **Organic Brown**: `#D2691E` - Earth tones, natural elements

### UI Components
- `OrganicContainer` - Blob-shaped containers with organic borders
- `OrganicButton` - Buttons with organic shapes and animations
- `FloatingNavigation` - Circular navigation menu
- `CellularParticles` - Animated background particles

### Animation Guidelines
- Use Framer Motion for smooth transitions
- Organic, flowing movements (no sharp transitions)
- Subtle hover states with scale and glow effects
- Loading states with pulsing bio animations

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Implement proper error boundaries
- Follow React best practices (hooks, composition)
- Keep components small and focused
- Use custom hooks for reusable logic

### State Management
- Global state in Zustand store
- Local state with useState/useReducer
- Server state with React Query (future)
- Form state with react-hook-form + Zod

### API Patterns
- All API calls through service layer
- Proper error handling with try-catch
- Loading states for all async operations
- Optimistic updates where appropriate
- Offline support with sync queue


## Testing Strategy

### Unit Tests
- Jest/Vitest for component testing
- Testing Library for React components
- Mock service worker for API mocking

### E2E Tests
- Playwright for end-to-end testing
- Critical user journeys
- Cross-browser testing

### Performance
- Lighthouse CI for performance monitoring
- Bundle size analysis
- Core Web Vitals tracking

## Deployment

### Staging
- Vercel preview deployments
- Environment variable management
- Database migrations

### Production
- Vercel/AWS deployment
- PostgreSQL on Railway/Supabase
- CDN for static assets
- Error monitoring with Sentry
- Analytics with Vercel Analytics

## Contributing

1. Create feature branch from `main`
2. Follow code style guidelines
3. Write tests for new features
4. Update documentation
5. Submit PR with description

## Support

For issues or questions:
- GitHub Issues for bug reports
- Discord community (future)
- Email: support@gutwise.app (future)