import { Component, inject } from '@angular/core';
import { AppService } from '../services/services';
import { combineLatest } from 'rxjs';
import { I18nService } from '@ui5/webcomponents-ngx/i18n';

import { ALPHABETS } from '../constants/constants';
import { LegendItem } from '../interfaces/legend-item';

@Component({
    selector: 'app-seats-chart',
    templateUrl: './seats-chart.component.html',
    styleUrls: ['./seats-chart.component.scss']
})
export class SeatsChartComponent {
    isDataAvailable = false;

    i18nService = inject(I18nService);

    departureAircraftStatus: any;
    rows: any;
    columns: any;
    columnLabelIndex: any;
    availableSeats: any;
    yourSeats: any;
    chars = ALPHABETS;
    legendItems: LegendItem[] = [
        { icon: "sys-enter-2", color: "legend-item__icon--informative", text: "YOUR_SEATS" },
        { icon: "circle-task-2", color: "", text: "TAKEN" },
        { icon: "circle-task", color: "legend-item__icon--message", text: "AVAILABLE" }
    ];

    constructor(private appService: AppService) { }

    ngOnInit() {
        combineLatest([this.appService.getCurrentTrip(), this.appService.getDepartureAircraftStatus()]).subscribe(([currentTrip, departureAircraftStatus]) => {
            this.yourSeats = currentTrip.seatsSelected;
            this.departureAircraftStatus = departureAircraftStatus;
            this.rows = this.departureAircraftStatus.rows;
            this.columns = this.departureAircraftStatus.columns;
            this.columnLabelIndex = this.sumPrefix(this.columns);
            this.availableSeats = this.departureAircraftStatus.availableSeats;

            this.isDataAvailable = true;
        });
    }

    sumPrefix(array: int[]) {
        let new_arr: int[] = [0];
        for (let i = 0; i < array.length - 1; i++) {
            new_arr[i + 1] = 0;
            for (let j = 0; j < i + 1; j++) {
                new_arr[i + 1] += array[j];
            }
        }
        return new_arr;
    }

    checkIfSeatMarked(seatToCheck: int[], markedSeats: int[][]) {
        if (markedSeats.length > 0) {
            return markedSeats.some(element => seatToCheck.every((v, i) => v === element[i]));
        }
        return false;
    }
}