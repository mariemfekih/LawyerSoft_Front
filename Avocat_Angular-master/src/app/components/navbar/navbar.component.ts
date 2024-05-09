import { Component, OnInit, ElementRef } from '@angular/core';
import { RouteInfo } from '../sidebar/sidebar.component'; // Import RouteInfo interface
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;
  public focus: boolean;
  public listTitles: RouteInfo[]; // Define listTitles as an array of RouteInfo
  public location: Location;
  public username: string;

  constructor(location: Location, private element: ElementRef, private router: Router,
              private authenticationService: AuthenticationService) {
    this.location = location;
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  getTitle(): string {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
  
    // Ensure listTitles is defined and not null before accessing its properties
    if (this.listTitles && Array.isArray(this.listTitles)) {
      for (let item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === titlee) {
          return this.listTitles[item].title;
        }
      }
    }
  
    return 'Dashboard';
  }
  

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
  isLoggedIn(): boolean {
    // Implement your logic to check if the user is authenticated
    // For example, check if the user is stored in local storage or has a valid token
    return true; // Return true if authenticated, false otherwise
  }
  
}
