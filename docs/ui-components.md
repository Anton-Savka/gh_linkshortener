# UI Components Guide

All UI components in this application use **shadcn/ui**. Do not create custom components — always use shadcn/ui components instead.

## Using shadcn/ui Components

### Installation

Components are installed via `npx shadcn-ui@latest add <component-name>`.

Available components are stored in `components/ui/`. Each component is self-contained with all dependencies included.

### Common Components

- **Button** — For all clickable actions and form submissions
- **Input** — For text fields, URLs, and form inputs
- **Card** — For content grouping and layout sections
- **Dialog** — For modals and confirmations
- **Form** — For complex forms with validation
- **Select** — For dropdown selections
- **Badge** — For tags and status indicators
- **Alert** — For warnings and notifications

## Button Usage

```typescript
import { Button } from "@/components/ui/button";

// Default button
<Button onClick={handleClick}>Create Link</Button>

// Variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Secondary Action</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Button</Button>

// Loading state
<Button disabled={isLoading}>
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

## Form Integration

```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LinkForm() {
  return (
    <form action={createLink}>
      <Input 
        type="url" 
        name="url" 
        placeholder="Enter URL..."
        required 
      />
      <Button type="submit">Shorten Link</Button>
    </form>
  );
}
```

## Styling with Tailwind

All shadcn/ui components use Tailwind CSS classes. Use Tailwind utilities for:

- Spacing: `p-4`, `m-2`, `gap-4`
- Colors: `text-blue-600`, `bg-red-100`, `border-gray-300`
- Layout: `flex`, `grid`, `flex-col`, `justify-between`
- Responsive: `sm:`, `md:`, `lg:` prefixes

```typescript
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg border">
  <h2 className="text-lg font-semibold">Title</h2>
  <Button className="w-full">Full Width Button</Button>
</div>
```

## Dark Mode Support

Use Tailwind's `dark:` prefix for dark mode styling:

```typescript
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content
</div>
```

## No Custom Components

- ❌ Do not create custom Button, Input, or Card components
- ✅ Use shadcn/ui components and extend via Tailwind classes
- ✅ Create wrapper/container components that compose shadcn/ui components

Example of acceptable wrapper:

```typescript
export function LinkCard({ title, url, onDelete }) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{url}</p>
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={onDelete}
      >
        Delete
      </Button>
    </Card>
  );
}
```
