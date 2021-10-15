import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, forkJoin} from 'rxjs';
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
  @Input() guidesArray: Guide[] = [];
  @Input() guidesPhotos: string[] = [];
  @Output() gotoEditProfileEvent: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService) { 
  }

  ngOnInit(): void {
    
  }

  findAMatch() {

  }

  gotoEditProfile() {
    this.gotoEditProfileEvent.emit();
  }

}
