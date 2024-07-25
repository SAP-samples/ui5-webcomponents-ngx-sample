import { Component, ElementRef, ViewChild } from '@angular/core';
import { Trip } from '../interfaces/trip';
import { CountryListItem } from '../interfaces/country-details';
import { AppService } from '../services/services';
import { Subject, takeUntil } from 'rxjs';
import { FdDate } from '@fundamental-ngx/core';
import { DateRange } from '@fundamental-ngx/core';
import { Passenger } from '../interfaces/passenger';
import { packageDeals } from '../interfaces/package-deals';
import { ListItemClickEventDetail } from '@ui5/webcomponents/dist/List';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.scss'
})
export class TripPlannerComponent {

  constructor(private appService: AppService){}

  isDataAvailable: Boolean = false;
  isMobile: boolean = window.screen.availHeight<=932 && window.screen.availWidth<=430 ? true : false;
  
  // Country Data
  CountryDetails!: CountryListItem[];
  CountryDetailsSuggested!: CountryListItem[];
  
  componentUnsubscribe: Subject<boolean> = new Subject();

  // Trip Data
  tripData: Trip;
  rangeDate = new DateRange(new FdDate(2020, 10, 25), new FdDate(2020, 10, 26));
  randomPackageDeals: packageDeals[] = [];
  currId: number = 0;
  packageSelected!: packageDeals;
  
  // Passenger Data
  listOfPassengers: Passenger[] = [];
  passengerToAddName: string;
  passengerToAddAddress: string;
  passengerToAddPassNumber: string;


  listOfCountries: string[] = ["Argentina", "Albania", "Algeria", "Angola",
    "Austria", "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
    "England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait",
    "Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal",
    "Spain", "Sweden", "Sri Lanka", "Senegal", "Thailand", "The United Kingdom of Great Britain and Northern Ireland", "USA"];

    countryInput: string = '';
    suggestionItems: string[] = [];
    
    destination: string = '';

    ngOnInit(){
      
      for (let j = 0; j < 12; j++){
        this.randomPackageDeals.push(this.generateRandomPackageDeals());
      }

      this.appService.getCountryDetails().pipe(takeUntil(this.componentUnsubscribe)).subscribe((data) => {
          this.CountryDetails = data;
      });

      this.isDataAvailable = true;
      console.log(this.isMobile);
    }

    showSuggestions(){
      if (this.countryInput){
        this.suggestionItems = this.listOfCountries.filter(
              (item) => {
                return item.toUpperCase().indexOf(this.countryInput.toUpperCase()) === 0
              }
        )

        this.CountryDetailsSuggested = this.CountryDetails.filter(
          (item) => {
            return item.name.toUpperCase().indexOf(this.countryInput.toUpperCase()) === 0
          }     
        )
      }
      if (!this.countryInput){
        this.suggestionItems = [];
      }
    }

    selectCountry(suggestion: string){
      this.countryInput = suggestion;
      this.destination = suggestion;
      this.suggestionItems = [];

      this.randomPackageDeals = [];

      for (let i = 0; i<6; i++){
        this.randomPackageDeals.push(this.generateRandomPackageDeals(this.destination));
      }
      
    }

    removeItem(index: number){
      this.listOfPassengers.splice(index,1);
    }

    addPassenger(){
      if (!(this.passengerToAddName in this.listOfPassengers)){
        this.listOfPassengers.push(
          {
            name: this.passengerToAddName,
            address: this.passengerToAddAddress,
            passportNumber: this.passengerToAddPassNumber
          }
        )
      }
    }


    randomCountry: string;
    randomPrice: number;
    randomStartDate: FdDate;
    randomEndDate: FdDate;
    month: number;
    day: number;
    endDay: number;

    generateRandomPackageDeals(country?: string){
      if (!(country)){
        this.randomCountry = this.listOfCountries[Math.floor(Math.random() * this.listOfCountries.length)];
      } else {
        this.randomCountry = country;
      }
      
      this.randomPrice = Math.floor(Math.random()*1250)
      this.randomPrice = this.randomPrice < 400 ? 1500 : this.randomPrice;


      this.month = Math.floor(Math.random()*12);
      this.day = Math.floor(Math.random()*30)
      this.endDay = (this.day+1) + Math.floor(Math.random()*7);

      this.randomStartDate = new FdDate(2024, this.month, this.day);
      this.randomEndDate = new FdDate(2024, (this.endDay > 30) ? (this.month+1, this.endDay-=30) : this.month , this.endDay);
      this.currId++;

      return {
        id: this.currId,
        country: this.randomCountry,
        price: this.randomPrice,
        vacationStart: this.randomStartDate,
        vacationEnd: this.randomEndDate,
        selected: false
      }
    }
    
    changeDesiredPackage(p: ListItemClickEventDetail){
      this.packageSelected = Array.from(this.randomPackageDeals).filter(item => item.id == Number.parseInt(p.item.id.split('_')[1]))[0];
      console.log(this.packageSelected);
    }

    ngOnDestroy() {
      this.componentUnsubscribe.next(true);
      this.componentUnsubscribe.complete();
  }


}

