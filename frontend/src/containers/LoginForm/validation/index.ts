import { ILoginForm } from "../../../models/ILoginForm";
import { IValidationError, IValidationReturn } from "../../../models/IValidationReturn";

export function isValidLogin(payload: ILoginForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.username.trim()) {
    errors.push({ field: "username", message: "Digite o username" });
  }
  if (!payload.password) {
    errors.push({ field: "password", message: "Digite a sua senha" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}