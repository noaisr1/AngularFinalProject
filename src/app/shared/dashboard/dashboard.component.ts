import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.router.events.subscribe((event) => {
      switch(true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    })
   }

  ngOnInit() {

  }

}