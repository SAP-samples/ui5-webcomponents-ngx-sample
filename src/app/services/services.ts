import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AircraftStatus } from 'src/app/interfaces/aircraft-status';
import { Trip } from 'src/app/interfaces/trip';
import { User } from 'src/app/interfaces/user';
import { Passenger } from 'src/app/interfaces/passenger';
import { PaymentDetails } from 'src/app/interfaces/payment-details';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private departureAircraftStatusUrl = "/assets/mock-data/mockDepartureAircraftStatus.json";
    private returnAircraftStatusUrl = "/assets/mock-data/mockReturnAircraftStatus.json";
    private currentTripUrl = "assets/mock-data/mockCurrentTrip.json";
    private returnTripUrl = "assets/mock-data/mockReturnTrip.json";
    private domesticTripsUrl = "/assets/mock-data/mockPastDomesticTrips.json";
    private internationalTripsUrl = "/assets/mock-data/mockPastInternationalTrips.json";
    private userUrl = "/assets/mock-data/mockUser.json";
    private passengersUrl = "/assets/mock-data/mockPassengers.json";
    private paymentDetailsURL = "/assets/mock-data/mockPaymentDetails.json";

    constructor(private http: HttpClient) { }

    private getJSON<T = unknown>(url: string): Observable<T> {
        return this.http.get<T>(url);
    }

    getDepartureAircraftStatus(): Observable<AircraftStatus> {
        return this.getJSON(this.departureAircraftStatusUrl);
    }

    getReturnAircraftStatus(): Observable<AircraftStatus> {
        return this.getJSON(this.returnAircraftStatusUrl);
    }

    getCurrentTrip(): Observable<Trip> {
        return this.getJSON(this.currentTripUrl);
    }

    getReturnTrip(): Observable<Trip> {
        return this.getJSON(this.returnTripUrl);
    }

    getDomesticTrips(): Observable<Trip[]> {
        return this.getJSON(this.domesticTripsUrl);
    }

    getInternationalTrips(): Observable<Trip[]> {
        return this.getJSON(this.internationalTripsUrl);
    }

    getUser(): Observable<User> {
        return this.getJSON(this.userUrl);
    }

    getPassengers(): Observable<Passenger[]> {
        return this.getJSON(this.passengersUrl);
    }

    getPaymentDetails(): Observable<PaymentDetails> {
        return this.getJSON(this.paymentDetailsURL);
    }
}