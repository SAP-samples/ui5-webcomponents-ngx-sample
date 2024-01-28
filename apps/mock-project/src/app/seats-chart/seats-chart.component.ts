import { Component, inject } from '@angular/core';
import { Subject, takeUntil, zip } from 'rxjs';
import { I18nService } from '@ui5/webcomponents-ngx/i18n';

import { AppService } from '../services/services';
import { ALPHABETS } from '../constants/constants';
import { LegendItem } from '../interfaces/legend-item';
import { AircraftStatus } from '../interfaces/aircraft-status';

@Component({
  selector: 'app-seats-chart',
  templateUrl: './seats-chart.component.html',
  styleUrls: ['./seats-chart.component.scss'],
})
export class SeatsChartComponent {
  componentUnsubscribe: Subject<boolean> = new Subject();
  isDataAvailable = false;

  i18nService = inject(I18nService);

  departureAircraftStatus!: AircraftStatus;
  rows!: number;
  columns!: number[];
  columnLabelIndex!: number[];
  availableSeats!: number[][];
  yourSeats!: number[][];

  chars = ALPHABETS;
  legendItems: LegendItem[] = [
    {
      icon: 'sys-enter-2',
      color: 'legend-item__icon--informative',
      text: 'YOUR_SEATS',
    },
    { icon: 'circle-task-2', color: '', text: 'TAKEN' },
    {
      icon: 'circle-task',
      color: 'legend-item__icon--message',
      text: 'AVAILABLE',
    },
  ];

  constructor(private appService: AppService) {}

  ngOnInit() {
    zip([
      this.appService.getCurrentTrip(),
      this.appService.getDepartureAircraftStatus(),
    ])
      .pipe(takeUntil(this.componentUnsubscribe))
      .subscribe(([currentTrip, departureAircraftStatus]) => {
        this.departureAircraftStatus = departureAircraftStatus;
        this.rows = this.departureAircraftStatus.rows;
        this.columns = this.departureAircraftStatus.columns;
        this.columnLabelIndex = this.sumPrefix(this.columns);
        this.availableSeats = this.departureAircraftStatus.availableSeats;
        this.yourSeats = currentTrip.seatsSelected;

        this.isDataAvailable = true;
      });
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }

  sumPrefix(array: number[]) {
    let new_arr: number[] = [0];
    for (let i = 0; i < array.length - 1; i++) {
      new_arr[i + 1] = 0;
      for (let j = 0; j < i + 1; j++) {
        new_arr[i + 1] += array[j];
      }
    }
    return new_arr;
  }

  checkIfSeatMarked(seatToCheck: number[], markedSeats: number[][]) {
    if (markedSeats.length > 0) {
      return markedSeats.some((element) =>
        seatToCheck.every((v, i) => v === element[i])
      );
    }
    return false;
  }
}
