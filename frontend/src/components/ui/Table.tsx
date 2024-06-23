import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { MdMoreHoriz } from "react-icons/md";

interface TableRootProps {
  children: ReactNode;
}
const TableRoot = ({ children }: TableRootProps) => {
  return (
    <div className="-m-1.5 overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            {children}
          </table>
        </div>
      </div>
    </div>
  );
};
TableRoot.displayName = "Table.Root";

interface TableElementProps {
  children: ReactNode;
  className?: string;
}
const TableTh = ({ children, className }: TableElementProps) => {
  return (
    <th
      scope="col"
      className={clsx(
        "px-6 py-3 text-xs font-medium text-slate-500 uppercase",
        className
      )}
    >
      {children}
    </th>
  );
};
const TableTd = ({ children, className }: TableElementProps) => {
  return (
    <td
      className={clsx(
        "px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900",
        className
      )}
    >
      {children}
    </td>
  );
};
TableTd.displayName = "Table.Td";

const TableActionsDropdown = ({ children }: TableElementProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex justify-end">
          <button className="h-6 w-6 hover:bg-slate-200 rounded-full">
            <MdMoreHoriz className="h-6 w-6 text-slate-500" />
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-40 mr-8 z-20 bg-white rounded-md p-2 shadow-[0px_10px_38px_-10px_rgba(0,_0,_0,_0.4),_0px_8px_16px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={8}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
TableActionsDropdown.displayName = "Table.ActionsDropdown";

const TableActionItem = React.forwardRef(
  ({ children, ...props }: any, forwardedRef) => {
    return (
      <DropdownMenu.Item {...props} ref={forwardedRef} asChild>
        {children}
      </DropdownMenu.Item>
    );
  }
);
TableActionItem.displayName = "Table.ActionItem";

export const Table = {
  Root: TableRoot,
  Th: TableTh,
  Td: TableTd,
  ActionsDropdown: TableActionsDropdown,
  ActionItem: TableActionItem,
};
