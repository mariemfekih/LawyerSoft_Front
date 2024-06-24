import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {RouteInfo} from '../../components/sidebar/sidebar.component';


// core components
import {chartExample1, chartExample2, chartOptions, parseOptions} from "../../variables/charts";
import {Router} from '@angular/router';
import {Role} from "../../models/type/role";
import { CaseService } from 'src/app/services/case.service';
import { CaseState } from 'src/app/models/type/caseState';
import { Case } from 'src/app/models/case';
import { CaseStateTranslator } from 'src/app/models/type/TranslatorFr/caseStateTranslator';
export const DASHBOARD_ROUTES: RouteInfo[] = [
   { path: '/list-user', title: 'Utilisateurs',  icon:'ni-single-02 text-default', class: '',roles: [Role.ADMIN] },
   {
    path: '/list-customer',
    title: 'Client',
    icon: 'ni-single-02 text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },{
    path: '/list-case',
    title: 'Affaires',
    icon: 'ni-briefcase-24 text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },
  {
    path: '/list-court',
    title: 'Tribunaux',
    icon: 'ni-vector text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.ADMIN]
  },  
  {
    path: '/list-auxiliary',
    title: 'Auxiliaire',
    icon: 'ni-single-02 text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },
  {
    path: '/add-agent/:id',
    title: 'Agent',
    icon: 'ni-single-02 text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },


  {
    path: '/appointment',
    title: 'Calendrier',
    icon: 'ni-calendar-grid-58 text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },

  {
    path: '/list-folder',
    title: 'Dossier',
    icon: 'ni-folder-17 text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },
  {
    path: '/info-contract',
    title: 'Contrat',
    icon: 'ni-collection text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },
 {
    path: '/list-action',
    title: 'Action',
    icon: 'ni-building text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  },
  {
    path: '/list-fee',
    title: 'Honoraire',
    icon: 'ni-diamond text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  }
  /*,
  {
    path: '/icons',
    title: 'Icons',
    icon: 'ni-building text-default',
    class: '',
    dashboardType: 'other',
    roles: [Role.LAWYER]
  }*/
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
  idUser: number;
  totalCases: number;
  percentageChangeCases: number;
  cases: Case[] = [];
  caseStatesCount: { [key: string]: number } = {
    INITIATED: 0,
    IN_PROGRESS: 0,
    FINISHED: 0,
    CLOSED: 0
  };

  constructor(private router: Router, private caseService: CaseService) { }

ngOnInit() {
  this.idUser = JSON.parse(localStorage.getItem('id')!);

  // Retrieve the total number of cases for the current month for the user
  this.caseService.getTotalCasesByUserMonth(this.idUser).subscribe(totalCases => {
    this.totalCases = totalCases;
  });

  // Retrieve the percentage change in total cases for the user
  this.caseService.getPercentageChangeInTotalCasesByUser(this.idUser).subscribe(percentageChangeCases => {
    this.percentageChangeCases = percentageChangeCases;
  });

  // Retrieve the list of cases for the user
  this.caseService.getUserCases(this.idUser).subscribe(cases => {
    this.cases = cases;

    // Update the case states count object with actual data
    this.caseStatesCount = this.cases.reduce((acc, caseItem) => {
      if (caseItem.state in acc) {
        acc[caseItem.state]++;
      } else {
        acc[caseItem.state] = 1;
      }
      return acc;
    }, {
      'INITIATED': 0,
      'IN_PROGRESS': 0,
      'FINISHED': 0,
      'CLOSED': 0
    });

    // Initialize the pie chart with actual data
    this.initPieChart();
  });
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

  getCurrentMonthTotalCases() {
    this.caseService.getTotalCasesByUserMonth(this.idUser).subscribe(totalCases => {
      this.totalCases = totalCases;
    });
  }

  getPercentageChangeInTotalCases() {
    this.caseService.getPercentageChangeInTotalCasesByUser(this.idUser).subscribe(percentageChangeCases => {
      this.percentageChangeCases = percentageChangeCases;
    });
  }

  getCases() {
    this.caseService.getUserCases(this.idUser).subscribe(cases => {
      this.cases = cases;
      this.calculateCaseStatesCount();
    });
  }

  calculateCaseStatesCount() {
    this.cases.forEach(caseItem => {
      if (caseItem.state in this.caseStatesCount) {
        this.caseStatesCount[caseItem.state]++;
      }
    });
  }
  translateCaseState(state: CaseState): string {
    return CaseStateTranslator.translateFrState(state);
  }
  getProgressBarWidth(state: CaseState): string {
    switch (state) {
      case CaseState.INITIATED:
        return '25%';
      case CaseState.IN_PROGRESS:
        return '50%';
      case CaseState.FINISHED:
        return '75%';
      case CaseState.CLOSED:
        return '100%';
      default:
        return '0%';
    }
  }


  getProgressBarClass(state: CaseState): string {
    switch (state) {
      case CaseState.INITIATED:
        return 'bg-gradient-warning';
      case CaseState.IN_PROGRESS:
        return 'bg-gradient-info';
      case CaseState.FINISHED:
        return 'bg-gradient-primary';
      case CaseState.CLOSED:
        return 'bg-gradient-success';
      default:
        return '';
    }
  }

  
  initPieChart() {
    const ctx = document.getElementById('etatAffairePieChart') as HTMLCanvasElement;
    if (ctx) {
      const etatAffairePieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Initiated', 'In Progress', 'Finished', 'Closed'],
          datasets: [{
            data: [
              this.caseStatesCount['INITIATED'],
              this.caseStatesCount['IN_PROGRESS'],
              this.caseStatesCount['FINISHED'],
              this.caseStatesCount['CLOSED']
            ],
            backgroundColor: [
              'rgba(254, 176, 25, 0.5)', // bg-gradient-warning
              'rgba(54, 162, 235, 0.5)', // bg-gradient-info
              'rgba(66, 133, 244, 0.5)', // bg-gradient-primary
              'rgba(76, 175, 80, 0.5)' // bg-gradient-success
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4CAF50'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: 'top'
          }
        }
      });
    }
  }

}


