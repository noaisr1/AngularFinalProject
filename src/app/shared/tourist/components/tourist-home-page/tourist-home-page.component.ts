import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { AuthService, UserData } from 'src/app/shared/common/auth/auth.service';
import { Guide } from 'src/app/shared/guide/service/guide.service';
import { TouristService } from '../../service/tourist.service';

@Component({
  selector: 'app-tourist-home-page',
  templateUrl: './tourist-home-page.component.html',
  styleUrls: ['./tourist-home-page.component.css']
})
export class TouristHomePageComponent implements OnInit {
  public photoURL: string;
  public user: UserData;
  public isLoading = true;
  public guidesArray: Guide[] = [];
  public guidesPhotos: string[] = [];
  constructor(private touristService: TouristService, public authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.touristService.getListOfGuides();
    this.touristService.userData.subscribe(user => {
      this.user = user;
      let photoUid = this.authService.generateUid(user.firstName, user.lastName);
      let ref: AngularFireStorageReference = this.authService.afStorage.ref('/images/' + photoUid);
      ref.getDownloadURL().subscribe(res => {
        console.log(res);
        this.photoURL = res;
        this.isLoading = false;
      })
    })
    this.touristService.guides.subscribe( (guides: Guide[]) => {
      this.guidesArray = guides;
      for(let i=0; i<this.guidesArray.length; i++){
        let ref: AngularFireStorageReference = this.authService.afStorage.ref('/images/' + this.guidesArray[i].uid );
      ref.getDownloadURL().subscribe(res => {
        console.log(res);
        this.guidesPhotos.push(res);
      })
      }
      
    })
    
  }

  findAMatch() {

  }

}
