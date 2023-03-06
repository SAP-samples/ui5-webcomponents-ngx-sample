import { Trip } from "src/app/interfaces/trip";

export const DOMESTIC_TRIPS: Trip[] = [
    {
        departureFrom: "Vancouver",
        arrivalTo: "Toronto",
        departureAbb: "YVR",
        arrivalAbb: "YYZ",
        departureTime: new Date(),
        arrivalTime: new Date(),
        seats: "",
        seatsSelected: [],
    },
    {
        departureFrom: "Toronto",
        arrivalTo: "Vancouver",
        departureAbb: "YYZ",
        arrivalAbb: "YVR",
        departureTime: new Date(),
        arrivalTime: new Date(),
        seats: "",
        seatsSelected: [],
    },
];

export const INTERNATIONAL_TRIPS: Trip[] = [
    {
        departureFrom: "Toronto",
        arrivalTo: "Munich",
        departureAbb: "YYZ",
        arrivalAbb: "MUC",
        departureTime: new Date(),
        arrivalTime: new Date(),
        seats: "",
        seatsSelected: [],
    },
    {
        departureFrom: "Montreal",
        arrivalTo: "Boston",
        departureAbb: "YUL",
        arrivalAbb: "BOS",
        departureTime: new Date(),
        arrivalTime: new Date(),
        seats: "",
        seatsSelected: [],
    },
    {
        departureFrom: "Boston",
        arrivalTo: "Vancouver",
        departureAbb: "BOS",
        arrivalAbb: "YVR",
        departureTime: new Date(),
        arrivalTime: new Date(),
        seats: "",
        seatsSelected: [],
    }
];

export const CURRENT_TRIP: Trip = {
    departureFrom: "Vancouver",
    arrivalTo: "Montreal",
    departureAbb: "YVR",
    arrivalAbb: "YUL",
    departureTime: new Date(2023, 0o3, 17, 12, 0o0),
    arrivalTime: new Date(2023, 0o3, 17, 17, 30),
    seats: "D2-G2",
    seatsSelected: [[1, 3], [1, 4], [1, 5], [1, 6]],
};