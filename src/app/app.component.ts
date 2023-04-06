import { Component } from '@angular/core';

import { CURRENT_TRIP } from 'src/assets/mock-data/mock-trips';
import { addZeroToTime, getDateAsDDTTTT, MONTHS } from 'src/assets/constant-querries';
import { DEPARTURE_AIRCRAFT_STATUS } from 'src/assets/mock-data/mock-aircraft-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit() { }

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

  trip = CURRENT_TRIP;
  boardingTime = `${DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime.getHours()}:${addZeroToTime(DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime.getMinutes())}`;
  boardingTimeDifference = this.getTimeDifference(DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime, DEPARTURE_AIRCRAFT_STATUS.estimatedBoardingTime);
  boardingTimeEarlyOrLate = this.earlyOrLate(DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime, DEPARTURE_AIRCRAFT_STATUS.estimatedBoardingTime);
  boardingTimeMinOrMins = this.minOrMins(DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime, DEPARTURE_AIRCRAFT_STATUS.estimatedBoardingTime)
  boardingLastRefresh = Math.floor((Math.abs(new Date().getTime() - DEPARTURE_AIRCRAFT_STATUS.lastRefresh.getTime()) / 1000) / 60);

  departureMonth = MONTHS[CURRENT_TRIP.departureTime.getMonth()];
  departureDateTimeString = getDateAsDDTTTT(CURRENT_TRIP.departureTime);
  arrivalMonth = MONTHS[CURRENT_TRIP.arrivalTime.getMonth()];
  arrivalDateTimeString = getDateAsDDTTTT(CURRENT_TRIP.arrivalTime);
}
