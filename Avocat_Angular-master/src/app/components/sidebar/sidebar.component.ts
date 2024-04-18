import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/list-user', title: 'Utilisateurs',  icon:'ni-single-02 text-primary', class: '' },
    /*{ path: '/list-de', title: 'Depart Externe',  icon:'ni-email-83 text-primary', class: '' },
    { path: '/list-di', title: 'Depart Interne',  icon:'ni-email-83 text-primary', class: '' },
    { path: '/list-ae', title: 'Arrivée Externe',  icon:'ni-email-83 text-primary', class: '' },
    { path: '/list-arrAeroport', title: 'Arrivée Aéroport',  icon:'ni-email-83 text-primary', class: '' },
    { path: '/list-appOffre', title: 'Appel d"Offre',  icon:'ni-email-83 text-primary', class: '' },*/
    { path: '/list-case', title: 'Affaires',  icon:'ni-briefcase-24 text-primary', class: '' },
    { path: '/list-court', title: 'Tribunaux',  icon:'ni-briefcase-24 text-primary', class: '' },
    { path: '/list-auxiliary', title: 'Auxiliaires',  icon:'ni-briefcase-24 text-primary', class: '' },


    { path: '/list-honoraire', title: 'Honoraire',  icon:'ni-building text-primary', class: '' },
    { path: '/list-dossiers', title: 'Dossiers',  icon:'ni-folder-17 text-primary', class: '' },
    /*{ path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },*/
    { path: '/icons', title: 'Icons',  icon:'ni-building text-blue', class: '' },

   /* { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-circle-08 text-red', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
