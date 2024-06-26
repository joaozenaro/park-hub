import { IUpdateUserForm } from "../../../../models/IUpdateUserForm";
import { IValidationError, IValidationReturn } from "../../../../models/IValidationReturn";
import { hasOnlyText } from "../../../../utils/hasOnlyText";

export function isValidForm(payload: IUpdateUserForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.name.trim()) {
    errors.push({ field: "name", message: "O nome não pode ser vazio "});
  }
  
  if (!hasOnlyText(payload.name)) {
    errors.push({ field: "name", message: "O nome não pode conter números"});
  }

  if (payload.name.length < 5) {
    errors.push({ field: "name", message: "Digite seu nome completo" });
  }
  if (!payload.username.trim()) {
    errors.push({ field: "username", message: "O username não pode ser vazio "});
  }

  if (payload.username.length < 4) {
    errors.push({ field: "username", message: "O username tem que haver mais que 4 caracteres" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}