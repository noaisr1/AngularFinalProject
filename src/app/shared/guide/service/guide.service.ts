import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthService, UserData } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private _userData$: Observable<UserData>;
  private _userData: UserData;
  private _guideData: Guide;


  constructor(public authService: AuthService, public afs: AngularFirestore) { 
    authService.CurrentUser().subscribe(res => {
    this.afs.collection<Guide>('guides', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(guides => {
        this._guideData = guides[0];  
        console.log(this._guideData);
      });
      this.afs.collection<UserData>('users', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(users => {
        this._userData = users[0];
        console.log(this._userData);
      });
  })
}

  get userData(): Observable<UserData> {
    return this.authService.CurrentUser();
  }


}

export class Guide {
  uid?: string;
  email: string;
  age: number;
  tourismTypes: string[];
  languages: string[];
  hasPoliceCertification: boolean;
}