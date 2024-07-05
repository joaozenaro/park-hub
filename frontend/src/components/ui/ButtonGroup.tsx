import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonGroupRootProps {
  className?: string;
  children: ReactNode;
  asChild?: boolean;
}

export function ButtonGroupRoot({
  children,
  className,
  asChild,
}: ButtonGroupRootProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={clsx("inline-flex -space-x-px text-sm", className)}>
      {children}
    </Comp>
  );
}

interface ButtonGroupButtonProps {
  className?: string;
  children: ReactNode;
  asChild?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}
export function ButtonGroupButton({
  children,
  className,
  asChild,
  active,
  disabled,
  onClick,
}: ButtonGroupButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center px-3 h-8 leading-tight border border-slate-300 disabled:pointer-events-none",
        "first:rounded-l-md last:rounded-r-md",
        className,
        {
          "bg-zinc-900 text-white hover:bg-zinc-800": active,
          "text-slate-500 bg-white hover:bg-slate-100": !active,
        }
      )}
    >
      {children}
    </Comp>
  );
}

export const ButtonGroup = {
  Root: ButtonGroupRoot,
  Button: ButtonGroupButton,
};
