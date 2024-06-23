import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function Content({ children }: Props) {
  return <div className="p-10">{children}</div>;
}
