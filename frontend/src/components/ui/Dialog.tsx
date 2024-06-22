import { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";

interface DialogRootProps {
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}
export function DialogRoot({ children, onOpenChange, open }: DialogRootProps) {
  return <DialogPrimitive.Root onOpenChange={onOpenChange} open={open}>{children}</DialogPrimitive.Root>;
}
DialogRoot.displayName = "Drawer.Root";

interface DialogTriggerProps {
  children: ReactNode;
}
export function DialogTrigger({ children }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>;
}
DialogTrigger.displayName = "Drawer.Trigger";

interface DialogContentProps {
  title: string;
  children: ReactNode;
}
export function DialogContent({
  title,
  children,
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="z-40 bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <DialogPrimitive.Content className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <DialogPrimitive.Title className="text-zinc-900 mb-2 text-[17px] font-bold">
          {title}
        </DialogPrimitive.Title>
        {children}
        <DialogPrimitive.Close asChild>
          <button
            className="text-slate-500 hover:bg-slate-100 focus:shadow-slate-100 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <AiOutlineClose />
          </button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
DialogContent.displayName = "Drawer.Content";

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
};