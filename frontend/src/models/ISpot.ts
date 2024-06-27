import { ISpotType } from "./ISpotType";

export interface ISpot {
  id: number;
  code: string;
  floor: string;
  spotType: ISpotType;
}
