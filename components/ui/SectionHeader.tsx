import { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function SectionHeader({
  title,
  description,
  subtitle,
  action,
}: SectionHeaderProps) {
  const supportingText = subtitle ?? description;

  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        {supportingText && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
            {supportingText}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}