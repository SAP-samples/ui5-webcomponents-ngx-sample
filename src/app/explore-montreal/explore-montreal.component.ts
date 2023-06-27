import { Component } from '@angular/core';
import {fadeIn} from './animations'


@Component({
  selector: 'app-explore-montreal',
  templateUrl: './explore-montreal.component.html',
  styleUrls: ['./explore-montreal.component.scss'],
  animations: [fadeIn],
})
export class ExploreMontrealComponent {
  

  picCount = 3;
  currentImageIndex = 1;
  picAddress = "assets/images/places/montreal_";
  fullAddress = this.picAddress+this.currentImageIndex+".png";

  circleArr:number []= [];

  constructor(){
    for(let i=0;i<this.picCount;i++){
      this.circleArr.push(i+1);
    }
  }

  getPic(){
    return this.picAddress+this.currentImageIndex+".png";
  }

  nextPic(){
    if(this.currentImageIndex<3){
    this.currentImageIndex++;
  }else{
    this.currentImageIndex=1;
  }
  this.fullAddress = this.getPic();
  }
  previousPic(){
    if(this.currentImageIndex > 1){
      this.currentImageIndex--;
    }
    else{
      this.currentImageIndex=this.picCount;
    }
    this.fullAddress = this.getPic();
  }

    getCircle(index:number){
      if(index===this.currentImageIndex){
        return "circle--blue";
      }
      return "circle";
    }

}
