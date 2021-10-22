import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { UserData } from 'src/app/shared/common/auth/auth.service';
import { Guide } from 'src/app/shared/guide/service/guide.service';

@Component({
  selector: 'app-guide-profile-readonly',
  templateUrl: './guide-profile-readonly.component.html',
  styleUrls: ['./guide-profile-readonly.component.css']
})
export class GuideProfileReadonlyComponent implements OnInit {
  uid: string;
  guide: Guide;
  selectedLanguages: string[] = [];
  selectedTypes: string[] = [];
  user: UserData;
  rate: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.uid = params['uid'];
    })
    this.afs.collection<Guide>('guides').doc(this.uid).valueChanges()
      .subscribe(guide => {
        this.guide = guide;
        this.selectedLanguages = guide.languages;
        this.selectedTypes = guide.tourismTypes;
        this.rate = guide.stars;
        this.afs.collection<UserData>('users').doc(this.uid).valueChanges()
          .subscribe(user => {
            this.user = user;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.phoneNumber = user.phoneNumber;
          });
      });
  }
}
