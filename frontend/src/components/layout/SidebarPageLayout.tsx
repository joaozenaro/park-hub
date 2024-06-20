import { PropsWithChildren } from "react";

export default function SidebarPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-red-500 flex flex-1">
      <div className="bg-zinc-900">
        <p>Sidebar</p>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
