"use client";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  type?: 'primary' | 'brand' | 'danger' | 'success' | 'secondary' | 'tertiary'
  children: ReactNode;
  onClick?: any;
  className?: string;
  disabled?: boolean;
}

export function Button({ type = 'primary', children, onClick, className, ...props }: Props) {
  return (
    <button
      className={clsx("border text-white rounded flex justify-center items-center p-2 font-bold transition disabled:opacity-75", {
        "bg-amber-500 hover:bg-amber-600 active:bg-amber-700": type === "brand",
        "bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700": type === "primary",
        "bg-neutral-600 hover:bg-neutral-500 active:bg-neutral-400": type === "secondary",
        "bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-neutral-900": type === "tertiary",
        "bg-emerald-600 hover:bg-emerald-400 active:bg-emerald-300": type === "success",
        "bg-red-600 hover:bg-red-400 active:bg-red-300": type === "danger",
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}