import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { ISelectOption } from "../../models/ISelectOption";

interface Props {
  value: string;
  onChangeValue: (value: string) => void;
  options: ISelectOption[];
  "aria-label"?: string;
}

export const ToggleGroup = ({
  value,
  onChangeValue,
  options,
  ...props
}: Props) => (
  <ToggleGroupPrimitive.Root
    className="inline-flex bg-slate-200 rounded-md border space-x-px"
    type="single"
    defaultValue={value}
    aria-label={props["aria-label"]}
    onValueChange={onChangeValue}
  >
    {options.map((option) => (
      <ToggleGroupPrimitive.Item
        key={option.value}
        className={
          "hover:bg-slate-100 text-slate-500 data-[state=on]:bg-zinc-900 data-[state=on]:text-white flex h-[36px] w-[36px] items-center justify-center bg-white text-base leading-4 first:rounded-l-md last:rounded-r-md focus:z-10 focus:shadow-slate-100 focus:outline-none"
        }
        value={option.value}
        aria-label={option.value}
      >
        {option.label}
      </ToggleGroupPrimitive.Item>
    ))}
  </ToggleGroupPrimitive.Root>
);
