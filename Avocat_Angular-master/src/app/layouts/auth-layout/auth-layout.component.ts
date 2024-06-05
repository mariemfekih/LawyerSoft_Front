import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;
  public showNavLinks = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    const body = document.getElementsByTagName("body")[0];
    //body.classList.add("bg-default");

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavLinks = this.router.url === '/register' || this.router.url === '/login';
      }
      this.isCollapsed = true;
    });
  }

  ngOnDestroy() {
    const html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
