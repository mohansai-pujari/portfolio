import { personal } from "@/data/portfolio";
import { asNonEmptyString } from "@/lib/safe-data";

export default function Footer() {
  const name = asNonEmptyString(personal?.name, "Portfolio");
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {name}. Built with Next.js &amp; Tailwind.
        </p>
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">●</span> Available for opportunities
        </p>
      </div>
    </footer>
  );
}
