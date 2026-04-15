"use client";

import React from "react";

interface LegalPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-3xl space-y-6 px-4 py-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-foreground/70">{description}</p>
          )}
        </div>

        <div className="rounded-xl border border-white/5 bg-white/5 p-8 backdrop-blur-md">
          <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>

        <div className="pt-4 text-center text-xs text-foreground/50">
          <p>Last updated: April 2026 | CineKU</p>
        </div>
      </div>
    </div>
  );
}
