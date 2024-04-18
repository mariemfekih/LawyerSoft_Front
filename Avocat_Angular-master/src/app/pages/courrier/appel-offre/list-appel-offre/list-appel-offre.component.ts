import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppelOffreDto } from 'src/app/models/appel-offre';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-list-appel-offre',
  templateUrl: './list-appel-offre.component.html',
  styleUrls: ['./list-appel-offre.component.scss']
})
export class ListAppelOffreComponent implements OnInit {

  appelOffre!:AppelOffreDto[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string;
  searchedCourrier: AppelOffreDto[];

  constructor(private courrierService: CourrierService,
    private router: Router) { }

  ngOnInit(): void {
    this.listCourriersAppelOffre();
  }

  public listCourriersAppelOffre() {
    this.courrierService.listAppelOffre().subscribe(
      (data) => {
        this.appelOffre = data;
        this.searchedCourrier = data;
      }
    );
  }

  public deleteCourrier(numeroCourrier: any) {
    this.courrierService.deleteCourrier(numeroCourrier).subscribe(
      () => {
        this.listCourriersAppelOffre();
        console.log("supp");
      }); (error) => {
        console.log("erreur");
      }

  }

  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedCourrier = this.appelOffre.filter(appoffre => {
        return (
          appoffre.numeroCourrier.toLowerCase().includes(searchTermLowerCase) ||
          appoffre.dateCourrier.toLowerCase().includes(searchTermLowerCase) ||
          appoffre.typeCourrier.toLowerCase().includes(searchTermLowerCase) ||
          appoffre.parVoie.toLowerCase().includes(searchTermLowerCase) ||
          appoffre.finDepot.toLowerCase().includes(searchTermLowerCase) ||
          appoffre.expediteur.toLowerCase().includes(searchTermLowerCase) ||
          appoffre.degre.toLowerCase().includes(searchTermLowerCase) ||
          appoffre.etatAvancement.toLowerCase().includes(searchTermLowerCase)
        );
      });
    } else {
      this.searchedCourrier = this.appelOffre.slice();
    }
  }

  /*Redirection add*/
  onAdd() {
    this.router.navigateByUrl('/add-appOffre');
  }


  /*Pagination*/
  getTotalPages() {
      const totalItems = this.appelOffre.length;
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
