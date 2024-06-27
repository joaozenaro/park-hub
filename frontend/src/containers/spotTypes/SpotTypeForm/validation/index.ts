import { ISpotType } from "../../../../models/ISpotType";
import { IValidationError, IValidationReturn } from "../../../../models/IValidationReturn";

export function isValidSpotType(payload: ISpotType): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.name.trim()) {
    errors.push({ field: "name", message: "Digite o nome da vaga" });
  }

  if (!payload.default_price) {
    errors.push({ field: "default_price", message: "Digite o preço padrão" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}