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
      className={clsx("rounded-md flex items-center py-2.5 px-3.5 text-sm leading-5 font-semibold transition disabled:opacity-75 space-x-2.5", className, {
        "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white": type === "brand",
        "bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 text-white": type === "primary",
        "bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white": type === "secondary",
        "bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-neutral-900": type === "tertiary",
        "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white": type === "success",
        "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white": type === "danger",
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}