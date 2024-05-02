import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { RouteInfo } from '../../components/sidebar/sidebar.component';


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
export const DASHBOARD_ROUTES: RouteInfo[] = [
 // { path: '/list-user', title: 'Utilisateurs',  icon:'ni-single-02 text-primary', class: '' },
  { path: '/list-case', title: 'Affaires',  icon:'ni-briefcase-24 text-primary', class: '' },
  { path: '/list-court', title: 'Tribunaux',  icon:'ni-briefcase-24 text-primary', class: '' },
  { path: '/list-auxiliary', title: 'Auxiliaires',  icon:'ni-briefcase-24 text-primary', class: '' },


  { path: '/appointment', title: 'Calendrier',  icon:'ni-building text-blue', class: '' },
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
