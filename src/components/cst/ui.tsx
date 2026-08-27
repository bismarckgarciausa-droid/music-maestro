import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  title,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}) {
  return (
    <section className={cn("panel p-5", className)}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="label-xs">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function Meter({ value, className }: { value: number; className?: string }) {
  const tone =
    value >= 90 ? "bg-success" : value >= 60 ? "bg-primary" : value >= 40 ? "bg-warning" : "bg-destructive";
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div className={cn("h-full rounded-full transition-all", tone)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function Check({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <span className={cn("mt-px font-mono text-xs", ok ? "text-success" : "text-warning")}>
        {ok ? "✓" : "⚠"}
      </span>
      <span className={ok ? "text-foreground" : "text-warning"}>{children}</span>
    </li>
  );
}

export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="label-xs">{label}</div>
      <div className="text-sm text-foreground">{value ?? "—"}</div>
    </div>
  );
}

export function StatusDot({ status }: { status: "complete" | "attention" }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span
        className={cn("size-2 rounded-full", status === "complete" ? "bg-success" : "bg-warning")}
      />
      <span className={status === "complete" ? "text-success" : "text-warning"}>
        {status === "complete" ? "Complete" : "Needs attention"}
      </span>
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-border bg-surface-2 hover:bg-secondary",
        variant === "ghost" && "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  params,
  search,
  children,
  variant = "outline",
}: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      params={params as never}
      search={search as never}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-border bg-surface-2 hover:bg-secondary",
        variant === "ghost" && "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export function SeverityTag({ severity }: { severity: "critical" | "high" | "medium" }) {
  const map = {
    critical: "text-destructive border-destructive/40",
    high: "text-warning border-warning/40",
    medium: "text-muted-foreground border-border",
  } as const;
  return (
    <span className={cn("rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase", map[severity])}>
      {severity}
    </span>
  );
}
