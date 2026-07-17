import { cn } from "@/lib/utils";
import type { CveRecord } from "@/lib/types";
import { formatCvssScore, getSeverityColor } from "@/lib/utils";

interface CveTerminalLineProps {
  cve: CveRecord;
}

export function CveTerminalLine({ cve }: CveTerminalLineProps) {
  return (
    <div className="group px-3 py-3 border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors">
      {/* Row 1: CVE ID + Severity */}
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-[12px] font-mono font-bold text-foreground truncate">
          {cve.cve_id}
        </span>
        <span
          className={cn(
            "shrink-0 text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded",
            cve.severity === "critical" && "bg-red-accent/10 text-red-accent",
            cve.severity === "high" && "bg-orange-500/10 text-orange-600",
            cve.severity === "medium" && "bg-yellow-100 text-yellow-700",
            cve.severity === "low" && "bg-stone-100 text-muted"
          )}
        >
          {cve.severity}
        </span>
      </div>
      {/* Row 2: CVSS Score */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className={cn("text-[11px] font-bold", getSeverityColor(cve.severity))}>
          CVSS {formatCvssScore(cve.cvss_score)}
        </span>
        <span className="text-border-subtle">·</span>
        <span className="text-[11px] text-muted truncate">{cve.affected_software}</span>
      </div>
      {/* Row 3: Description */}
      <p className="text-[11px] text-muted leading-relaxed">
        {cve.description}
      </p>
    </div>
  );
}

interface TerminalProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export function Terminal({ className, title, children }: TerminalProps) {
  return (
    <div className={cn("rounded-lg border border-border-subtle bg-white overflow-hidden", className)}>
      {title && (
        <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-2.5 bg-surface-hover">
          <span className="h-2 w-2 rounded-full bg-red-accent/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
          <span className="h-2 w-2 rounded-full bg-green-500/50" />
          <span className="text-[11px] text-muted tracking-wider uppercase ml-1 font-sans font-medium">
            {title}
          </span>
        </div>
      )}
      <div className="p-0">{children}</div>
    </div>
  );
}
