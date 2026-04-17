import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="h-16 w-16 text-[var(--primary)] mx-auto mb-4 opacity-50" />
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          Episode Not Found
        </h1>
        <p className="text-[var(--muted-foreground)] mb-8">
          The anime episode you're looking for doesn't exist or hasn't been released yet.
        </p>
        <Link href="/anime">
          <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--primary-foreground)]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Anime
          </Button>
        </Link>
      </div>
    </div>
  );
}
