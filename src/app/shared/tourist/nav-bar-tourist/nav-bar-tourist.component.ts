import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';

@Component({
  selector: 'app-nav-bar-tourist',
  templateUrl: './nav-bar-tourist.component.html',
  styleUrls: ['./nav-bar-tourist.component.css']
})
export class NavBarTouristComponent implements OnInit {
  @Output() gotoEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() gotoHomePageEvent: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  gotoEditProfile() {
    this.gotoEditEvent.emit();
  }

  gotoHomePage() {
    this.gotoHomePageEvent.emit();
  }
}
