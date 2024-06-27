import { IconType } from "react-icons";
import { IValidationError } from "../../models/IValidationReturn";
import { FormControl } from "./FormControl";
import { TextInput } from "./TextInput";
import { Select } from "./Select";
import { ISelectOption } from "../../models/ISelectOption";
import { MdMonetizationOn } from "react-icons/md";

export interface IFieldHandlersProps {
  data: any; // Data from form, it's not needed to know its type inside of this component
  onChangeValue: (id: string, value: any) => void; // changes the porperty "id" inside of the data object
  errors: IValidationError[];
  disabled?: boolean;
}

export interface IFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  Icon?: IconType;
  type: "text" | "password" | "number" | "select" | "currency";
}

interface ISmartField extends IFieldHandlersProps, IFieldProps {
  options?: ISelectOption[];
}

export default function SmartField({
  data,
  onChangeValue,
  disabled,
  errors,

  id,
  label,
  placeholder,
  required = true,
  Icon,
  type,
  options = [],
}: ISmartField) {
  return (
    <FormControl id={id} label={label} errors={errors}>
      {["text", "password", "number"].includes(type) && (
        <TextInput.Root>
          {Icon && (
            <TextInput.Icon>
              <Icon />
            </TextInput.Icon>
          )}
          <TextInput.Input
            value={data[id]}
            onChange={(e) => onChangeValue(id, e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            type={type}
          />
        </TextInput.Root>
      )}
      {["currency"].includes(type) && (
        <TextInput.Root>
          <TextInput.Icon>
            <MdMonetizationOn />
          </TextInput.Icon>
          <TextInput.Currency
            placeholder={placeholder}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            defaultValue={data[id]}
            decimalsLimit={2}
            decimalSeparator=","
            onValueChange={(_, name, values) => {
              onChangeValue(id, values?.float || 0);
              console.log(values?.float);
            }}
            required
          />
        </TextInput.Root>
      )}
      {["select"].includes(type) && (
        <Select.Root
          value={data[id]}
          onChange={(value) => onChangeValue(id, value)}
          placeholder={placeholder}
        >
          <Select.Item value={null}>{placeholder}</Select.Item>
          {options.map((item) => (
            <Select.Item value={item.value} key={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Root>
      )}
    </FormControl>
  );
}
