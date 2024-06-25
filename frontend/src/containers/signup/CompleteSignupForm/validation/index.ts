import { ICompleteSignupForm } from "../../../../models/ICompleteSignupForm";
import {
  IValidationError,
  IValidationReturn,
} from "../../../../models/IValidationReturn";
import { hasOnlyText } from "../../../../utils/hasOnlyText";

export function isValidSignup(payload: ICompleteSignupForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.name.trim()) {
    errors.push({ field: "name", message: "Digite o seu nome" });
  }

  if (!hasOnlyText(payload.name)) {
    errors.push({ field: "name", message: "O nome não pode conter números" });
  }

  if (!payload.username.trim()) {
    errors.push({ field: "username", message: "Digite o seu username" });
  }

  if (payload.username.length < 4) {
    errors.push({
      field: "username",
      message: "O username deve conter 4 ou mais caracteres",
    });
  }

  if (!payload.password.trim()) {
    errors.push({ field: "password", message: "Digite sua senha" });
  }

  if (payload.password.length < 6) {
    errors.push({
      field: "password",
      message: "A senha deve conter 6 ou mais caracteres",
    });
  }

  if (!payload.passwordConfirm.trim()) {
    errors.push({ field: "passwordConfirm", message: "Confirme sua senha" });
  }
  if (payload.password !== payload.passwordConfirm) {
    errors.push({
      field: "passwordConfirm",
      message: "As senhas devem ser iguais",
    });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}
