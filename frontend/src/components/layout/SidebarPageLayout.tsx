import { PropsWithChildren } from "react";

export default function SidebarPageLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <p>Sidebar</p>
      {children}
    </div>
  )
}
