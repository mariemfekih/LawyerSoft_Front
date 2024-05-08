import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DASHBOARD_ROUTES } from 'src/app/pages/dashboard/dashboard.component';
import { DASHBOARD_ADMIN_ROUTES } from 'src/app/pages/dashboard-admin/dashboard-admin.component';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  dashboardType?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: RouteInfo[];
  public isCollapsed = true;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // Check if the current component is DashboardAdminComponent
    const isAdminDashboard = this.router.url.includes('dashboard-admin');

    // Assign the appropriate routes based on the component
    this.menuItems = isAdminDashboard ? DASHBOARD_ADMIN_ROUTES : DASHBOARD_ROUTES;

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
