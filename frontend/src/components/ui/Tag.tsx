import clsx from "clsx";
import { ReactNode } from "react";

export default function Tag({
  children,
  type = "primary",
}: {
  children: ReactNode;
  type?: "primary" | "brand" | "danger" | "success" | "secondary" | "tertiary";
}) {
  return (
    <div
      className={clsx("rounded-md py-1 px-2 border border-current w-min", {
        "text-amber-500": type === "brand",
        "text-zinc-900": type === "primary",
        "text-slate-500": type === "secondary",
        "text-slate-200": type === "tertiary",
        "text-emerald-600": type === "success",
        "text-red-600": type === "danger",
      })}
    >
      <p className="text-xs font-semibold">{children}</p>
    </div>
  );
}
