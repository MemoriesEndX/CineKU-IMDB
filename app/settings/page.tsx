"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Palette,
  PlaySquare,
  Monitor,
  Shield,
  Link as LinkIcon,
  Info,
  History,
  LifeBuoy,
  MessageCircle,
  Globe,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SupportDialog } from "@/components/support-dialog";


type SettingTab =
  | "appearance"
  | "video"
  | "privacy"
  | "integrations"
  | "support"
  | "about"
  | "changelog";

const tabs: {
  id: SettingTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "appearance", label: "Appearance", icon: Palette },
  // { id: "video", label: "Video Player", icon: PlaySquare },
  { id: "privacy", label: "Privacy", icon: Shield },
  // { id: "integrations", label: "Integrations", icon: LinkIcon },
  { id: "support", label: "Support", icon: LifeBuoy },
  { id: "about", label: "About", icon: Info },
  { id: "changelog", label: "Changelog", icon: History },
];

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

function SettingsTabButton({
  active,
  label,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200",
        active
          ? "bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,0.14)]"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function SectionCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-white/6 bg-white/[0.03] p-5", className)}>
      {title ? <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3> : null}
      {children}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="space-y-4">
      <SectionCard title="About">
        <div className="rounded-2xl bg-white/[0.02] p-4">
          <p className="text-xl font-semibold text-white">CineKU</p>
          <p className="mt-1 text-sm text-zinc-400">Version 5.0.00</p>
        </div>

        <div className="mt-4 rounded-2xl bg-white/[0.02] p-4 text-sm leading-6 text-zinc-400">
          A modern streaming experience with clean navigation, glassmorphism UI,
          and support-friendly controls.
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/[0.04] px-6 py-5 text-center">
            <div className="text-4xl font-semibold tracking-tight text-white">24</div>
            <div className="mt-1 text-sm text-zinc-400">UI Components</div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] px-6 py-5 text-center">
            <div className="text-4xl font-semibold tracking-tight text-white">∞</div>
            <div className="mt-1 text-sm text-zinc-400">Streaming Possibilities</div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function AppearancePanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Theme">
        <div className="grid grid-cols-3 gap-3">
          {["Midnight", "Ocean", "Crimson"].map((item, i) => (
            <button
              key={item}
              className={cn(
                "rounded-2xl border p-4 text-left transition",
                i === 0
                  ? "border-white/20 bg-white/10"
                  : "border-white/6 bg-white/[0.03] hover:bg-white/[0.05]"
              )}
            >
              <div
                className={cn(
                  "mb-3 h-16 rounded-xl",
                  i === 0 && "bg-gradient-to-br from-zinc-900 to-zinc-700",
                  i === 1 && "bg-gradient-to-br from-cyan-900 to-blue-600",
                  i === 2 && "bg-gradient-to-br from-rose-950 to-red-600"
                )}
              />
              <p className="text-sm font-medium text-white">{item}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Interface">
        <div className="space-y-4">
          {["Enable blur effects", "Use compact sidebar", "Animate transitions"].map((label, i) => (
            <label key={label} className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-zinc-200">{label}</span>
              <span className={cn("relative h-6 w-11 rounded-full transition", i !== 1 ? "bg-white" : "bg-white/10") }>
                <span className={cn("absolute top-1 h-4 w-4 rounded-full transition", i !== 1 ? "left-6 bg-black" : "left-1 bg-white")} />
              </span>
            </label>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function VideoPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Playback">
        <div className="space-y-3">
          {["Autoplay next episode", "Remember playback position", "Skip intro automatically"].map((label) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-zinc-200">{label}</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Quality">
        <div className="grid grid-cols-2 gap-3">
          {["Auto", "1080p", "720p", "480p"].map((quality, i) => (
            <button
              key={quality}
              className={cn(
                "rounded-2xl border px-4 py-4 text-sm transition",
                i === 0
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/6 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.05]"
              )}
            >
              {quality}
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}



function PrivacyPanel() {
const faqs = [
    {
      question: "🎬 What is CineKU?",
      answer:
        "CineKU is a movie and TV discovery platform powered by the IMDb API. It helps users explore films, series, and anime with rich metadata such as ratings, release dates, and descriptions.",
    },
    {
      question: "❓ What do we actually do?",
      answer:
        "We provide an interface to browse and discover movies and TV shows. CineKU does not host or store any video content — we only display publicly available information from external APIs.",
    },
    {
      question: "📊 Where does the data come from?",
      answer:
        "All movie, TV show, and anime data displayed on CineKU is sourced from the IMDb database via third-party APIs.",
    },
    {
      question: "⚠️ Can I watch or download movies here?",
      answer:
        "No. CineKU does not provide streaming or downloading services. We are strictly an information and discovery platform.",
    },
    {
      question: "🔒 Is CineKU safe to use?",
      answer:
        "Yes. CineKU does not host harmful content or require sensitive user data. It simply fetches and displays data from trusted external sources.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/[0.03] p-5 border border-white/5">
        <h2 className="text-lg font-semibold text-white mb-2">
          About CineKU
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          CineKU is a modern movie discovery platform designed to help users explore
          films, TV shows, and anime in a clean and user-friendly interface.
          Our goal is to provide a fast and enjoyable way to browse entertainment
          content without unnecessary clutter.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
          >
            <summary className="cursor-pointer list-none text-sm text-zinc-200 flex justify-between items-center">
              {item.question}
              <span className="transition group-open:rotate-90">›</span>
            </summary>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      {/* DISCLAIMER */}
      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
        <p className="text-xs text-yellow-300 leading-relaxed">
          ⚠️ Disclaimer: All content, including movie titles, images, ratings,
          and descriptions displayed on this website is 100% sourced from the
          IMDb database via third-party APIs. CineKU does not own, host, or modify
          any of this data. All rights belong to their respective owners.
        </p>
      </div>
    </div>
  );
}

function IntegrationsPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {["Discord", "AniList", "MyAnimeList"].map((item) => (
        <SectionCard key={item} title={item}>
          <div className="rounded-2xl bg-white/[0.03] p-4">
            <p className="text-sm text-zinc-300">Connect your {item} account</p>
            <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90">
              Connect
            </button>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

function SupportPanel({ onOpenSupport }: { onOpenSupport: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Help Center">
          <div className="space-y-3 text-sm text-zinc-300">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="font-medium text-white">Getting Started</p>
              <p className="mt-1 text-zinc-400">Learn the basics of browsing, saving, and playback.</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="font-medium text-white">Playback Issues</p>
              <p className="mt-1 text-zinc-400">Troubleshoot buffering, audio, or quality problems.</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="font-medium text-white">Account & Profile</p>
              <p className="mt-1 text-zinc-400">Manage login, display name, and saved activity.</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Contact Support" className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Open a support request</p>
                  <p className="text-sm text-zinc-400">Describe the issue and we will follow up through email.</p>
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

            <div className="rounded-2xl bg-white/[0.03] p-4 text-sm text-zinc-400">
              <p className="text-white">Response guidance</p>
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
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition group-hover:scale-105">
                  <social.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{social.label}</p>
                  <p className="mt-1 text-xs text-zinc-400">{social.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function ChangelogPanel() {
  return (
    <div className="space-y-4">
      {[
        {
          version: "v5.0.00",
          notes: "New settings UI, glassmorphism layout, improved navigation, and smoother player preferences.",
        },
        {
          version: "v4.9.12",
          notes: "Performance improvements and enhanced responsive design for smaller screens.",
        },
      ].map((item) => (
        <SectionCard key={item.version}>
          <p className="text-sm font-semibold text-white">{item.version}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{item.notes}</p>
        </SectionCard>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>("support");
  const [supportOpen, setSupportOpen] = useState(false);
  const { data: session } = useSession();

  const content = useMemo(() => {
    switch (activeTab) {
      case "appearance":
        return <AppearancePanel />;
      case "video":
        return <VideoPanel />;
      case "privacy":
        return <PrivacyPanel />;
      case "integrations":
        return <IntegrationsPanel />;
      case "support":
        return <SupportPanel onOpenSupport={() => setSupportOpen(true)} />;
      case "about":
        return <AboutPanel />;
      case "changelog":
        return <ChangelogPanel />;
      default:
        return <AboutPanel />;
    }
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_24%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-10 md:px-6 lg:px-8">
        <div className="ml-0 md:ml-24 lg:ml-28">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <header className="mt-6">
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Settings</h1>
            <p className="mt-3 text-base text-zinc-400">Customize your viewing experience and manage support resources</p>
          </header>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="inline-flex min-w-max items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] p-1">
              {tabs.map((tab) => (
                <SettingsTabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>

          <section className="mt-6 rounded-[2rem] border border-white/8 bg-white/[0.025] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-6">
            {content}
          </section>
        </div>
      </div>

      <SupportDialog open={supportOpen} onOpenChange={setSupportOpen} user={session?.user} />
    </main>
  );
}
