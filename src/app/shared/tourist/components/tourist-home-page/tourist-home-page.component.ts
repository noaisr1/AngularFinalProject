import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable, forkJoin, Subject} from 'rxjs';
import { AuthService, UserData } from 'src/app/shared/common/auth/auth.service';
import { Guide } from 'src/app/shared/guide/service/guide.service';
import { TouristService } from '../../service/tourist.service';

@Component({
  selector: 'app-tourist-home-page',
  templateUrl: './tourist-home-page.component.html',
  styleUrls: ['./tourist-home-page.component.css']
})
export class TouristHomePageComponent implements OnInit {
  @Input() photoURL: string;
  @Input() user: UserData;
  @Input() uid: any;
  @Input() guidesUserArray: UserData[] = [];
  @Input() guides: Guide[] = [];
  @Input() guidesPhotos: string[] = [];
  @Output() gotoEditProfileEvent: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService, 
              private router: Router,
              private touristService: TouristService) { 
  }

  ngOnInit(): void {
    
  }

  findAMatch() {
    this.router.navigate(['/matches', this.uid])
  }

  gotoEditProfile() {
    this.gotoEditProfileEvent.emit();
  }

  gotoGuideProfile(guideUid: string) {
    console.log(guideUid);
    this.router.navigate(['/guide-profile-readonly', this.uid, guideUid]);
  }

}
