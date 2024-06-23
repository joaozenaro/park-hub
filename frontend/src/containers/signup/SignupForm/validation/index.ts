import { ISignupForm } from "../../../../models/ISignupForm";
import { IValidationError, IValidationReturn } from "../../../../models/IValidationReturn";
import { validateEmail } from "../../../../utils/validateEmail";

export function isValidSignup(payload: ISignupForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.email.trim()) {
    errors.push({ field: "email", message: "Digite o email" });
  }
  
  if (!validateEmail(payload.email)) {
    errors.push({ field: "email", message: "Email inválido. Ex: email@dominio.com" });
  }

  if (!payload.role) {
    errors.push({ field: "role", message: "Insira uma função" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}