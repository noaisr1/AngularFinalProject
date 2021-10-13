import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AuthService, UserData } from '../../common/auth/auth.service';
import { Guide } from '../../guide/service/guide.service';
import { TouristService } from '../service/tourist.service';

@Component({
  selector: 'app-dashboard-tourist',
  templateUrl: './dashboard-tourist.component.html',
  styleUrls: ['./dashboard-tourist.component.css']
})
export class DashboardTouristComponent implements OnInit {
  public isLoading = false;
  public user: UserData;
  public photoURL: string;
  public guidesArray: Guide[] = [];
  public guidesPhotos: string[] = [];
  constructor(
    public authService: AuthService,
    private touristService: TouristService,
    public router: Router,
    public ngZone: NgZone
  ) {
    console.log(this.user);
    let observables: Observable<any>[] = [];
    this.touristService.getListOfGuides();
    this.touristService.userData.subscribe((user)=>{
      this.user=user;
      console.log(user);
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
       
          observables.push(ref.getDownloadURL());
        
      }
      forkJoin(observables).subscribe(dataArray=> {
        this.guidesPhotos = dataArray;
      })
      
    })
   }

  ngOnInit() {

  }

}
