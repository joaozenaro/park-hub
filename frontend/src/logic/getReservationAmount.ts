import { ISpotWithReservation } from "../services/spotService";
import differenceInHours from "../utils/date/differenceInHours";
import { stringToDate } from "../utils/date/stringToDate";

export default function getReservationAmount(spot: ISpotWithReservation) {
  const checkinDate = stringToDate(spot.reservation!.check_in);
  const now = new Date()
  const userTimezoneOffset = (now).getTimezoneOffset() * 60000;
  const checkoutDate = new Date(now.getTime() + userTimezoneOffset);
  const hoursParked = differenceInHours(checkinDate, checkoutDate);
  console.log({
    checkinDate,
    checkoutDate,
    hoursParked,
    total: (
      Number(spot.spotType.default_price) +
      Number(spot.spotType.default_price) * 0.1 * hoursParked
    )
  });

  return (
    Number(spot.spotType.default_price) +
    Number(spot.spotType.default_price) * 0.1 * hoursParked
  );
}
