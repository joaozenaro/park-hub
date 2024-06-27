export default function differenceInHours(date1: Date, date2: Date) {
  const diffMs = Number(date2) - Number(date1);
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  return diffHrs;
}
