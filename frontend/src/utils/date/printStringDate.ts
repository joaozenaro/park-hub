export function printStringDate() {
  return (
    new Intl.DateTimeFormat('pt-BR', { year: "numeric", month: "long", day: "numeric", }).format(new Date)
  );
}