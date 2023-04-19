import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PaymentDetails } from "src/app/interfaces/payment-details";
import { MONTHS, DAYS } from 'src/app/constants/constants';
import { addZeroToTime } from 'src/app/utils/utils';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {

    private paymentDetailsURL = "/assets/mock-data/mockPaymentDetails.json";

    isDataAvailable = false;

    payment_details: any;
    payment_date: any;
    payment_expiry: any;
    payment_month: any;
    payment_day: any;
    payment_hour: any;
    payment_minutes: any;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getJSON(this.paymentDetailsURL).subscribe((data: PaymentDetails) => {
            this.payment_details = data;
            this.payment_date = new Date(this.payment_details.date);
            this.payment_expiry = new Date(this.payment_details.expiry);
            this.payment_month = MONTHS[this.payment_date.getMonth()];
            this.payment_day = DAYS[this.payment_date.getDay()];
            this.payment_hour = addZeroToTime(this.payment_date.getHours());
            this.payment_minutes = addZeroToTime(this.payment_date.getMinutes());
            this.isDataAvailable = true;
        })
    }

    private getJSON(url: string): Observable<any> {
        return this.http.get(url);
    }

    getInitials(name: string) {
        var names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };
}