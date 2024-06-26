import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { MdMoreHoriz } from "react-icons/md";
import Lottie from "lottie-react";
import emptyDataAnimation from "../../assets/animations/empty-data.json";
import { Text } from "./Text";
import { Skeleton } from "./Skeleton";
import Pagination from "./Pagination";
import { IPagination } from "../../hooks/usePagination";

interface TableRootProps {
  children: ReactNode;
}
const TableRoot = ({ children }: TableRootProps) => {
  return <div className="">{children}</div>;
};
TableRoot.displayName = "Table.Root";

const TableTable = ({ children }: TableRootProps) => {
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
TableTable.displayName = "Table.Table";

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
TableTh.displayName = "Table.Th";

const TableTd = ({ children, className }: TableElementProps) => {
  return (
    <td
      className={clsx(
        "px-6 py-2 whitespace-nowrap text-sm font-medium text-zinc-900",
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

const TableEmptyData = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[13rem] h-[13rem]">
        <Lottie animationData={emptyDataAnimation} loop={false} />
      </div>
      <Text>Nenhum resultado encontrado :(</Text>
    </div>
  );
};
TableEmptyData.displayName = "Table.EmptyData";

const TableLoadingRow = ({
  loading,
  repeat = 1,
  children,
}: {
  loading: boolean;
  repeat?: number;
  children: ReactNode;
}) => {
  if (!loading) return null;
  return Array(repeat)
    .fill(0)
    .map((_, index) => <tr key={index}>{children}</tr>);
};
TableLoadingRow.displayName = "Table.LoadingRow";

const TableLoadingTd = () => {
  return (
    <td className="px-6 py-4">
      <Skeleton className="inline h-4" />
    </td>
  );
};
TableLoadingTd.displayName = "Table.LoadingTd";

interface TablePaginationProps {
  pagination: IPagination;
}
const TablePagination = ({ pagination }: TablePaginationProps) => {
  if (!pagination.totalPages) {
    return null;
  }
  return (
    <div className="mt-8 flex items-center justify-end">
      <p className="mr-4 text-sm text-slate-500">
        {pagination.skip + 1}-
        {Math.min(
          pagination.skip + pagination.pageSize,
          pagination.totalRecords
        )}{" "}
        de {pagination.totalRecords}
      </p>
      <Pagination {...pagination} />
    </div>
  );
};
TablePagination.displayName = "Table.Pagination";

export const Table = {
  Root: TableRoot,
  Table: TableTable,
  Th: TableTh,
  Td: TableTd,
  ActionsDropdown: TableActionsDropdown,
  ActionItem: TableActionItem,
  EmptyData: TableEmptyData,
  LoadingRow: TableLoadingRow,
  LoadingTd: TableLoadingTd,
  Pagination: TablePagination,
};
