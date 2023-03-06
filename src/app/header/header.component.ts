import { Component } from '@angular/core';

import { USER } from 'src/assets/mock-data/mock-user';
import { DOMESTIC_TRIPS, INTERNATIONAL_TRIPS } from 'src/assets/mock-data/mock-trips';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor() { }

    ngOnInit() { }

    user = USER;
    domestic = DOMESTIC_TRIPS;
    international = INTERNATIONAL_TRIPS;
}