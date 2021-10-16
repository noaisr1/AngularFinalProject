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
  private guides$ = new Subject<Guide[]>();
  private rowData$ = new Subject<any[]>();



  constructor(public authService: AuthService, public afs: AngularFirestore) { 
    authService.CurrentUser().subscribe(res => {
    this.afs.collection<Tourist>('tourists', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(tourists => {
        this._touristData = tourists[0];
        this.touristSubject.next(tourists[0])  
      });
      this.afs.collection<UserData>('users', ref => ref.where('email','==',res.email)).valueChanges()
      .subscribe(users => {
        this._userData = users[0];
        this.userSubject.next(users[0]);
      });
  })
}

  get userData(): Observable<UserData> {
    return this.userSubject.asObservable();
  }

  get guides(): Observable<Guide[]> {
    return this.guides$.asObservable();
  }

  getListOfGuides() {
    this.afs.collection<Guide>('guides').valueChanges()
          .subscribe(guide => {
            this.guides$.next(guide); // next is pushing the data to subscribers. 
          });
  }

  getBestMatches(tourist: Tourist) {
    let language = '';
    let tourismType = '';
    let rowsArray: any[] = [];
    this.afs.collection<Guide>('guides')
      .valueChanges()
      .subscribe(guides => {
        console.log(guides);
        guides.forEach((guide) => {
        language = guide.languages.find((language: string) => tourist.language == language);
        tourismType = guide.tourismTypes.find((tourismType: string) => tourist.tourismType == tourismType);
        if (language !== undefined && tourismType !== undefined) {
          rowsArray.push({ Name: guide.uid, Rating: guide.stars, Languages: guide.languages })
        }
      });
      this.rowData$.next(rowsArray);
    });
  }

  getRowData(): Observable<any[]> {
    return this.rowData$.asObservable();
  }
}

export class Tourist {
  uid?: string;
  email: string;
  tourismType: string;
  groupType: string;
  language: string;
}