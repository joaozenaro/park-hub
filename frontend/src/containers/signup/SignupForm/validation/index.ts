import { ISignupForm } from "../../../../models/ISignupForm";
import { IValidationError, IValidationReturn } from "../../../../models/IValidationReturn";

export function isValidSignup(payload: ISignupForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.email.trim()) {
    errors.push({ field: "email", message: "Digite o email" });
  }
  if (!payload.role) {
    errors.push({ field: "role", message: "Insira uma função" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}