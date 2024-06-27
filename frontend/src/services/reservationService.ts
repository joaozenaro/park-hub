import api from "./api";
import { IReservation } from "../models/IReservation";
import { ISearchModel } from "../models/ISearchModel";
import { IReservationCheckinForm } from "../models/IReservationCheckinForm";
import { IReservationCheckoutForm } from "../models/IReservationCheckoutForm";

const BASE_PATH = "/reservation";

function checkIn(data: Partial<IReservationCheckinForm>) {
  return api.post<IReservation>("/checkin", {
    CheckinForm: data,
  });
}

function checkOut(id: number, data: Partial<IReservationCheckoutForm>) {
  return api.patch<IReservation>("/checkout/" + id, {
    CheckoutForm: data,
  });
}

function deleteReservation(id: number) {
  return api.delete<IReservation>(BASE_PATH + "/delete/" + id);
}

interface ISearchReservationResponse {
  records: IReservation[];
  total_count: number;
}
function search(data?: ISearchModel) {
  return api.post<ISearchReservationResponse>(
    BASE_PATH + "/search",
    data ? { SearchModel: data } : {}
  );
}

export const reservationService = {
  search,
  checkIn,
  checkOut,
  delete: deleteReservation,
};
