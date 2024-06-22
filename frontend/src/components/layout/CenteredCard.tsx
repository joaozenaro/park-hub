import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function CenteredCard({ children }: Props) {
  return (
    <div className="flex flex-1 bg-zinc-900">
      <div className="max-w-lg m-auto flex flex-col bg-white p-8 rounded-xl  shadow-slate-300 w-[500px] h-[450px]">
        {children}
      </div>
    </div >
  )
}
