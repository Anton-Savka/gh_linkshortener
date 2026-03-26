# Authentication Guidelines

## Clerk Only — No Custom Auth

**All authentication in this application is handled exclusively by Clerk.** Do not implement any custom authentication schemes, JWT handling, or alternative auth providers.

- Use only Clerk's SDK components and methods
- Leverage Clerk's built-in session management
- Never store or manage user credentials manually
- All route protection must use Clerk's middleware or server-side helpers

## Protected Routes

### Dashboard (`/dashboard`)

The `/dashboard` route is **protected and requires authentication**. Any unauthenticated user attempting to access it must be redirected to the sign-in page.

**Implementation pattern:**

```ts
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  
  return (
    <div>
      {/* Dashboard content */}
    </div>
  );
}
```

Alternatively, use Clerk middleware to protect the route globally (recommended for multiple protected routes).

## Homepage Redirect Logic

### Authenticated Users → Dashboard

If a logged-in user navigates to the homepage (`/`), they **must be automatically redirected to `/dashboard`**.

**Implementation pattern:**

```tsx
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  
  // Redirect authenticated users to dashboard
  if (userId) {
    redirect("/dashboard");
  }
  
  return (
    <div>
      {/* Homepage content for unauthenticated users */}
    </div>
  );
}
```

## Sign In / Sign Up Modals

### Modal-Only UI

Sign in and sign up flows **must always display as modals**, never as full-page forms.

**Use Clerk's modal components:**

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignInButton mode="modal" />
<SignUpButton mode="modal" />
```

**Key rules:**

- Always set `mode="modal"` on `SignInButton` and `SignUpButton`
- Never create custom sign-in/sign-up pages that replace the Clerk modal
- Modals should appear over the current page, preserving context
- Users can dismiss modals and return to the page they came from

## Server-Side Session Validation

Always validate the user session on the server before performing sensitive operations.

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

// Lightweight — just get userId
const { userId } = await auth();

// Full user object — makes an API call
const user = await currentUser();
```

**Validation in Server Actions:**

```ts
"use server";
import { auth } from "@clerk/nextjs/server";

export async function createLink(url: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  // Proceed with operation scoped to userId
}
```

## Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Both are required. `CLERK_SECRET_KEY` is server-only; `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` can be exposed to the browser.
