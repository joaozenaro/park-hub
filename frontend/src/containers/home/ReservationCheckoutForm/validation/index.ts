import { IReservationCheckoutForm } from "../../../../models/IReservationCheckoutForm";
import {
  IValidationError,
  IValidationReturn,
} from "../../../../models/IValidationReturn";

export function isValidReservationCheckout(
  payload: IReservationCheckoutForm
): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.price) {
    errors.push({ field: "price", message: "Digite o preço" });
  }

  if (!("was_paid" in payload)) {
    errors.push({
      field: "was_paid",
      message: "Insira se a reserva foi paga ou não",
    });
  }
  
  if (!("check_out" in payload)) {
    errors.push({
      field: "check_out",
      message: "Insira se a reserva foi finalizada",
    });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}
