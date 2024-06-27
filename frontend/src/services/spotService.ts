import api from "./api";
import { ISpot } from "../models/ISpot";
import { ISearchModel } from "../models/ISearchModel";
import { ISpotForm } from "../models/ISpotForm";
import { IReservation } from "../models/IReservation";

const BASE_PATH = "/spot";

function create(data: Partial<ISpotForm>) {
  return api.post<ISpot>(BASE_PATH + "/add", {
    Spot: data,
  });
}

function update(id: number, data: Partial<ISpotForm>) {
  return api.patch<ISpot>(BASE_PATH + "/update/" + id, {
    Spot: data,
  });
}

function deleteSpotType(id: number) {
  return api.delete<ISpot>(BASE_PATH + "/delete/" + id);
}

interface ISearchSpotResponse {
  records: ISpot[];
  total_count: number;
}
function search(data?: ISearchModel) {
  return api.post<ISearchSpotResponse>(
    BASE_PATH + "/search",
    data ? { SearchModel: data } : {}
  );
}

export interface ISpotWithReservation extends ISpot {
  reservation: IReservation | null;
}
interface ISearchSpotWithReservationsResponse {
  records: ISpotWithReservation[];
  total_count: number;
}
function searchWithReservations(data?: ISearchModel) {
  return api.post<ISearchSpotWithReservationsResponse>(
    BASE_PATH + "/reservations",
    data ? { SearchModel: data } : {}
  );
}

export const spotService = {
  search,
  searchWithReservations,
  create,
  update,
  delete: deleteSpotType,
};
