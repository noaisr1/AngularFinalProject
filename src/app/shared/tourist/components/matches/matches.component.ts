import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService, UserData } from 'src/app/shared/common/auth/auth.service';
import { Tourist, TouristService } from '../../service/tourist.service';
import { ColDef } from 'ag-grid-community';
import { Guide } from 'src/app/shared/guide/service/guide.service';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { User } from 'firebase';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  subs: Subscription[] = [];
  students: any[] = [];
  headers = ["Name","Class","Course","Grade"];
  public user: UserData;
  public tourist: Tourist;
  public isLoading = true;
  public guidesArray: Guide[] = [];
  uid: any;
  rowsData: {Name: string, Rating: number, Languages: string[]}[] = [];
  columnDefs: ColDef[] = [
    { field: 'Name' },
    { field: 'Rating' },
    { field: 'Languages' }
  ];
  constructor(public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private touristService: TouristService) {
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.uid = params['uid'];
    })
    this.afs.collection<Tourist>('tourists').doc(this.uid)
    .valueChanges()
    .subscribe(tourist => {
      this.tourist = tourist;
      this.touristService.getBestMatches(tourist);
      this.afs.collection<UserData>('users').doc(this.uid).valueChanges()
      .subscribe(user => {
        this.user = user;
      });
      this.subs.push(this.touristService.getRowData().subscribe( (rows) => {
        this.rowsData = rows;
    
        this.isLoading = false;
      }))
    });
  }


  gotoEditProfile() {
    this.router.navigate(['/edit-profile-tourist', this.uid]);
  }
  
  gotoHomePage() {
    this.router.navigate(['dashboard-tourist', this.uid]);
  }

  gotoGuideProfile(guideUid: string) {
    this.router.navigate(['/guide-profile-readonly', this.uid, guideUid]);
  }

}



