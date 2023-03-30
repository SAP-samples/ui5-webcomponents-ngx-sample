import { ThemeValue } from "src/app/interfaces/theme-value";
import { LanguageValue } from "src/app/interfaces/language-value";

export const ABB_MONTHS: string[] = ["JAN", "FEB", "MAR", "APR", "MAY_ABB", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
export const MONTHS: string[] = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
export const DAYS: string[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
export const ALPHABETS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const THEMES: ThemeValue[] = [
    {
        displayName: "Morning Horizon",
        usageName: "sap_horizon"
    },
    {
        displayName: "Evening Horizon",
        usageName: "sap_horizon_dark"
    },
    {
        displayName: "High Contrast Black",
        usageName: "sap_horizon_hcb"
    },
    {
        displayName: "High Contrast White",
        usageName: "sap_horizon_hcw"
    },
    {
        displayName: "Quartz Light",
        usageName: "sap_fiori_3"
    },
    {
        displayName: "Quartz Dark",
        usageName: "sap_fiori_3_dark"
    },
    {
        displayName: "Quartz High Contrast Black",
        usageName: "sap_fiori_3_hcb"
    },
    {
        displayName: "Quartz High Contrast White",
        usageName: "sap_fiori_3_hcw"
    },
    {
        displayName: "Belize",
        usageName: "sap_belize"
    },
    {
        displayName: "High Contrast Black",
        usageName: "sap_belize_hcb"
    },
    {
        displayName: "High Contrast White",
        usageName: "sap_belize_hcw"
    }
];

export const LANGUAGES: LanguageValue[] = [
    {
        displayName: "English",
        usageName: "en-CA"
    },
    {
        displayName: "繁體中文",
        usageName: "zh_TW"
    }
];

export function addZeroToTime(i: int) {
    if (i < 10) { return "0" + i }
    return i;
};

export function getDateAsddMMyyyy(date: Date) {
    return `${addZeroToTime(date.getDate())}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export function getDateAsDDTTTT(date: Date) {
    return `${date.getDate()} / ${date.getHours()}:${addZeroToTime(date.getMinutes())}`
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