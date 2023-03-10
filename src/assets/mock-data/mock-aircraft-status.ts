import { AircraftStatus } from "src/app/interfaces/aircraft-status";

export const DEPARTURE_AIRCRAFT_STATUS: AircraftStatus = {
    rows: 8,
    columns: [3, 4, 3],
    availableSeats: [[0, 9], [0, 8], [2, 2], [2, 6], [4, 0], [6, 3]],
    estimatedBoardingTime: new Date(2023, 0o3, 17, 12, 0o0),
    currentBoardingTime: new Date(2023, 0o3, 17, 11, 58),
    lastRefresh: new Date(),
    gate: "E8",
    gateOpenTime: new Date(2023, 0o3, 17, 10, 0o0),
};

export const RETURN_AIRCRAFT_STATUS: AircraftStatus = {
    rows: 8,
    columns: [3, 4, 3],
    availableSeats: [[0, 9], [0, 8], [2, 2], [2, 6], [4, 0], [6, 3]],
    estimatedBoardingTime: new Date(2023, 0o3, 22, 20, 20),
    currentBoardingTime: new Date(2023, 0o3, 22, 20, 20),
    lastRefresh: new Date(),
    gate: "TBA",
    gateOpenTime: new Date(2023, 0o3, 22, 18, 20),
};