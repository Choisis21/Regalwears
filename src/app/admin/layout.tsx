import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { auth } from "@/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-heading text-lg text-burgundy">Regal Wears</span>
      <span className="rounded-full bg-burgundy/10 px-2.5 py-0.5 text-xs font-medium text-burgundy">
        Admin
      </span>
    </div>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/admin");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="flex">
        {/* Left sidebar (desktop) */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-cream lg:flex">
          <div className="px-5 py-5">
            <Brand />
          </div>
          <div className="flex-1 overflow-y-auto px-3">
            <AdminNav />
          </div>
          <div className="space-y-3 border-t border-border px-5 py-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-burgundy"
            >
              <ArrowLeft className="size-4" />
              Back to site
            </Link>
            <SignOutButton />
          </div>
        </aside>

        {/* Main column */}
        <div className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <header className="border-b border-border bg-cream px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Brand />
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  aria-label="Back to site"
                  className="text-foreground/70 transition-colors hover:text-burgundy"
                >
                  <ArrowLeft className="size-5" />
                </Link>
                <SignOutButton />
              </div>
            </div>
            <div className="mt-3">
              <AdminNav orientation="horizontal" />
            </div>
          </header>

          <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
