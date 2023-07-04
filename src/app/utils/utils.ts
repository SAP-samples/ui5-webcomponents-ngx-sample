export function addZeroToTime(i: number) {
  if (i < 10) {
    return "0" + i;
  }
  return `${i}`;
}

export function getDateAsddMMyyyy(date: Date) {
  return `${addZeroToTime(date.getDate())}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
}

export function getDateAsDDTTTT(date: Date) {
  return `${date.getDate()} / ${date.getHours()}:${addZeroToTime(
    date.getMinutes()
  )}`;
}

export function getDatesArray(startDate: Date, stopDate: Date) {
  const dateArray: Date[] = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

function addDays(currentDate: Date, numDays: number) {
  let date = new Date(currentDate);
  date.setDate(date.getDate() + numDays);
  return date;
}
