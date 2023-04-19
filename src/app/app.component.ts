import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, forkJoin, of } from 'rxjs';

import { AircraftStatus } from './interfaces/aircraft-status';
import { Trip } from './interfaces/trip';
import { MONTHS } from 'src/app/constants/constants';
import { addZeroToTime, getDateAsDDTTTT } from 'src/app/utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private aircraftStatusUrl = "/assets/mock-data/mockAircraftStatus.json";
  private tripsUrl = "assets/mock-data/mockTrips.json";
  isDataAvailable = false;

  departureAircraftStatus: AircraftStatus | undefined;
  currentBoardingTime: any;
  estimatedBoardingTime: any;
  boardingTimeString: any;
  boardingTimeDifference: any;
  boardingTimeEarlyOrLate: any;
  boardingTimeMinOrMins: any;
  boardingLastRefresh: any;
  boardingGate: any;

  trip: any;

  departureMonth: any;
  departureDateTimeString: any;
  arrivalMonth: any;
  arrivalDateTimeString: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJSON(this.tripsUrl).pipe(
      switchMap((data) => {
        return forkJoin({
          trips: of(data),
          aircraftStatus: this.getJSON(this.aircraftStatusUrl)
        });
      })
    ).subscribe(({ trips, aircraftStatus }) => {
      this.trip = <Trip>trips.currentTrip;

      this.departureAircraftStatus = <AircraftStatus>aircraftStatus.departureAircraftStatus;
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
    });
    this.getJSON(this.aircraftStatusUrl).subscribe((data) => {

    })
  }

  private getJSON(url: string): Observable<any> {
    return this.http.get(url);
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
