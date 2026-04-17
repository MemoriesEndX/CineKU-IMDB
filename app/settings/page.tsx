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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SupportDialog } from "@/components/support-dialog";
import { AppearancePanel } from "./appearance-panel";
import { VideoPanel } from "@/components/settings/video-panel";
import { PrivacyPanel } from "@/components/settings/privacy-panel";
import { IntegrationsPanel } from "@/components/settings/integrations-panel";
import { SupportPanel } from "@/components/settings/support-panel";
import { AboutPanel } from "@/components/settings/about-panel";
import { ChangelogPanel } from "@/components/settings/changelog-panel";
import { SettingsTabButton } from "./settings-tab-button";

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
    <main className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--foreground))_0.06,transparent_26%),radial-gradient(circle_at_bottom_right,hsl(var(--foreground))_0.04,transparent_24%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-10 md:px-6 lg:px-8">
        <div className="ml-0 md:ml-24 lg:ml-28">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <header className="mt-6">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Settings</h1>
            <p className="mt-3 text-base text-muted-foreground">Customize your viewing experience and manage support resources</p>
          </header>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="inline-flex min-w-max items-center gap-2 rounded-full border border-border/30 bg-card/20 p-1 transition-colors duration-300">
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

          <section className="mt-6 rounded-[2rem] border border-border/30 bg-card/20 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-colors duration-300 md:p-6">
            {content}
          </section>
        </div>
      </div>

      <SupportDialog open={supportOpen} onOpenChange={setSupportOpen} user={session?.user} />
    </main>
  );
}
