import { stringToDate } from "./stringToDate";

export function printTime(stringDate: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(stringToDate(stringDate));
}
