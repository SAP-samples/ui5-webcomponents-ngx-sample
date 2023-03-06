export interface Trip {
    departureFrom: string;
    arrivalTo: string;
    departureAbb: string;
    arrivalAbb: string;
    departureTime: Date;
    arrivalTime: Date;
    seats: string;
    seatsSelected: int[][];
}