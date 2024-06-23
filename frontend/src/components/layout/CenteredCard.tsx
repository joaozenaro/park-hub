import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export default function CenteredCard({ children, className }: Props) {
  return (
    <div className="flex flex-1 bg-zinc-900">
      <div className={clsx("max-w-lg m-auto flex flex-col bg-white p-8 rounded-xl  shadow-slate-300 w-[500px] h-[480px] overflow-auto scrollbar", className)}>
        {children}
      </div>
    </div >
  )
}
