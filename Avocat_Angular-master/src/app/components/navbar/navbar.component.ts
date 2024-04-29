import { Component, OnInit, ElementRef } from '@angular/core';
import { RouteInfo } from '../sidebar/sidebar.component'; // Import RouteInfo interface
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { DASHBOARD_ROUTES } from 'src/app/pages/dashboard/dashboard.component'; // Import DASHBOARD_ROUTES
import { DASHBOARD_ADMIN_ROUTES } from 'src/app/pages/dashboard-admin/dashboard-admin.component'; // Import DASHBOARD_ADMIN_ROUTES

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
    const isAdminDashboard = this.router.url.includes('dashboard-admin');
    this.listTitles = isAdminDashboard ? DASHBOARD_ADMIN_ROUTES : DASHBOARD_ROUTES; 
    this.username = localStorage.getItem('username');
  }

  getTitle(): string {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
