import { Component } from '@angular/core';

import { CURRENT_TRIP } from 'src/assets/mock-data/mock-trips';
import { ABB_MONTHS, addZeroToTime } from 'src/assets/constant-querries';
import { AIRCRAFT_STATUS } from 'src/assets/mock-data/mock-aircraft-status';

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
  addZeroToTime = addZeroToTime;
  boardingTime = `${AIRCRAFT_STATUS.currentBoardingTime.getHours()}:${addZeroToTime(AIRCRAFT_STATUS.currentBoardingTime.getMinutes())}`;
  boardingTimeDifference = this.earlyOrLate(AIRCRAFT_STATUS.currentBoardingTime, AIRCRAFT_STATUS.estimatedBoardingTime);
  boardingLastRefresh = Math.floor((Math.abs(new Date().getTime() - AIRCRAFT_STATUS.lastRefresh.getTime()) / 1000) / 60);
}
