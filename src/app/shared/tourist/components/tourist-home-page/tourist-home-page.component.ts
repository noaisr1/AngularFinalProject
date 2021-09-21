import { Component, OnInit } from '@angular/core';
import { Guide } from 'src/app/shared/guide/service/guide.service';
import { TouristService } from '../../service/tourist.service';

@Component({
  selector: 'app-tourist-home-page',
  templateUrl: './tourist-home-page.component.html',
  styleUrls: ['./tourist-home-page.component.css']
})
export class TouristHomePageComponent implements OnInit {

  public guidesArray: Guide[] = [];
  constructor(private touristService: TouristService) { }

  ngOnInit(): void {
    this.touristService.guides.subscribe( (guides: Guide) => {
      this.guidesArray.push(guides);
    })
  }

}
