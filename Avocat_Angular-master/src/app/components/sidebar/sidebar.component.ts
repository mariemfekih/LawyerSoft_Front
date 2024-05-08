import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {DASHBOARD_ROUTES} from 'src/app/pages/dashboard/dashboard.component';
import {User} from "../../models/user";
import {Role} from "../../models/type/role";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  dashboardType?: string;
  roles: Role[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: RouteInfo[];
  public isCollapsed = true;

  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // Check if the current component is DashboardAdminComponent
    const isAdminDashboard = this.router.url.includes('dashboard-admin');

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

    this.authenticationService.getCurrentUser().subscribe(user => {
      this.currentUser = user;

      // Assign the appropriate routes based on the component
      this.menuItems = DASHBOARD_ROUTES.filter(item => item.roles.includes(user.role));
    });

  }

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
