export function getDate(): string {
  const dateNow = new Date();

  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();
  const day = dateNow.getUTCDate() - 1;

  return `${year}-${month}-${day}`;
}

export function validaDate(date: string) {
  const transformaData = (d: string): Date => {
    const [day, month, year] = d.split("-").map(Number);
    return new Date(year, month - 1, day - 1);
  };

  const date1 = transformaData(date);
  const date2 = transformaData(getDate());

  return date1 > date2;
}
