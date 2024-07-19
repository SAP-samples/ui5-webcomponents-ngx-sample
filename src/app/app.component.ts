import { Component, ViewChildren, ViewChild, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { Subject, takeUntil, zip } from 'rxjs';

import { AppService } from './services/services';
import { MONTHS } from './constants/constants';
import { addZeroToTime, getDateAsDDTTTT } from './utils/utils';
import { Trip } from './interfaces/trip';
import { AircraftStatus } from './interfaces/aircraft-status';

import { RtlService } from '@fundamental-ngx/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('child') children: ElementRef;

  componentUnsubscribe: Subject<boolean> = new Subject();
  isDataAvailable = false;

  trip!: Trip;

  departureAircraftStatus!: AircraftStatus;
  currentBoardingTime!: Date;
  estimatedBoardingTime!: Date;
  boardingTimeString!: string;
  boardingTimeDifference!: string;
  boardingTimeEarlyOrLate!: string;
  boardingTimeMinOrMins!: string;
  boardingLastRefresh!: number;
  boardingGate!: string;

  departureMonth!: string;
  departureDateTimeString!: string;
  arrivalMonth!: string;
  arrivalDateTimeString!: string;

  constructor(private appService: AppService, private rtlService: RtlService, private renderer: Renderer2) {}

  ngOnInit() {
    zip([this.appService.getCurrentTrip(), this.appService.getDepartureAircraftStatus()])
      .pipe(takeUntil(this.componentUnsubscribe))
      .subscribe(([trip, departureAircraftStatus]) => {
        this.trip = trip;

        this.departureAircraftStatus = departureAircraftStatus;
        this.currentBoardingTime = new Date(this.departureAircraftStatus.currentBoardingTime);
        this.estimatedBoardingTime = new Date(this.departureAircraftStatus.estimatedBoardingTime);
        this.boardingTimeString = `${this.currentBoardingTime.getHours()}:${addZeroToTime(this.currentBoardingTime.getMinutes())}`;
        this.boardingTimeDifference = this.getTimeDifference(this.currentBoardingTime, this.estimatedBoardingTime);
        this.boardingTimeEarlyOrLate = this.earlyOrLate(this.currentBoardingTime, this.estimatedBoardingTime);
        this.boardingTimeMinOrMins = this.minOrMins(this.currentBoardingTime, this.estimatedBoardingTime)
        this.boardingLastRefresh = Math.floor((Math.abs(new Date().getTime() - new Date().getTime()) / 1000) / 60);
        this.boardingGate = this.departureAircraftStatus.gate;

        this.departureMonth = MONTHS[new Date(this.departureAircraftStatus.departureTime).getMonth()];
        this.departureDateTimeString = getDateAsDDTTTT(new Date(this.departureAircraftStatus.departureTime));
        this.arrivalMonth = MONTHS[new Date(this.departureAircraftStatus.arrivalTime).getMonth()];
        this.arrivalDateTimeString = getDateAsDDTTTT(new Date(this.departureAircraftStatus.arrivalTime));

        this.isDataAvailable = true;
      })
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }

  earlyOrLate(actual: Date, estimated: Date): string {
    const difference = actual.getTime() - estimated.getTime();
    const returnString = `${difference == 0 ? "ON_TIME" :
      difference < 0 ? "EARLY" : "LATE"}`;
    return returnString;
  }

  minOrMins(actual: Date, estimated: Date): string {
    const minutes = this.getTimeDifference(actual, estimated);
    return minutes === "0" ? "" : minutes === "1" ? "MIN" : "MINS";
  }

  getTimeDifference(actual: Date, estimated: Date): string {
    const difference = actual.getTime() - estimated.getTime();
    const minutes = Math.floor((Math.abs(difference) / 1000) / 60);
    return minutes == 0 ? "" : `${minutes}`;
  }
}
