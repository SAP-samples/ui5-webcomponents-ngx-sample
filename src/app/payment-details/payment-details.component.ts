import { ChangeDetectorRef, Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

import { AppService } from "../services/services";
import { MONTHS, DAYS } from "../constants/constants";
import { addZeroToTime } from "../utils/utils";
import { PaymentDetails } from "../interfaces/payment-details";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-payment-details",
  templateUrl: "./payment-details.component.html",
  styleUrls: ["./payment-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDetailsComponent {
  componentUnsubscribe: Subject<boolean> = new Subject();
  isDataAvailable = false;

  payment_details!: PaymentDetails;
  payment_date!: Date;
  payment_expiry!: Date;
  payment_month!: string;
  payment_day!: string;
  payment_hour!: string;
  payment_minutes!: string;

  constructor(private appService: AppService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.appService
      .getPaymentDetails()
      .pipe(takeUntil(this.componentUnsubscribe))
      .subscribe((paymentDetails) => {
        this.payment_details = paymentDetails;
        this.payment_date = new Date(this.payment_details.date);
        this.payment_expiry = new Date(this.payment_details.expiry);
        this.payment_month = MONTHS[this.payment_date.getMonth()];
        this.payment_day = DAYS[this.payment_date.getDay()];
        this.payment_hour = addZeroToTime(this.payment_date.getHours());
        this.payment_minutes = addZeroToTime(this.payment_date.getMinutes());
        this.isDataAvailable = true;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.componentUnsubscribe.next(true);
    this.componentUnsubscribe.complete();
  }

  getInitials(name: string) {
    var names = name.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
}
