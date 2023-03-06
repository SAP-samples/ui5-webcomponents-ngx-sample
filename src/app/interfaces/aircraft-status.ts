export interface AircraftStatus {
    rows: int;
    columns: int[];
    availableSeats: int[][];
    estimatedBoardingTime: Date;
    currentBoardingTime: Date;
    lastRefresh: Date;
}