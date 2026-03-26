import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Link2, BarChart2, Settings2, Lock } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Instant URL Shortening",
    description:
      "Turn any long URL into a clean, shareable short link in seconds. Perfect for social media, emails, and anywhere character count matters.",
  },
  {
    icon: BarChart2,
    title: "Click Analytics",
    description:
      "Track how many times each link is clicked. Get insight into which links perform best and understand your audience.",
  },
  {
    icon: Settings2,
    title: "Link Management",
    description:
      "Organize all your short links in one place. Edit, disable, or delete links at any time from your personal dashboard.",
  },
  {
    icon: Lock,
    title: "Public & Private Sharing",
    description:
      "Choose who can access your links. Keep them private for internal use or share them publicly with anyone.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  // Redirect authenticated users to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Shorten links. Track clicks.{" "}
          <span className="text-primary">Stay in control.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          A fast, lightweight link shortener with built-in analytics and access
          controls. Create short links in seconds and monitor their performance
          from your dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg">Get Started — It&apos;s Free</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to manage your links
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-6 px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="max-w-md text-muted-foreground">
          Create your free account and start shortening links today.
        </p>
        <SignUpButton mode="modal">
          <Button size="lg">Create Free Account</Button>
        </SignUpButton>
      </section>
    </div>
  );
}
