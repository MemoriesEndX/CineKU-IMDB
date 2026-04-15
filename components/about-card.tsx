"use client";

import React from "react";

interface AboutCardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AboutCard({
  title,
  icon,
  children,
  className = "",
}: AboutCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-white/8 ${className}`}
    >
      {title && (
        <div className="mb-4 flex items-center gap-3">
          {icon && <div className="text-2xl text-primary">{icon}</div>}
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}
      <div className="text-sm text-foreground/80">{children}</div>
    </div>
  );
}

interface InfoStatProps {
  label: string;
  value: string;
}

export function InfoStat({ label, value }: InfoStatProps) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
      <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
