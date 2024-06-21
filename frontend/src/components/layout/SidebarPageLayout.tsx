import { PropsWithChildren } from "react";
import SideBar from "./SideBar";

export default function SidebarPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1">
      <SideBar />
      <div className="flex flex-1 flex-col overflow-auto">
        {children}
      </div>
    </div>
  )
}
