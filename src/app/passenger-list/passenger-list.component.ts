import { Component } from '@angular/core';

import { PASSENGERS } from '../../assets/mock-data/mock-passengers';

@Component({
    selector: 'app-passenger-list',
    templateUrl: './passenger-list.component.html',
    styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent {
    constructor() { }

    ngOnInit() { }

    passengers = PASSENGERS;
}