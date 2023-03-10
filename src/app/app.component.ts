import { Component } from '@angular/core';

import { CURRENT_TRIP } from 'src/assets/mock-data/mock-trips';
import { ABB_MONTHS, addZeroToTime, getDateAsAbbStringMMddtttt } from 'src/assets/constant-querries';
import { DEPARTURE_AIRCRAFT_STATUS } from 'src/assets/mock-data/mock-aircraft-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  earlyOrLate(actual: Date, estimated: Date): string {
    var difference = actual.getTime() - estimated.getTime();
    var minutes = Math.floor((Math.abs(difference) / 1000) / 60);
    var returnString = `${difference == 0 ? "On time" :
      `${minutes}`}
    ${minutes == 1 ? " min " : " mins "}
      ${difference < 0 ? "early" : "late"}`;
    return returnString;
  }

  title = 'mock-project';

  trip = CURRENT_TRIP;
  months = ABB_MONTHS;
  boardingTime = `${DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime.getHours()}:${addZeroToTime(DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime.getMinutes())}`;
  boardingTimeDifference = this.earlyOrLate(DEPARTURE_AIRCRAFT_STATUS.currentBoardingTime, DEPARTURE_AIRCRAFT_STATUS.estimatedBoardingTime);
  boardingLastRefresh = Math.floor((Math.abs(new Date().getTime() - DEPARTURE_AIRCRAFT_STATUS.lastRefresh.getTime()) / 1000) / 60);
  departureDateTimeString = getDateAsAbbStringMMddtttt(CURRENT_TRIP.departureTime);
  arrivalDateTimeString = getDateAsAbbStringMMddtttt(CURRENT_TRIP.arrivalTime);
}
