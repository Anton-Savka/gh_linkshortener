# Agent Instructions for Link Shortener Project

This document provides comprehensive guidelines for AI agents and LLMs working on this project. These instructions ensure consistency, quality, and adherence to project standards.

## Table of Contents

0. [**MANDATORY: Read /docs Before ANY Code**](#-stop--mandatory-pre-code-requirement-)
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Coding Standards](#coding-standards)
4. [Documentation](#documentation)

## 🚨🚨🚨 STOP — MANDATORY PRE-CODE REQUIREMENT 🚨🚨🚨

> **THIS IS A HARD BLOCK. YOU ARE NOT ALLOWED TO WRITE A SINGLE LINE OF CODE UNTIL YOU HAVE COMPLETED THE STEPS BELOW.**

### ABSOLUTE RULE: Read `/docs` Files Before ANY Code Generation

**Every time. No exceptions. No shortcuts.**

Before generating **ANY** code — including snippets, examples, stubs, or partial implementations — you **MUST** physically open and read every applicable file in the `/docs` directory using your file-reading tools.

**Skimming is not reading. Recalling from context is not reading. You MUST read the file.**

#### Mandatory Steps (in order):

1. **IDENTIFY** which `/docs` files apply to your current task (see table below)
2. **OPEN AND READ** each applicable file in full using your file-reading tools — do NOT rely on memory or summaries
3. **CONFIRM** you have read them before proceeding
4. **APPLY** every pattern, convention, and rule found in those files
5. **ONLY THEN** generate code

#### Non-Compliance Has Serious Consequences

Generating code without reading the relevant `/docs` files **will** produce:

- Security vulnerabilities from bypassed authentication/authorization patterns
- Broken UI that does not match the design system
- Incorrect data access patterns that violate project architecture
- Code that will be rejected and require full rewrite

**There is no valid reason to skip this step. It is always faster to read the docs first.**

---

### Required Documentation by Topic

| Task Area | File to Read | When It Applies |
|---|---|---|
| 🔐 Authentication & authorization | [`docs/authentication.md`](docs/authentication.md) | ANY route protection, auth checks, user data access, Clerk usage, session handling |
| 🎨 UI / Components | [`docs/ui-components.md`](docs/ui-components.md) | ANY UI element, component creation, styling, or layout work |

**If your task touches multiple areas, read ALL applicable files.**
**When in doubt, read the file anyway.**

---

### Correct Workflow

```
1. Receive task
2. Identify applicable /docs files
3. Read each file completely (use file-reading tools — not memory)
4. Apply the documented patterns
5. Generate code
```

**Step 3 is non-negotiable. Do not skip it.**

## Project Overview

This is a link shortener application built with modern web technologies. The application allows users to:

- Create shortened URLs
- Track link analytics
- Manage their links with authentication
- Share links publicly or privately

**Project Type:** Full-stack Next.js application  
**Database:** PostgreSQL (via Neon Database)  
**ORM:** Drizzle ORM  
**Authentication:** Clerk  
**Styling:** Tailwind CSS v4

## Technology Stack

### Core Technologies


- **Framework:** Next.js 16.2.0 (App Router)
- **Runtime:** React 19.2.4
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL via @neondatabase/serverless
- **ORM:** Drizzle ORM 0.45.1
- **Authentication:** Clerk (@clerk/nextjs 7.0.5)
- **Styling:** Tailwind CSS 4.x


## Role of Each Dependency

### Development Tools

- **Package Manager:** npm (implied from workspace)
- **Linter:** ESLint 9.x
- **Database Migrations:** Drizzle Kit 0.31.10
- **TypeScript Executor:** tsx 5

### UI Libraries

- **Icons:** Lucide React ^0.577.0
- **Utilities:** clsx, tailwind-merge, class-variance-authority
- **Animations:** tw-animate-css

### Database & ORM

1. **Drizzle ORM Patterns**

   - Define schemas in `db/schema.ts`
   - Use Drizzle's type-safe query builder
   - Export types from schema definitions
   - Use transactions for multi-step operations

2. **Migrations**
   - Generate migrations with `drizzle-kit`
   - Review generated SQL before applying
   - Never edit schema files directly in production

### Authentication

1. **Clerk Integration**

   - Wrap app with ClerkProvider in root layout
   - Use Clerk hooks for auth state
   - Protect routes with Clerk middleware
   - Use userId from auth() for database associations

2. **Authorization**
   - Always verify user ownership on server actions
   - Implement proper access control for data operations
   - Never trust client-side authorization

## Documentation

### Code Comments

1. **When to Comment**

   - Complex business logic
   - Non-obvious algorithmic decisions
   - Workarounds for known issues
   - Public API functions

2. **JSDoc for Functions**

   ```typescript
   /**
    * Shortens a URL and stores it in the database
    * @param url - The original URL to shorten
    * @param userId - The authenticated user's ID
    * @returns The shortened URL object
    */
   ```

3. **Avoid Obvious Comments**
   - Don't comment what the code clearly shows
   - Focus on "why" not "what"

### Component Documentation

1. **Props Interface**

   - Document complex props with JSDoc
   - Provide examples for non-trivial usage
   - Export prop types for reuse

2. **Component Purpose**
   - Add brief description for complex components
   - Document any non-standard behavior
   - Note dependencies or requirements

## Quick Reference

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx drizzle-kit push # Push schema changes to database
```

### Path Alias

- Use `@/` to reference project root: `import { db } from "@/db"`

### Environment Variables

Required variables (add to `.env`):

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

---

**Note:** This is a living document. Update these guidelines as the project evolves. When in doubt, prioritize consistency with existing code patterns in the project.