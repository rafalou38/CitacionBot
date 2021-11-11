export function today() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().substring(2);
  return `${day}/${month}/${year}`;
}
