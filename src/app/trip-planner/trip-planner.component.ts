import { Component } from '@angular/core';
import { Trip } from '../interfaces/trip';
import { GridListItemType } from '@fundamental-ngx/core/grid-list';
import { CountryListItem } from '../interfaces/country-details';
import { AppService } from '../services/services';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.scss'
})
export class TripPlannerComponent {

  constructor(private appService: AppService){}

  isDataAvailable: Boolean = false;
  CountryDetails!: CountryListItem[];
  CountryDetailsSuggested!: CountryListItem[];
  componentUnsubscribe: Subject<boolean> = new Subject();

  tripData: Trip;

  ngOnInit(){
    this.appService.getCountryDetails().pipe(takeUntil(this.componentUnsubscribe)).subscribe((data) => {
        this.CountryDetails = data;
    });

    console.log(this.CountryDetails);
    this.isDataAvailable = true;

  }


  listOfCountries: string[] = ["Argentina", "Albania", "Algeria", "Angola",
    "Austria", "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
    "England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait",
    "Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal",
    "Spain", "Sweden", "Sri Lanka", "Senegal", "Thailand", "The United Kingdom of Great Britain and Northern Ireland", "USA"];

    countryInput: string = '';
    suggestionItems: string[] = [];
    
    destination: string = '';

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
    console.log(this.CountryDetailsSuggested);
      }

      

      if (!this.countryInput){
        this.suggestionItems = [];
      }


    }


    selectCountry(suggestion: string){
      this.countryInput = suggestion;
      this.destination = suggestion;
      this.suggestionItems = [];
    }


    planningTrip(){

    }


    ngOnDestroy() {
      this.componentUnsubscribe.next(true);
      this.componentUnsubscribe.complete();
  }
}
