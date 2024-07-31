import { Component, ChangeDetectorRef } from "@angular/core";
import { pastTrip } from "../interfaces/past-trips";
import { AppService } from "../services/services";
import { Subject, takeUntil } from "rxjs";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-past-trips",
  templateUrl: "./past-trips.component.html",
  styleUrl: "./past-trips.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastTripsComponent {
  mapStatusToGlyph: any = Object.freeze({
    neutral: "sys-help",
    positive: "thumb-up",
    negative: "thumb-down",
  });

  mapTransportToGlyph: any = Object.freeze({
    plane: "travel-itinerary",
    car: "car-rental",
    train: "passenger-train",
    boat: "blur",
  });

  listOfVacations: pastTrip[];
  itemSize: number;
  componentUnsubscribe: Subject<boolean> = new Subject();

  constructor(private appService: AppService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.appService
      .getPastTrips()
      .pipe(takeUntil(this.componentUnsubscribe))
      .subscribe((data) => {
        this.listOfVacations = data;
        this.itemSize = this.listOfVacations.length;
        this.cdr.markForCheck();
      });
  }

  trackByTrip(index: number, trip: any): string {
    return trip.id;
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }
}
