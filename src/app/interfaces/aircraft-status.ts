export interface AircraftStatus {
    rows: int;
    columns: int[];
    availableSeats: int[][];
    estimatedBoardingTime: Date;
    currentBoardingTime: Date;
    departureTime: Date,
    arrivalTime: Date,
    lastRefresh: Date;
    gate: string | "TBA";
    gateOpenTime: Date;
}