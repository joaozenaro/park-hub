import api from "./api";
import { ISpot } from "../models/ISpot";
import { ISearchModel } from "../models/ISearchModel";
import { ISpotForm } from "../models/ISpotForm";

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

export const spotService = {
  search,
  create,
  update,
  delete: deleteSpotType,
};
