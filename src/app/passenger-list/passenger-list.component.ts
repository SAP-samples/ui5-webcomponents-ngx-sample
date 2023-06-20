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
    numberOfUsersPerPage = 5;
    localNumberOfPages = 1;
    @Output() numberOfPagesChange:EventEmitter<number> = new EventEmitter<number>();   
    @Input() currentPage:number = 1; 
      

    @Input() isInEditMode:boolean = false;
    @Output() isInEditModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    isPassengerInEditMode:boolean = false;
    editPassenger = {firstName:"",lastName:"",address: "",index:0};

    isAddingPassenger:boolean = false;
    addNewPassenger= {firstName:"",lastName:"",address:""}

   
  



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
        const upperLimit = this.currentPage*this.numberOfUsersPerPage;
        const lowerLimit = upperLimit-this.numberOfUsersPerPage;
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
        this.passengers.splice(index,1);
        // if(index === 0){
        //     this.passengers.splice(index,index+1);
        // }
        // else{
        //     this.passengers.splice(index,index);
        // }
        if(Math.ceil(this.passengers.length/this.numberOfUsersPerPage) < this.localNumberOfPages 
        && this.localNumberOfPages>1){
            this.localNumberOfPages--;
            this.numberOfPagesChange.emit(this.localNumberOfPages);
        }
        
    }

    onEditPassenger(index:number){
        this.editPassenger.firstName = this.passengers[index].name
        .substring(0,this.passengers[index].name.indexOf(" "));
        this.editPassenger.lastName = this.passengers[index].name
        .substring(this.passengers[index].name.indexOf(" "));
        this.editPassenger.address = this.passengers[index].address;
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
        this.passengers[this.editPassenger.index].address = this.editPassenger.address;
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
            this.editPassenger.address = event.target.value;
        }
    }

    onAddPassenger(){
        this.isInEditMode = !this.isInEditMode;
        this.isAddingPassenger = !this.isAddingPassenger;
        
        this.addNewPassenger.address ="";
        this.addNewPassenger.firstName ="";
        this.addNewPassenger.lastName = "";

    }

    onAddClick(event:any,state:string,){
        if(state === "first-name"){
            this.addNewPassenger.firstName = event.target.value;

        }
        else if(state === "last-name"){
            this.addNewPassenger.lastName = event.target.value;

        }
        else if (state === "address"){
            this.addNewPassenger.address = event.target.value;
        }
    }

    onAddConfirm(){
        let tempPassenger:Passenger = {
            name: (
                this.addNewPassenger.firstName + " " +  this.addNewPassenger.lastName),
            address: this.addNewPassenger.address
        }
        this.passengers.push(tempPassenger);

        this.isAddingPassenger = !this.isAddingPassenger;
        this.isInEditMode = !this.isInEditMode;

        this.addNewPassenger.address ="";
        this.addNewPassenger.firstName ="";
        this.addNewPassenger.lastName = "";
        if(this.passengers.length > this.numberOfUsersPerPage*this.localNumberOfPages){
            this.localNumberOfPages++;
            this.numberOfPagesChange.emit(this.localNumberOfPages);
        }
    }


 
 

}