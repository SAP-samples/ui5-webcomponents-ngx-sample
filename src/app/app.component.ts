import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';

import { AppService } from './services/services';
import { MONTHS } from './constants/constants';
import { addZeroToTime, getDateAsDDTTTT } from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isDataAvailable = false;

  trip: any;

  departureAircraftStatus: any;
  currentBoardingTime: any;
  estimatedBoardingTime: any;
  boardingTimeString: any;
  boardingTimeDifference: any;
  boardingTimeEarlyOrLate: any;
  boardingTimeMinOrMins: any;
  boardingLastRefresh: any;
  boardingGate: any;

  departureMonth: any;
  departureDateTimeString: any;
  arrivalMonth: any;
  arrivalDateTimeString: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    combineLatest([this.appService.getCurrentTrip(), this.appService.getDepartureAircraftStatus()])
      .subscribe(([trip, aircraftStatus]) => {
        this.trip = trip;

        this.departureAircraftStatus = aircraftStatus;
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

  earlyOrLate(actual: Date, estimated: Date): string {
    let difference = actual.getTime() - estimated.getTime();
    let returnString = `${difference == 0 ? "ON_TIME" :
      difference < 0 ? "EARLY" : "LATE"}`;
    return returnString;
  }

  minOrMins(actual: Date, estimated: Date): string {
    let minutes = this.getTimeDifference(actual, estimated);
    return minutes === "0" ? "" : minutes === "1" ? "MIN" : "MINS";
  }

  getTimeDifference(actual: Date, estimated: Date): string {
    let difference = actual.getTime() - estimated.getTime();
    let minutes = Math.floor((Math.abs(difference) / 1000) / 60);
    return minutes == 0 ? "" : `${minutes}`;
  }
}
