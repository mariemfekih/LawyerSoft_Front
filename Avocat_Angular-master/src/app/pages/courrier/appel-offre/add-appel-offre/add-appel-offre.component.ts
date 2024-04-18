import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-add-appel-offre',
  templateUrl: './add-appel-offre.component.html',
  styleUrls: ['./add-appel-offre.component.scss']
})
export class AddAppelOffreComponent implements OnInit {

  constructor(private courrierService:CourrierService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(appOffre:any){
    this.courrierService.addAppelOffre(appOffre).subscribe(
    ()=>{
      this.router.navigate(['list-appOffre']);
    },
    (err)=>{
    }
  )

  }

}
