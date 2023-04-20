import { Component } from '@angular/core';

import { AppService } from '../services/services';
import { MONTHS, DAYS } from '../constants/constants';
import { addZeroToTime } from '../utils/utils';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {

    isDataAvailable = false;

    payment_details: any;
    payment_date: any;
    payment_expiry: any;
    payment_month: any;
    payment_day: any;
    payment_hour: any;
    payment_minutes: any;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getPaymentDetails().subscribe((paymentDetails) => {
            this.payment_details = paymentDetails;
            this.payment_date = new Date(this.payment_details.date);
            this.payment_expiry = new Date(this.payment_details.expiry);
            this.payment_month = MONTHS[this.payment_date.getMonth()];
            this.payment_day = DAYS[this.payment_date.getDay()];
            this.payment_hour = addZeroToTime(this.payment_date.getHours());
            this.payment_minutes = addZeroToTime(this.payment_date.getMinutes());
            this.isDataAvailable = true;
        })
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