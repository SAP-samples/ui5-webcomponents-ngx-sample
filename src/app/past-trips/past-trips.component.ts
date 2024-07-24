import { Component } from '@angular/core';
import { pastTrip } from '../interfaces/past-trips';
import { AppService } from '../services/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-past-trips',
  templateUrl: './past-trips.component.html',
  styleUrl: './past-trips.component.scss'
})
export class PastTripsComponent {

  mapStatusToGlyph: any = Object.freeze({
    'neutral' : 'sys-help',
    'positive' : 'thumb-up',
    'negative' : 'thumb-down'

  })

  mapTransportToGlyph: any = Object.freeze({
    'plane': 'travel-itinerary',
    'car': 'car-rental',
    'train': 'passenger-train',
    'boat': 'blur'
  })

  listOfVacations: pastTrip[];
  componentUnsubscribe: Subject<boolean> = new Subject();

  constructor(private appService: AppService){}


  ngOnInit(){
    this.appService.getPastTrips().pipe(takeUntil(this.componentUnsubscribe)).subscribe(
      data => {
        this.listOfVacations = data;
      }
    )
  }


  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
}

}
