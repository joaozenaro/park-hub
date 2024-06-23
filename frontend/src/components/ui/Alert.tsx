import clsx from "clsx";
import { ReactNode } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

const IconByType = {
  success: AiOutlineCheckCircle,
  error: AiOutlineCloseCircle,
  warning: AiOutlineExclamationCircle,
  info: AiOutlineExclamationCircle,
};
export interface Props {
  type?: "success" | "error" | "warning" | "info";
  className?: string;
  children: ReactNode;
}

export default function Alert({ type = "info", className, children }: Props) {
  const Icon = IconByType[type];
  return (
    <div
      className={clsx(
        "flex items-center p-4 justify-center rounded-md font-medium text-sm",
        className,
        {
          "bg-emerald-100 text-emerald-600 shadow-emerald-700 hover:shadow-emerald-700  focus:shadow-emerald-700":
            type === "success",
          "bg-red-100 text-red-600 shadow-red-700 hover:shadow-red-700  focus:shadow-red-700":
            type === "error",
          "bg-blue-100 text-blue-600 shadow-blue-700 hover:shadow-blue-700  focus:shadow-blue-700":
            type === "info",
          "bg-amber-100 text-amber-600 shadow-amber-700 hover:shadow-amber-700  focus:shadow-amber-700":
            type === "warning",
        }
      )}
    >
      <Icon
        className={clsx("h-6 w-6 mr-2 shrink-0", {
          "text-emerald-600": type === "success",
          "text-red-600": type === "error",
          "text-blue-500": type === "info",
          "text-amber-500": type === "warning",
        })}
      />
      <p>{children}</p>
    </div>
  );
}
