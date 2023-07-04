import { Component } from "@angular/core";
import { Subject, takeUntil, zip } from "rxjs";

import { AppService } from "../services/services";
import { LegendItem } from "../interfaces/legend-item";
import { MONTHS } from "../constants/constants";
import {
  getDatesArray,
  getDateAsddMMyyyy,
  getDateAsDDTTTT,
} from "../utils/utils";
import { AircraftStatus } from "../interfaces/aircraft-status";

@Component({
  selector: "app-trip-calendar",
  templateUrl: "./trip-calendar.component.html",
  styleUrls: ["./trip-calendar.component.scss"],
})
export class TripCalendarComponent {
  componentUnsubscribe: Subject<boolean> = new Subject();
  isDataAvailable = false;

  departureAircraftStatus!: AircraftStatus;
  returnAircraftStatus!: AircraftStatus;

  startDate!: Date;
  endDate!: Date;
  datesBetween!: Date[];
  formatDate = getDateAsddMMyyyy;

  departureBoardingMonth!: string;
  departureBoardingDateTimeString!: string;
  departureMonth!: string;
  departureDateTimeString!: string;
  departureGate!: string;

  returnBoardingMonth!: string;
  returnBoardingDateTimeString!: string;
  returnMonth!: string;
  returnDateTimeString!: string;
  returnGate!: string;

  legendItems: LegendItem[] = [
    {
      icon: "color-fill",
      color:
        "legend-item__icon--background legend-item__icon__border legend-item__icon__border--now",
      text: "TODAY",
    },
    {
      icon: "color-fill",
      color:
        "legend-item__icon--selected legend-item__icon__border legend-item__icon__border--selected",
      text: "TRIP_DATES",
    },
  ];

  constructor(private appService: AppService) {}

  async ngOnInit() {
    zip([
      this.appService.getCurrentTrip(),
      this.appService.getReturnTrip(),
      this.appService.getDepartureAircraftStatus(),
      this.appService.getReturnAircraftStatus(),
    ])
      .pipe(takeUntil(this.componentUnsubscribe))
      .subscribe(
        ([
          currentTrip,
          returnTrip,
          departureAircraftStatus,
          returnAircraftStatus,
        ]) => {
          this.startDate = new Date(currentTrip.departureTime);
          this.endDate = new Date(returnTrip.arrivalTime);
          this.datesBetween = getDatesArray(this.startDate, this.endDate);

          this.departureAircraftStatus = departureAircraftStatus;
          this.returnAircraftStatus = returnAircraftStatus;

          this.departureBoardingMonth =
            MONTHS[
              new Date(this.departureAircraftStatus.gateOpenTime).getMonth()
            ];
          this.departureBoardingDateTimeString = getDateAsDDTTTT(
            new Date(this.departureAircraftStatus.gateOpenTime)
          );
          this.departureMonth =
            MONTHS[
              new Date(this.departureAircraftStatus.departureTime).getMonth()
            ];
          this.departureDateTimeString = getDateAsDDTTTT(
            new Date(this.departureAircraftStatus.departureTime)
          );
          this.departureGate = this.departureAircraftStatus.gate;

          this.returnBoardingMonth =
            MONTHS[new Date(this.returnAircraftStatus.gateOpenTime).getMonth()];
          this.returnBoardingDateTimeString = getDateAsDDTTTT(
            new Date(this.returnAircraftStatus.gateOpenTime)
          );
          this.returnMonth =
            MONTHS[
              new Date(
                this.returnAircraftStatus.estimatedBoardingTime
              ).getMonth()
            ];
          this.returnDateTimeString = getDateAsDDTTTT(
            new Date(this.returnAircraftStatus.estimatedBoardingTime)
          );
          this.returnGate = this.returnAircraftStatus.gate;

          this.isDataAvailable = true;
        }
      );
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }
}
