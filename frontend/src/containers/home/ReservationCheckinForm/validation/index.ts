import { IReservationCheckinForm } from "../../../../models/IReservationCheckinForm";
import {
  IValidationError,
  IValidationReturn,
} from "../../../../models/IValidationReturn";

export function isValidReservationCheckin(
  payload: IReservationCheckinForm
): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.license_plate.trim()) {
    errors.push({
      field: "license_plate",
      message: "Digite a placa do veículo",
    });
  }

  if (!payload.spot_id) {
    errors.push({ field: "spot_id", message: "Insira o id da vaga" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}
