import { MdOutlinePerson } from "react-icons/md";
import { IFieldProps } from "../../../components/form/SmartField";
import { AiOutlineLock } from "react-icons/ai";

export const completeSignupFormFields: IFieldProps[] = [
  {
    Icon: MdOutlinePerson,
    id: "name",
    label: "Nome",
    placeholder: "Digite o seu nome",
    type: "text",
  },
  {
    Icon: MdOutlinePerson,
    id: "username",
    label: "Username",
    placeholder: "Digite o seu username",
    type: "text",
  },
  {
    Icon: AiOutlineLock,
    id: "password",
    label: "Senha",
    placeholder: "*******",
    type: "password",
  },
  {
    Icon: AiOutlineLock,
    id: "passwordConfirm",
    label: "Confirmar senha",
    placeholder: "*******",
    type: "password",
  },
];
