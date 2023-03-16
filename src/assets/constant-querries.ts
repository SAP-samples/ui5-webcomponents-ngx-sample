export const ABB_MONTHS: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MONTHS: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DAYS: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const ALPHABETS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function addZeroToTime(i: int) {
    if (i < 10) { return "0" + i }
    return i;
};

export function getDateAsddMMyyyy(date: Date) {
    return `${addZeroToTime(date.getDate())}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export function getDateAsAbbStringMMddtttt(date: Date) {
    return `${MONTHS[date.getUTCMonth()]} ${date.getDate()} / ${date.getHours()}:${addZeroToTime(date.getMinutes())}`
};

export function getDatesArray(startDate: Date, stopDate: Date) {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
};

function addDays(currentDate: Date, numDays: int) {
    let date = new Date(currentDate);
    date.setDate(date.getDate() + numDays);
    return date;
};