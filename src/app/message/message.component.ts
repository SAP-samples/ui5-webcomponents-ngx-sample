import { Component } from '@angular/core';

import { MESSAGES } from '../../assets/mock-data/mock-messages'

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    constructor() { }

    ngOnInit() { }

    messages = MESSAGES;
}