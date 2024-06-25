import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { getInitials } from "../../utils/getInitials";
import clsx from "clsx";

interface Props {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg";
}
export default function Avatar({ name, url, size = "sm" }: Props) {
  return (
    <AvatarPrimitive.Root
      className={clsx(
        "inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle",
        {
          "h-10 w-10": size === "sm",
          "h-14 w-14": size === "md",
          "h-[70px] w-[70px]": size === "lg",
        }
      )}
    >
      <AvatarPrimitive.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={url}
        alt={"Avatar de " + name}
      />
      <AvatarPrimitive.Fallback
        className=" text-white leading-1 flex h-full w-full items-center justify-center bg-amber-500 text-[15px] font-semibold"
        delayMs={600}
      >
        {getInitials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
