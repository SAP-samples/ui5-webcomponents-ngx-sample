import { Component, inject } from '@angular/core';

import { ALPHABETS } from 'src/assets/constant-querries';
import { CURRENT_TRIP } from 'src/assets/mock-data/mock-trips';
import { DEPARTURE_AIRCRAFT_STATUS } from "src/assets/mock-data/mock-aircraft-status"
import { LegendItem } from '../interfaces/legend-item';
import { I18nService } from '@ui5/webcomponents-ngx/i18n';

@Component({
    selector: 'app-seats-chart',
    templateUrl: './seats-chart.component.html',
    styleUrls: ['./seats-chart.component.scss']
})
export class SeatsChartComponent {
    constructor() { }

    ngOnInit() { }

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

    i18nService = inject(I18nService);
    rows = DEPARTURE_AIRCRAFT_STATUS.rows;
    columns = DEPARTURE_AIRCRAFT_STATUS.columns;
    columnLabelIndex = this.sumPrefix(this.columns);
    availableSeats = DEPARTURE_AIRCRAFT_STATUS.availableSeats;
    yourSeats = CURRENT_TRIP.seatsSelected;
    chars = ALPHABETS;
    legendItems: LegendItem[] = [
        { icon: "sys-enter-2", color: "legend-item__icon--informative", text: "YOUR_SEATS" },
        { icon: "circle-task-2", color: "", text: "TAKEN" },
        { icon: "circle-task", color: "legend-item__icon--message", text: "AVAILABLE" }
    ];
}