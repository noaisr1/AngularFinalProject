import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService, UserData } from '../../common/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private _userData$: Observable<UserData>;
  private _guideData$ = new Subject<Guide>();
  private _userData: UserData;
  private _guideData: Guide;


  constructor(public authService: AuthService, public afs: AngularFirestore) { 
    authService.CurrentUser().subscribe(res => {
      this.afs.collection<UserData>('users', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(users => {
        this._userData = users[0];
      });
      this.afs.collection<Guide>('guides', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(guides => {
        this._guideData$.next(guides[0]);
      });
  })
}

  get userData(): Observable<UserData> {
    return this.authService.CurrentUser();
  }

  get guideData(): Observable<Guide> {
    return this._guideData$.asObservable();
  }
  getGuideData() {
    this._guideData$.next(this._guideData);
  }

}

export class Guide {
  uid?: string;
  email: string;
  age: number;
  tourismTypes: string[];
  languages: string[];
  hasPoliceCertification: boolean;
  stars: number | 0;
  reviews: string[]; // Array of reviews's uids.
}