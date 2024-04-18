import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArriveeExterneDto } from 'src/app/models/arrivee-externe';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-list-ae',
  templateUrl: './list-ae.component.html',
  styleUrls: ['./list-ae.component.scss']
})
export class ListAeComponent implements OnInit {

  public arriveeExterne!: ArriveeExterneDto[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string;
  searchedCourrier: ArriveeExterneDto[];

  constructor(private courrierService: CourrierService,
    private router: Router) { }

  ngOnInit(): void {
    this.listCourriersAe();
  }

  //Afficher la liste des courriers AE
  public listCourriersAe() {
    this.courrierService.listArriveeExterne().subscribe(
      (data) => {
        this.arriveeExterne = data;
        this.searchedCourrier = data;
      }
    );
  }

  //Supprimer un courrier AE donné par son id
  public deleteCourrier(numeroCourrier: any) {
    this.courrierService.deleteCourrier(numeroCourrier).subscribe(
      () => {
        this.listCourriersAe();
        console.log("supp");
      }); (error) => {
        console.log("erreur");
      }

  }


  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedCourrier = this.arriveeExterne.filter(ae => {
        return (
          ae.numeroCourrier.toLowerCase().includes(searchTermLowerCase) ||
          ae.dateCourrier.toLowerCase().includes(searchTermLowerCase) ||
          ae.dateOrigine.toLowerCase().includes(searchTermLowerCase) ||
          ae.typeCourrier.toLowerCase().includes(searchTermLowerCase) ||
          ae.parVoie.toLowerCase().includes(searchTermLowerCase) ||
          ae.lien.toLowerCase().includes(searchTermLowerCase) ||
          ae.expediteur.toLowerCase().includes(searchTermLowerCase) ||
          ae.degre.toLowerCase().includes(searchTermLowerCase) ||
          ae.etatAvancement.toLowerCase().includes(searchTermLowerCase)
        );
      });
    } else {
      this.searchedCourrier = this.arriveeExterne.slice();
    }
  }

  /*Redirection add*/
  onAdd() {
    this.router.navigateByUrl('/add-ae');
  }


  /*Pagination*/
  getTotalPages() {
      const totalItems = this.arriveeExterne.length;
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
