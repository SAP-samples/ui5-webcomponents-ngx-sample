import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AppService } from '../services/services';
import { Passenger } from '../interfaces/passenger';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss'],
})
export class PassengerListComponent {
  componentUnsubscribe: Subject<boolean> = new Subject();
  isDataAvailable = false;

  passengers!: Passenger[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getPassengers()
      .pipe(takeUntil(this.componentUnsubscribe))
      .subscribe((passengers) => {
        this.passengers = passengers;
        this.isDataAvailable = true;
      });
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }
}
