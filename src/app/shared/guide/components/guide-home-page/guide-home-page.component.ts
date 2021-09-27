import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { AuthService, UserData } from 'src/app/shared/common/auth/auth.service';
import { GuideService } from '../../service/guide.service';

@Component({
  selector: 'app-guide-home-page',
  templateUrl: './guide-home-page.component.html',
  styleUrls: ['./guide-home-page.component.css']
})
export class GuideHomePageComponent implements OnInit {
  public photoURL: string;
  public user: UserData;
  constructor(public guideService: GuideService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.guideService.userData.subscribe(user => {
      this.user = user;
      let photoUid = this.authService.generateUid(user.firstName, user.lastName);
      let ref: AngularFireStorageReference = this.authService.afStorage.ref('/images/' + photoUid);
      ref.getDownloadURL().subscribe(res => {
        console.log(res);
        this.photoURL = res;
      })
    })
  }

}
