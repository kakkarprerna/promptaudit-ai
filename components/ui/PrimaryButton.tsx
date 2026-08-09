"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "success" | "ghost" | "danger";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
  icon?: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500",

  secondary:
    "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700",

  success:
    "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500",

  ghost:
    "bg-transparent hover:bg-zinc-800 text-zinc-300 border border-zinc-800",

  danger:
    "bg-red-600 hover:bg-red-500 text-white border border-red-500",
};

export default function PrimaryButton({
  children,
  className,
  variant = "primary",
  loading = false,
  disabled,
  icon,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "active:scale-[0.98]",
        variants[variant],
        className
      )}
    >
      {icon}

      {loading ? "Please wait..." : children}
    </button>
  );
}