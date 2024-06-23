import { IPasswordResetForm } from "../../../models/IPasswordResetForm";
import { IValidationError, IValidationReturn } from "../../../models/IValidationReturn";

export function isValidForm(payload: IPasswordResetForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.password.trim()) {
    errors.push({ field: "password", message: "Digite sua senha" });
  }

  if (payload.password.length < 6) {
    errors.push({ field: "password", message: "A senha deve conter 6 ou mais caracteres" });
  }

  if (!payload.passwordConfirm.trim()) {
    errors.push({ field: "passwordConfirm", message: "Confirme sua senha" });
  }
  if (payload.password !== payload.passwordConfirm) {
    errors.push({ field: "passwordConfirm", message: "As senhas devem ser iguais" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}