import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { ISelectOption } from "../../models/ISelectOption";
import { ButtonGroup } from "./ButtonGroup";

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
    type="single"
    defaultValue={value}
    aria-label={props["aria-label"]}
    onValueChange={onChangeValue}
    asChild
  >
    <ButtonGroup.Root>
      {options.map((option) => (
        <ToggleGroupPrimitive.Item
          key={option.value}
          value={option.value}
          aria-label={option.value}
          asChild
        >
          <ButtonGroup.Button active={option.value === value}>
            {option.label}
          </ButtonGroup.Button>
        </ToggleGroupPrimitive.Item>
      ))}
    </ButtonGroup.Root>
  </ToggleGroupPrimitive.Root>
);
