import { AircraftStatus } from "src/app/interfaces/aircraft-status";

export const AIRCRAFT_STATUS: AircraftStatus = {
    rows: 8,
    columns: [3, 4, 3],
    availableSeats: [[0, 9], [0, 8], [2, 2], [2, 6], [4, 0], [6, 3]],
    estimatedBoardingTime: new Date(2023, 0o3, 17, 12, 0o0),
    currentBoardingTime: new Date(2023, 0o3, 17, 11, 58),
    lastRefresh: new Date(),
}