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
    <div className="rounded-2xl border border-amber-300 bg-amber-50 px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <AlertTriangle size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-amber-900">
              AI service temporarily unavailable
            </h3>

            <p className="mt-1 text-sm leading-6 text-amber-800">
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
              border-amber-300
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-amber-800
              shadow-sm
              transition
              duration-200
              hover:border-amber-400
              hover:bg-amber-100
              hover:text-amber-900
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
