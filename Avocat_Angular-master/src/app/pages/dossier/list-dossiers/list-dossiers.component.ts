import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dossier } from 'src/app/models/dossier';
import { DossierService } from 'src/app/services/dossier.service';

@Component({
  selector: 'app-list-dossiers',
  templateUrl: './list-dossiers.component.html',
  styleUrls: ['./list-dossiers.component.scss']
})
export class ListDossiersComponent implements OnInit {

  public dossier!: Dossier[];
  searchTerm: string;
  searchedDossier: Dossier[];
  existingDossiers: string[] = [];

  constructor(private dossierService: DossierService,
              private router: Router) { }

  ngOnInit(): void {
    this.listDossiers();
  }

  //Afficher la liste des dossiers
  public listDossiers() {
    this.dossierService.listDossiers().subscribe(
      (data) => {
        this.dossier = data;
        this.searchedDossier = data;
      }
    );
  }

  onSubmit(addDossier:any){
    this.dossierService.ajouterDossier(addDossier).subscribe(
    ()=>{
      this.listDossiers();
    },
    (err)=>{}
  )
  }

  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedDossier = this.dossier.filter(d => {
        return (
          d.nomDossier.toLowerCase().includes(searchTermLowerCase)
        );
      });
    } else {
      this.searchedDossier = this.dossier.slice();
    }
  }

  ouvrirDossier(idDossier: number) {
    this.router.navigate(['/detail-dossier', idDossier]);
  }


}
