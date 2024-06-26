import { MdOutlineImage, MdOutlinePerson } from "react-icons/md";
import { IFieldProps } from "../../../../components/form/SmartField";

export const fields: IFieldProps[] = [
  {
    Icon: MdOutlinePerson,
    id: "name",
    label: "Nome",
    placeholder: "Digite seu nome completo",
    type: "text",
  },
  {
    Icon: MdOutlinePerson,
    id: "username",
    label: "Username",
    placeholder: "Digite seu username",
    type: "text",
  },
  {
    Icon: MdOutlineImage,
    id: "avatar",
    label: "Avatar",
    placeholder: "Exemplo: https://img.1234",
    type: "text",
    required: false,
  },
];
