import { IProfileForm } from "../../../models/IProfileForm";
import { IValidationError, IValidationReturn } from "../../../models/IValidationReturn";

export function isValidForm(payload: IProfileForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.name.trim()) {
    errors.push({ field: "name", message: "O nome não pode ser vazio "});
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