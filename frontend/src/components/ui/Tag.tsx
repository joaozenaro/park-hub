import { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md py-1 px-2 border border-current text-zinc-900  w-min">
      <p className="text-xs font-semibold">{children}</p>
    </div>
  );
}
