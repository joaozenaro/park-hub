import { ReactNode } from "react";

interface Props {
  id?: string;
  children: ReactNode;
}
export default function Label({ id, children }: Props) {
  return (
    <label htmlFor={id} className="flex text-sm mb-1 text-slate-500">
      {children}
    </label>
  );
}