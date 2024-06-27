import api from "./api";
import { ISpotType } from "../models/ISpotType";

const BASE_PATH = "/spot-type";

function create(data: Partial<ISpotType>) {
  return api.post<ISpotType>(BASE_PATH + "/add", {
    SpotType: data,
  });
}

function update(id: number, data: Partial<ISpotType>) {
  return api.patch<ISpotType>(BASE_PATH + "/update/" + id, {
    SpotType: data,
  });
}

function deleteSpotType(id: number) {
  return api.delete<ISpotType>(BASE_PATH + "/delete/" + id);
}

function getAll() {
  return api.post<ISpotType[]>(BASE_PATH + "/search");
}

export const spotTypeService = {
  getAll,
  create,
  update,
  delete: deleteSpotType,
};
