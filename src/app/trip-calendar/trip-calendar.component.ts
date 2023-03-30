import { Component } from '@angular/core';

import { DEPARTURE_AIRCRAFT_STATUS, RETURN_AIRCRAFT_STATUS } from 'src/assets/mock-data/mock-aircraft-status';
import { CURRENT_TRIP, RETURN_TRIP } from 'src/assets/mock-data/mock-trips';
import { LegendItem } from '../interfaces/legend-item';
import { MONTHS, getDatesArray, getDateAsddMMyyyy, getDateAsDDTTTT } from 'src/assets/constant-querries';

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

    departureBoardingMonth = MONTHS[DEPARTURE_AIRCRAFT_STATUS.gateOpenTime.getMonth()];
    departureBoardingDateTimeString = getDateAsDDTTTT(DEPARTURE_AIRCRAFT_STATUS.gateOpenTime);
    departureMonth = MONTHS[CURRENT_TRIP.departureTime.getMonth()];
    departureDateTimeString = getDateAsDDTTTT(CURRENT_TRIP.departureTime);
    departureGate = DEPARTURE_AIRCRAFT_STATUS.gate;

    returnBoardingMonth = MONTHS[RETURN_AIRCRAFT_STATUS.gateOpenTime.getMonth()];
    returnBoardingDateTimeString = getDateAsDDTTTT(RETURN_AIRCRAFT_STATUS.gateOpenTime);
    returnMonth = MONTHS[RETURN_AIRCRAFT_STATUS.estimatedBoardingTime.getMonth()];
    returnDateTimeString = getDateAsDDTTTT(RETURN_AIRCRAFT_STATUS.estimatedBoardingTime);
    returnGate = RETURN_AIRCRAFT_STATUS.gate;
    legendItems: LegendItem[] = [
        { icon: "color-fill", color: "legend-item__icon--background legend-item__icon__border legend-item__icon__border--now", text: "TODAY" },
        { icon: "color-fill", color: "legend-item__icon--selected legend-item__icon__border legend-item__icon__border--selected", text: "TRIP_DATES" }
    ];
}