export function printStringDate(date: Date) {
  return (
    new Intl.DateTimeFormat('pt-BR', { year: "numeric", month: "long", day: "numeric", }).format(date)
  );
}