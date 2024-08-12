import { FdDate } from "@fundamental-ngx/core"

export interface packageDeals {
    id: number,
    country: string,
    price: number,
    vacationStart: FdDate,
    vacationEnd: FdDate,
    selected: boolean
}