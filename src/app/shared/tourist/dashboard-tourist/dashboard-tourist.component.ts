import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute, Params } from '@angular/router';
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
  public isLoading = true;
  public isLoadingGuides = true;
  public user: UserData;
  public uid: any;
  public photoUrl: string;
  public guidesUserArray: UserData[] = [];
  public guides: Guide[] = [];
  public guidesPhotos: string[] = [];
  constructor(
    public authService: AuthService,
    private touristService: TouristService,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone,
    private route: ActivatedRoute
  ) {
   }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params: Params) => {
      this.uid = params['uid'];
      
    })
    let observables: Observable<any>[] = [];
    this.touristService.getListOfGuides();
    this.touristService.userData.subscribe((user)=>{
      this.user=user;
      console.log(user);
      this.uid = this.authService.generateUid(user.firstName, user.lastName);
      // let ref: AngularFireStorageReference = this.authService.afStorage.ref('/images/' + this.uid);
      // ref.getDownloadURL().subscribe(res => {
      //   console.log(res);
      //   this.photoURL = res;
      //   
      // })
      this.photoUrl = user.photoUrl;
      this.isLoading = false;
    })
    this.touristService.guides.subscribe((guides) => {
      this.guides = guides;
    })
    this.afs.collection<UserData>('users', ref => ref.where('guide','==',true)).valueChanges()
    .subscribe(guides => {
      this.guidesUserArray = guides;
      for(let i=0 ; i < this.guidesUserArray.length ; i++){
        this.guidesPhotos.push(this.guidesUserArray[i].photoUrl);
      }
      this.isLoadingGuides = false;
    })
  }

  gotoEditProfile() {
    this.router.navigate(['/edit-profile-tourist', this.uid]);
  }
}
