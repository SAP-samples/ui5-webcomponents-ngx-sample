import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Passenger } from "src/app/interfaces/passenger"

@Component({
    selector: 'app-passenger-list',
    templateUrl: './passenger-list.component.html',
    styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent {

    private passengersUrl = "/assets/mock-data/mockPassengers.json";

    isDataAvailable = false;

    passengers: any;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getJSON(this.passengersUrl).subscribe((data) => {
            this.passengers = <Passenger[]>data.passengers;
            this.isDataAvailable = true;
        })
    }

    private getJSON(url: string): Observable<any> {
        return this.http.get(url);
    }
}