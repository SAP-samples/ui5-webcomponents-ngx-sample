import { Component } from '@angular/core';
import { AppService } from '../services/services';
import { teamMemberInterface } from '../interfaces/team';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(private appService: AppService){}

  team: teamMemberInterface[];
  isDataAvailable: boolean = false;
  currentExpandedItem: string = 'Customer Service';

  navigationItemObject = [
    {
      text: 'Pilots',
      icon: 'travel-itinerary',
    },
    {
      text: 'Air Traffic Controller',
      icon: 'headset'
    },
    {
      text: 'Engineering',
      icon: 'wrench',
    },
    {
      text: 'Ticketing',
      icon: 'insurance-life',
    },
    {
      text: 'Security',
      icon: 'locked',
    },
    {
      text: 'Customer Service',
      icon: 'customer',
    },
    {
      text: 'Other',
      icon: 'paging'
    }
  ]

  ngOnInit(){
    this.appService.getSapTeam().subscribe(
      data => this.team = data
    )
    this.isDataAvailable = true;
  }

  getInitials(name: string): string {
    return name.split(' ')[0].split('')[0] + name.split(' ')[1].split('')[0]
  }

  expandThis(team: string){
    this.currentExpandedItem = team;
  }

}
