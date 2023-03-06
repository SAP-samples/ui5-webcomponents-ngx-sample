import { Component } from '@angular/core';

import { PAYMENT_DETAILS } from '../../assets/mock-data/mock-payment-details';
import { MONTHS, DAYS, addZeroToTime } from 'src/assets/constant-querries';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {
    constructor() { }

    ngOnInit() { }

    getInitials(name: string) {
        var names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    payment_details = PAYMENT_DETAILS;
    payment_month = MONTHS[this.payment_details.date.getMonth()];
    payment_day = DAYS[this.payment_details.date.getDay()];
    payment_hour = addZeroToTime(this.payment_details.date.getHours());
    payment_minutes = addZeroToTime(this.payment_details.date.getMinutes());
}