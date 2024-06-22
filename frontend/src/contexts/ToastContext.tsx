"use client";
import { createContext, useMemo, useState } from "react";
import Toast from "../components/ui/Toast";

interface ToastProviderProps {
  children: React.ReactNode;
}

interface LauchToastProps {
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
}
export interface ToastContextType {
  launchToast: (props: LauchToastProps) => void;
}

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastProps, setToastProps] = useState({
    open: false,
    type: "success",
    title: "",
    description: "",
  });

  const launchToast = (props: LauchToastProps) => {
    setToastProps({
      open: true,
      description: "",
      ...props,
    });
  };
  const values = useMemo(() => ({ launchToast }), []);

  return (
    <ToastContext.Provider value={values}>
      {children}
      <Toast
        type={toastProps.type as any}
        title={toastProps.title}
        description={toastProps.description}
        open={toastProps.open}
        setOpen={(value) => setToastProps({ ...toastProps, open: value })}
      />
    </ToastContext.Provider>
  );
};
