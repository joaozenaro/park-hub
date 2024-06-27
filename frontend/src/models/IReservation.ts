import { IUser } from "./IUser";

export interface IReservation {
  id: 1;
  license_plate: string;
  price: string;
  was_paid: number;
  check_in: string;
  check_out: string | null;
  user: IUser;
}
