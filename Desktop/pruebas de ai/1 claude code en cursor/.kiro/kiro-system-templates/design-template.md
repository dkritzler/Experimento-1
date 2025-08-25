# Design: [Feature Name]

## Architecture Overview
High-level architecture and how this feature fits into GutWise ecosystem.

## Technical Stack
- Frontend: Next.js 15, TypeScript, Tailwind CSS
- Backend: Supabase (as specified in MCP requirements)
- Database: PostgreSQL via Supabase
- Additional: [any specific technologies]

## Component Design

### New Components
1. **ComponentName** (`path/ComponentName.tsx`)
   - Purpose: [what it does]
   - Props: [interface definition]
   - State: [what state it manages]

2. **ComponentName2** (`path/ComponentName2.tsx`)
   - Purpose: [what it does]
   - Props: [interface definition]
   - State: [what state it manages]

### Modified Components
1. **ExistingComponent** (`path/ExistingComponent.tsx`)
   - Changes: [what will be modified]
   - Impact: [how it affects other parts]

## Database Schema

### New Tables
```sql
CREATE TABLE table_name (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- additional fields
);
```

### Modified Tables
- **existing_table**: [what columns will be added/modified]

## API Design

### New Endpoints
- `GET /api/feature` - [description]
- `POST /api/feature` - [description]

### Modified Endpoints
- `GET /api/existing` - [what changes]

## Data Flow
1. User action triggers [component]
2. Component calls [API/service]
3. Data flows to [database/external service]
4. Response updates [UI components]

## Security Considerations
- Authentication: [requirements]
- Authorization: [RLS policies needed]
- Data validation: [Zod schemas]

## Performance Considerations
- Expected load: [users/requests per timeframe]
- Caching strategy: [what will be cached]
- Database indexing: [what indexes needed]

## Integration Points
- Existing systems that will be affected
- External APIs that will be used
- Dependencies on other components

## Error Handling
- Expected error scenarios
- Fallback behaviors
- User-facing error messages

## Testing Strategy
- Unit tests: [what components/functions]
- Integration tests: [what workflows]
- E2E tests: [what user journeys]