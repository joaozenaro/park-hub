"use client";
import React, { ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { RxCheck, RxChevronDown, RxChevronUp } from "react-icons/rx";

export interface SelectRootProps {
  children: ReactNode;
  placeholder: string;
  defaultValue?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const SelectRoot = ({
  value,
  defaultValue,
  children,
  placeholder,
  onChange,
  required,
}: SelectRootProps) => (
  <SelectPrimitive.Root
    defaultValue={defaultValue}
    value={value}
    onValueChange={onChange}
    required={required}
  >
    <SelectPrimitive.Trigger
      className="h-10
      flex items-center space-x-2
      py-4 px-3 rounded-md
      border 
      border-slate-300
      bg-white
      w-full 
      outline-0
      focus-within:ring-2 ring-slate-500  
      text-sm
      leading-none text-zinc-900 hover:bg-white  focus:shadow-zinc-900 data-[placeholder]:text-slate-500 outline-none"
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon className="text-slate-500">
        <RxChevronDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="z-50 overflow-hidden bg-white border rounded shadow-[0px_10px_38px_-10px_rgba(0,_0,_0,_0.4),_0px_8px_16px_-15px_rgba(22,_23,_24,_0.2)]">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-slate-300 cursor-default">
          <RxChevronUp />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-slate-300 cursor-default">
          <RxChevronDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);
SelectRoot.displayName = "Select.Root";

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={clsx(
          "text-[13px] leading-none text-slate-500 rounded-md flex items-center h-10 pr-9 pl-6 relative select-none data-[disabled]:text-slate-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-slate-100 data-[highlighted]:text-zinc-900",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <RxCheck />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);
SelectItem.displayName = "Select.Item";

export const Select = {
  Root: SelectRoot,
  Item: SelectItem,
};
