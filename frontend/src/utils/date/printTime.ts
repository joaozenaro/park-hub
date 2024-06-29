import { stringToDate } from "./stringToDate";

export function printTime(stringDate: string) {
  const date = new Date(stringDate);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(stringToDate(stringDate).getTime() - userTimezoneOffset));
}
