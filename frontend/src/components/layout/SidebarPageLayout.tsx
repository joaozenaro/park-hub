import { PropsWithChildren } from "react";
import SideBar from "./SideBar";
import Header from "./Header";

export default function SidebarPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1">
      <SideBar />
      <div className="flex flex-1 flex-col overflow-auto">
        <Header />
        {children}
      </div>
    </div>
  )
}
