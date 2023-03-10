import { Component } from '@angular/core';

import { DEPARTURE_AIRCRAFT_STATUS, RETURN_AIRCRAFT_STATUS } from 'src/assets/mock-data/mock-aircraft-status';
import { CURRENT_TRIP, RETURN_TRIP } from 'src/assets/mock-data/mock-trips';
import { getDatesArray, getDateAsddMMyyyy, getDateAsAbbStringMMddtttt } from 'src/assets/constant-querries';

@Component({
    selector: 'app-trip-calendar',
    templateUrl: './trip-calendar.component.html',
    styleUrls: ['./trip-calendar.component.scss']
})
export class TripCalendarComponent {
    constructor() { }

    ngOnInit() { }

    startDate = CURRENT_TRIP.departureTime;
    endDate = RETURN_TRIP.arrivalTime;
    datesBetween = getDatesArray(this.startDate, this.endDate);
    formatDate = getDateAsddMMyyyy;
    departureBoardingDateTimeString = getDateAsAbbStringMMddtttt(DEPARTURE_AIRCRAFT_STATUS.gateOpenTime);
    departureDateTimeString = getDateAsAbbStringMMddtttt(CURRENT_TRIP.departureTime);
    departureGate = DEPARTURE_AIRCRAFT_STATUS.gate;
    returnBoardingDateTimeString = getDateAsAbbStringMMddtttt(RETURN_AIRCRAFT_STATUS.gateOpenTime);
    returnDateTimeString = getDateAsAbbStringMMddtttt(RETURN_AIRCRAFT_STATUS.estimatedBoardingTime);
    returnGate = RETURN_AIRCRAFT_STATUS.gate;
}