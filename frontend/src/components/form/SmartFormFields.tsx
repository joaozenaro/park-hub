import SmartField, { IFieldHandlersProps, IFieldProps } from "./SmartField";

interface SmartFormFieldsProps extends IFieldHandlersProps {
  fields: IFieldProps[];
  optionsByField?: {
    [fieldId: string]: any[];
  };
}
export default function SmartFormFields({
  fields,
  optionsByField = {},
  ...handlers
}: SmartFormFieldsProps) {
  return (
    <>
      {fields.map((field) => (
        <SmartField
          key={field.id}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          Icon={field.Icon}
          type={field.type}
          // options provider. Yes it can be undefined for text inputs 
          options={optionsByField[field.id]}
          // handlers 
          data={handlers.data}
          onChangeValue={handlers.onChangeValue}
          errors={handlers.errors}
          disabled={handlers.disabled}
        />
      ))}
    </>
  );
}
