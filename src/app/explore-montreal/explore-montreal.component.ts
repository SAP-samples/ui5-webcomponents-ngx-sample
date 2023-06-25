import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-montreal',
  templateUrl: './explore-montreal.component.html',
  styleUrls: ['./explore-montreal.component.scss']
})
export class ExploreMontrealComponent {
  
  picCount = 3;
  currentImageIndex = 1;
  picAddress = "assets/images/places/montreal_";


  getPic(){
    return this.picAddress+this.currentImageIndex+".png";
  }

  nextPic(){
    if(this.currentImageIndex<3){
    this.currentImageIndex++;
  }else{
    this.currentImageIndex=1;
  }
  }
  previousPic(){
    if(this.currentImageIndex >0){
      this.currentImageIndex--;
    }
    else{
      this.currentImageIndex=this.picCount;
    }
    
  }

}
