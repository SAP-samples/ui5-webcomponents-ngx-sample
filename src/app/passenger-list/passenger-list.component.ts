import { Component } from '@angular/core';

import { AppService } from '../services/services';

@Component({
    selector: 'app-passenger-list',
    templateUrl: './passenger-list.component.html',
    styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent {

    isDataAvailable = false;

    passengers: any;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getPassengers().subscribe((passengers) => {
            this.passengers = passengers;
            this.isDataAvailable = true;
        })
    }
}