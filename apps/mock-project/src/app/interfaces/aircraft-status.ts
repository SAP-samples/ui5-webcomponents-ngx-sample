export interface AircraftStatus {
  rows: number;
  columns: number[];
  availableSeats: number[][];
  estimatedBoardingTime: Date;
  currentBoardingTime: Date;
  departureTime: Date;
  arrivalTime: Date;
  lastRefresh: Date;
  gate: string | 'TBA';
  gateOpenTime: Date;
}
