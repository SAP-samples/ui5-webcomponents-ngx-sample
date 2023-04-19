import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, forkJoin, of } from 'rxjs';

import { LegendItem } from 'src/app/interfaces/legend-item';
import { AircraftStatus } from 'src/app/interfaces/aircraft-status';
import { MONTHS } from 'src/app/constants/constants';
import { getDatesArray, getDateAsddMMyyyy, getDateAsDDTTTT } from 'src/app/utils/utils';

@Component({
    selector: 'app-trip-calendar',
    templateUrl: './trip-calendar.component.html',
    styleUrls: ['./trip-calendar.component.scss']
})
export class TripCalendarComponent {

    private aircraftStatusUrl = "/assets/mock-data/mockAircraftStatus.json";
    private tripsUrl = "assets/mock-data/mockTrips.json";
    isDataAvailable = false;

    departureAircraftStatus: AircraftStatus | undefined;
    returnAircraftStatus: AircraftStatus | undefined;

    startDate: any;
    endDate: any;
    datesBetween: any;
    formatDate = getDateAsddMMyyyy;

    departureBoardingMonth: any;
    departureBoardingDateTimeString: any;
    departureMonth: any;
    departureDateTimeString: any;
    departureGate: any;

    returnBoardingMonth: any;
    returnBoardingDateTimeString: any;
    returnMonth: any;
    returnDateTimeString: any;
    returnGate: any;

    legendItems: LegendItem[] = [
        { icon: "color-fill", color: "legend-item__icon--background legend-item__icon__border legend-item__icon__border--now", text: "TODAY" },
        { icon: "color-fill", color: "legend-item__icon--selected legend-item__icon__border legend-item__icon__border--selected", text: "TRIP_DATES" }
    ];

    constructor(private http: HttpClient) { }

    async ngOnInit() {

        this.getJSON(this.tripsUrl).pipe(
            switchMap((data) => {
                return forkJoin({
                    trips: of(data),
                    aircraftStatus: this.getJSON(this.aircraftStatusUrl)
                });
            })
        ).subscribe(({ trips, aircraftStatus }) => {
            this.startDate = new Date(trips.currentTrip.departureTime);
            this.endDate = new Date(trips.returnTrip.arrivalTime);
            this.datesBetween = getDatesArray(this.startDate, this.endDate);

            this.departureAircraftStatus = <AircraftStatus>aircraftStatus.departureAircraftStatus;
            this.returnAircraftStatus = <AircraftStatus>aircraftStatus.returnAircraftStatus;

            this.departureBoardingMonth = MONTHS[new Date(this.departureAircraftStatus.gateOpenTime).getMonth()];
            this.departureBoardingDateTimeString = getDateAsDDTTTT(new Date(this.departureAircraftStatus.gateOpenTime));
            this.departureMonth = MONTHS[new Date(this.departureAircraftStatus.departureTime).getMonth()];
            this.departureDateTimeString = getDateAsDDTTTT(new Date(this.departureAircraftStatus.departureTime));
            this.departureGate = this.departureAircraftStatus.gate;

            this.returnBoardingMonth = MONTHS[new Date(this.returnAircraftStatus.gateOpenTime).getMonth()];
            this.returnBoardingDateTimeString = getDateAsDDTTTT(new Date(this.returnAircraftStatus.gateOpenTime));
            this.returnMonth = MONTHS[new Date(this.returnAircraftStatus.estimatedBoardingTime).getMonth()];
            this.returnDateTimeString = getDateAsDDTTTT(new Date(this.returnAircraftStatus.estimatedBoardingTime));
            this.returnGate = this.returnAircraftStatus.gate;

            this.isDataAvailable = true;
        });
    }

    private getJSON(url: string): Observable<any> {
        return this.http.get(url);
    }
}