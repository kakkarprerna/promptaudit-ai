import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800/80 bg-zinc-900/90 backdrop-blur-xl shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}