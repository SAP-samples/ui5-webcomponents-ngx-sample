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
    isPassengerInEditMode:boolean = false;
    editPassenger = {firstName:"",lastName:"",Address: "",index:0};



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
        const numberOfUsersPerPage = 5;
        const upperLimit = this.passengersIndex*numberOfUsersPerPage;
        const lowerLimit = upperLimit-numberOfUsersPerPage;
        if(index >= lowerLimit && index < upperLimit){
            return true;
        }
        return false;
    }

    onEditExit(){
        this.isInEditMode = !this.isInEditMode;
        this.isInEditModeChange.emit(this.isInEditMode);
        
    }

    removePassenger(index:number){
        this.passengers.splice(index,index+1);
    }

    onEditPassenger(index:number){
        this.editPassenger.firstName = this.passengers[index].name
        .substring(0,this.passengers[index].name.indexOf(" "));
        this.editPassenger.lastName = this.passengers[index].name
        .substring(this.passengers[index].name.indexOf(" "));
        this.editPassenger.Address = this.passengers[index].address;
        this.editPassenger.index = index;
        this.isInEditMode = !this.isInEditMode;
        this.isPassengerInEditMode = !this.isPassengerInEditMode;
        
        
    }
    onCancelEditPassenger(){
        this.isPassengerInEditMode = !this.isPassengerInEditMode;
        this.isInEditMode = !this.isInEditMode;
    }

    onConfirmEdit(){
        this.passengers[this.editPassenger.index].name = 
        this.editPassenger.firstName + " " + this.editPassenger.lastName;
        this.passengers[this.editPassenger.index].address = this.editPassenger.Address;
        this.isInEditMode = !this.isInEditMode;
        this.isPassengerInEditMode = !this.isPassengerInEditMode;
    }

    onEditClick(event:any,state:string,){
        if(state === "first-name"){
            this.editPassenger.firstName = event.target.value;

        }
        else if(state === "last-name"){
            this.editPassenger.lastName = event.target.value;

        }
        else if (state === "address"){
            this.editPassenger.Address = event.target.value;
        }
    }
 

}