import { MessageCircle, Facebook, Instagram, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionCard } from "./section-card";

const socialLinks = [
  {
    label: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=100010802672227",
    description: "Follow updates and community posts.",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/cineku_/",
    description: "See highlights, clips, and announcements.",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:memoriesendx@gmail.com",
    description: "Send direct questions or feedback.",
  },
];

export function SupportPanel({ onOpenSupport }: { onOpenSupport: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Help Center">
          <div className="space-y-3 text-sm text-[var(--muted-foreground)]">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="font-medium text-[var(--foreground)]">Getting Started</p>
              <p className="mt-1 text-[var(--muted-foreground)]">Learn the basics of browsing, saving, and playback.</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="font-medium text-[var(--foreground)]">Playback Issues</p>
              <p className="mt-1 text-[var(--muted-foreground)]">Troubleshoot buffering, audio, or quality problems.</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="font-medium text-[var(--foreground)]">Account & Profile</p>
              <p className="mt-1 text-[var(--muted-foreground)]">Manage login, display name, and saved activity.</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Contact Support" className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <MessageCircle className="h-5 w-5 text-[var(--foreground)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Open a support request</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Describe the issue and we will follow up through email.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenSupport}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
              >
                Open Support Dialog
              </button>
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-4 text-sm text-[var(--muted-foreground)]">
              <p className="text-[var(--foreground)]">Response guidance</p>
              <p className="mt-2 leading-6">
                For faster help, include device type, page name, and what you expected to happen.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Community & Social">
        <div className="grid gap-3 md:grid-cols-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group rounded-2xl border border-white/6 bg-white/[0.03] p-4 transition-all duration-200",
                "hover:border-white/15 hover:bg-white/[0.05]"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[var(--foreground)] transition group-hover:scale-105">
                  <social.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{social.label}</p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{social.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
