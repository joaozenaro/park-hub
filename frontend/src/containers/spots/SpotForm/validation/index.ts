import { ISpot } from "../../../../models/ISpot";
import { IValidationError, IValidationReturn } from "../../../../models/IValidationReturn";

export function isValidSpot(payload: ISpot): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.code.trim()) {
    errors.push({ field: "code", message: "Digite o código da vaga" });
  }

  if (!payload.floor) {
    errors.push({ field: "floor", message: "Digite o andar" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}