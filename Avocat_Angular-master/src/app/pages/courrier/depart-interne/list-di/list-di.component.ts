import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { DepartExterneDto } from 'src/app/models/depart-externe';
import { DepartInterneDto } from 'src/app/models/depart-interne';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-list-di',
  templateUrl: './list-di.component.html',
  styleUrls: ['./list-di.component.scss']
})
export class ListDiComponent implements OnInit {

  public departInterne!: DepartInterneDto[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedCourrier: DepartInterneDto[];

  constructor(private courrierService: CourrierService,
    private router: Router) { }

  ngOnInit(): void {
    this.listCourriersDi();
  }

  //Afficher la liste des courriers DI
  public listCourriersDi() {
    this.courrierService.listDepartInterne().subscribe(
      (data) => {
        this.departInterne = data;
        this.searchedCourrier = data;
      }
    );
  }

  //Supprimer un courrier DE donné par son id
  public deleteCourrier(numeroCourrier: any) {
    this.courrierService.deleteCourrier(numeroCourrier).subscribe(
      () => {
        this.listCourriersDi();
        console.log("supp");
      }); (error) => {
        console.log("erreur");
      }
  }


  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedCourrier = this.departInterne.filter(di => {
        return (
          di.numeroCourrier.toLowerCase().includes(searchTermLowerCase) ||
          di.dateCourrier.toLowerCase().includes(searchTermLowerCase) ||
          di.typeCourrier.toLowerCase().includes(searchTermLowerCase) ||
          di.parVoie.toLowerCase().includes(searchTermLowerCase) ||
          di.destinataire.toLowerCase().includes(searchTermLowerCase) ||
          di.degre.toLowerCase().includes(searchTermLowerCase) ||
          di.etatAvancement.toLowerCase().includes(searchTermLowerCase)
        );
      });
    } else {
      this.searchedCourrier = this.departInterne.slice();
    }
  }

  /*Redirection add*/
  onAdd() {
    this.router.navigateByUrl('/add-di');
  }


  public selectDossier(numeroCourrier: string) {
    this.router.navigate(['/select-dossier', numeroCourrier]);
  }

  /*Pagination*/
  getTotalPages() {
      const totalItems = this.departInterne.length;
      const itemsPerPage = this.itemsPerPage;
      return Math.ceil(totalItems / itemsPerPage);
  }

  getPages(): number[] {
      let pages: number[] = [];
      const totalPages = this.getTotalPages();
      const currentPage = this.currentPage;
      const maxPages = 5;

        if (totalPages <= maxPages) {
          pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
          const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
          const endPage = Math.min(totalPages, startPage + maxPages - 1);
          pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

          const hasLeftSpill = startPage > 1;
          const hasRightSpill = totalPages - endPage > 0;
          const spillOffset = maxPages - (endPage - startPage + 1);

          if (hasLeftSpill && !hasRightSpill) {
            const extraPages = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
            pages = [...extraPages, ...pages];
          } else if (!hasLeftSpill && hasRightSpill) {
            const extraPages = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
            pages = [...pages, ...extraPages];
          } else if (hasLeftSpill && hasRightSpill) {
            const leftSpill = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
            const rightSpill = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
            pages = [...leftSpill, ...pages, ...rightSpill];
          }
        }

        return pages;
      }

}
