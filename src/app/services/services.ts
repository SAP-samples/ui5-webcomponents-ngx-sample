import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AircraftStatus } from '../interfaces/aircraft-status';
import { Trip } from '../interfaces/trip';
import { User } from '../interfaces/user';
import { Passenger } from '../interfaces/passenger';
import { PaymentDetails } from '../interfaces/payment-details';
import { CountryListItem } from '../interfaces/country-details';
import { pastTrip } from '../interfaces/past-trips';

import { teamMemberInterface } from '../interfaces/team';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private _baseUrl = '/assets/mock-data';

    constructor(private http: HttpClient) { }

    getDepartureAircraftStatus(): Observable<AircraftStatus> {
        return this.http.get<AircraftStatus>(`${this._baseUrl}/mockDepartureAircraftStatus.json`);
    }

    getReturnAircraftStatus(): Observable<AircraftStatus> {
        return this.http.get<AircraftStatus>(`${this._baseUrl}/mockReturnAircraftStatus.json`);
    }

    getCurrentTrip(): Observable<Trip> {
        return this.http.get<Trip>(`${this._baseUrl}/mockCurrentTrip.json`);
    }

    getReturnTrip(): Observable<Trip> {
        return this.http.get<Trip>(`${this._baseUrl}/mockReturnTrip.json`);
    }

    getDomesticTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(`${this._baseUrl}/mockPastDomesticTrips.json`);
    }

    getInternationalTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(`${this._baseUrl}/mockPastInternationalTrips.json`);
    }

    getUser(): Observable<User> {
        return this.http.get<User>(`${this._baseUrl}/mockUser.json`);
    }

    getPassengers(): Observable<Passenger[]> {
        return this.http.get<Passenger[]>(`${this._baseUrl}/mockPassengers.json`);
    }

    getPaymentDetails(): Observable<PaymentDetails> {
        return this.http.get<PaymentDetails>(`${this._baseUrl}/mockPaymentDetails.json`);
    }

    getCountryDetails(): Observable<CountryListItem[]> {
        return this.http.get<CountryListItem[]>(`${this._baseUrl}/mockCountryDetails.json`);
    }

    getPastTrips(): Observable<pastTrip[]>{
        return this.http.get<pastTrip[]>(`${this._baseUrl}/mockPastTrips.json`);
    }

    getSapTeam(): Observable<teamMemberInterface[]>{
        return this.http.get<teamMemberInterface[]>(`${this._baseUrl}/mockSapAirlineTeam.json`);
    }
}