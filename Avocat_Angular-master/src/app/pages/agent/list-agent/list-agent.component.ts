import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss']
})
export class ListAgentComponent implements OnInit {
  id:number;
  constructor(private router:Router) { }

  ngOnInit(): void {
    
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.router.navigate([`/list-agent/${this.id}`]);
  }

}
