import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export function Card({ children, className }: Props) {
  return (
    <div className={clsx("border rounded-md p-6", className)}>{children}</div>
  );
}
