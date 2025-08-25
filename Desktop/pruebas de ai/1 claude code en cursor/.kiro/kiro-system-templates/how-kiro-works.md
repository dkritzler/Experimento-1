# Kiro System - How It Works

## Overview
The Kiro System is an adaptation of Amazon's spec-driven development methodology for GutWise. It ensures structured feature development with clear requirements, thoughtful design, and systematic implementation.

## The Three Phases

### Phase 1: Requirements (`requirements.md`)
**Purpose**: Define WHAT needs to be built and WHY

**Key Elements**:
- User stories from customer perspective
- EARS format acceptance criteria (Given/When/Then)
- Success metrics for measuring impact
- Risk assessment and mitigation
- Clear scope boundaries

**Approval Gate**: User must explicitly approve requirements before proceeding to design.

### Phase 2: Design (`design.md`)  
**Purpose**: Define HOW it will be built

**Key Elements**:
- Technical architecture aligned with GutWise stack
- Component design with clear interfaces
- Database schema changes
- API endpoint specifications
- Security and performance considerations

**Approval Gate**: User must explicitly approve design before proceeding to tasks.

### Phase 3: Tasks (`tasks.md`)
**Purpose**: Break down implementation into actionable steps

**Key Elements**:
- Sequential, numbered tasks
- Clear dependencies between tasks
- Time estimates for planning
- Traceability back to requirements
- Definition of done criteria

**Approval Gate**: User must explicitly approve task breakdown before implementation begins.

## Implementation Guidelines

### For Claude Code
1. **Always check existing specs first** before starting new features
2. **Use templates** to ensure consistency and completeness
3. **Require explicit approval** at each phase gate
4. **Maintain traceability** from requirements through to code
5. **Work incrementally** - one task at a time, not all at once
6. **Update specs** if changes are needed during implementation

### For Users
1. **Review each phase carefully** before giving approval
2. **Provide specific feedback** if changes are needed
3. **Consider long-term implications** during design review
4. **Validate task breakdown** matches your expectations

## Benefits

### Reduced Risk
- Requirements are clear before coding starts
- Technical decisions are thought through upfront
- Implementation is planned and systematic

### Better Quality
- All edge cases considered in requirements phase
- Architecture is designed for maintainability
- Testing strategy is planned from the beginning

### Faster Development
- Less rework due to unclear requirements
- Fewer surprises during implementation
- Clear progress tracking through numbered tasks

### Enhanced Collaboration
- Shared understanding through written specifications
- Clear approval points for stakeholder input
- Documentation that serves as long-term reference

## GutWise-Specific Adaptations

### Technology Constraints
- Must use Supabase for backend (per MCP requirements)
- Next.js 15 + TypeScript for frontend
- Organic/bio-inspired UI design patterns

### Project Context
- Health-focused user experience considerations
- Privacy and security requirements for health data
- Integration with existing AI pattern detection
- Mobile-first responsive design requirements

### Success Metrics
- User engagement with gut health tracking
- Accuracy of AI insights and recommendations
- Performance on mobile devices
- Accessibility compliance

## File Organization
```
.kiro/
├── specs/
│   ├── feature-1/
│   │   ├── requirements.md
│   │   ├── design.md
│   │   └── tasks.md
│   └── feature-2/
│       ├── requirements.md
│       ├── design.md
│       └── tasks.md
└── kiro-system-templates/
    ├── requirements-template.md
    ├── design-template.md
    ├── tasks-template.md
    └── how-kiro-works.md
```

## When to Use Kiro
- **New features** that will take more than a few hours to implement
- **Complex changes** that affect multiple components or systems
- **User-facing features** that require UX consideration
- **Backend changes** that affect data models or APIs

## When NOT to Use Kiro
- **Bug fixes** that are clearly scoped
- **Simple styling changes** or minor UI tweaks
- **Configuration changes** or environment setup
- **Emergency hotfixes** that need immediate deployment