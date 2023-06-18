import { Component,Input, Output, EventEmitter} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AppService } from '../services/services';
import { Passenger } from '../interfaces/passenger';

@Component({
    selector: 'app-passenger-list',
    templateUrl: './passenger-list.component.html',
    styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent {

    componentUnsubscribe: Subject<boolean> = new Subject();
    isDataAvailable = false;

    passengers!: Passenger[];

    // monitors current passenger list page
    @Input() passengersIndex:number = 1;      

    @Input() isInEditMode:boolean = false;
    @Output() isInEditModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getPassengers()
            .pipe(takeUntil(this.componentUnsubscribe))
            .subscribe((passengers) => {
                this.passengers = passengers;
                this.isDataAvailable = true;
            })
    }

    ngOnDestroy() {
        this.componentUnsubscribe.next(true);
        this.componentUnsubscribe.complete();
    }

    isInCurrentPage(index:number){
        const numberOfUsersPerPage = 6;
        const upperLimit = this.passengersIndex*numberOfUsersPerPage;
        const lowerLimit = upperLimit-numberOfUsersPerPage;
        if(index >= lowerLimit && index < upperLimit){
            return true;
        }
        return false;
    }

    onEditExit(){
        this.isInEditModeChange.emit(!this.isInEditMode);
        this.isInEditMode = !this.isInEditMode;
    }

    removePassenger(index:number){
        this.passengers.splice(index,index+1);
    }

}