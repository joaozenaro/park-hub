export function printStringDate() {
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return (
    new Intl.DateTimeFormat("pt-BR", options).format(new Date)
  );
}