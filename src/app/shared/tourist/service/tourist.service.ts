import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { AuthService, UserData } from '../../common/auth/auth.service';
import { Guide } from '../../guide/service/guide.service';

@Injectable({
  providedIn: 'root'
})
export class TouristService {
  private _userData$: Observable<UserData>;
  private _userData: UserData;
  private _touristData: Tourist;
  private touristSubject = new Subject();
  private userSubject: Subject<UserData> = new Subject();
  private guides$ = new Subject();
  



  constructor(public authService: AuthService, public afs: AngularFirestore) { 
    authService.CurrentUser().subscribe(res => {
    this.afs.collection<Tourist>('tourists', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(tourists => {
        this._touristData = tourists[0];
        this.touristSubject.next(tourists[0])  
        console.log(this._touristData);
      });
      this.afs.collection<UserData>('users', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(users => {
        this._userData = users[0];
        this.userSubject.next(users[0]);
        console.log(this._userData);
      });
  })
}

  get userData(): Observable<UserData> {
    return this.userSubject.asObservable();
  }

  get guides() {
    return this.guides$.asObservable();
  }

  getListOfGuides() {
    this.afs.collection<Guide>('guides').valueChanges()
          .subscribe(guide => {
            this.guides$.next(guide); // next is pushing the data to subscribers. 
          });
  }
    

}

export class Tourist {
  uid?: string;
  email: string;
  tourismType: string;
  groupType: string;
  language: string;
}