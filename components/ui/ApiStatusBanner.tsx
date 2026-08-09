"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ApiStatusBannerProps {
  message?: string;
  onRetry?: () => void;
}

export default function ApiStatusBanner({
  message = "The AI service is temporarily unavailable. Please try again shortly.",
  onRetry,
}: ApiStatusBannerProps) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
            <AlertTriangle size={19} />
          </div>

          <div>
            <h3 className="font-semibold text-amber-200">
              AI service temporarily unavailable
            </h3>

            <p className="mt-1 text-sm leading-6 text-zinc-300">
              {message}
            </p>
          </div>
        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-amber-500/30
              bg-amber-500/10
              px-4
              py-2.5
              text-sm
              font-medium
              text-amber-200
              transition
              duration-200
              hover:border-amber-400/50
              hover:bg-amber-500/20
              hover:text-white
            "
          >
            <RefreshCw size={16} />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}