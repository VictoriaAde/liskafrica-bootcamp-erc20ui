import { cn } from "../../lib/utils";
import type { PropsWithChildren } from "react";

export default function Wrapper({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mx-auto max-w-5xl w-full px-6", className)}>
      {children}
    </div>
  );
}
