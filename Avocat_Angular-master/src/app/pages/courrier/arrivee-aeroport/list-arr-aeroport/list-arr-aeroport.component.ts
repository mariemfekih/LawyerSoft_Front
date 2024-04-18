import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArriveeAeroportDto } from 'src/app/models/arrivee-aeroport';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-list-arr-aeroport',
  templateUrl: './list-arr-aeroport.component.html',
  styleUrls: ['./list-arr-aeroport.component.scss']
})
export class ListArrAeroportComponent implements OnInit {

  public arriveeAeroport!: ArriveeAeroportDto[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string;
  searchedCourrier: ArriveeAeroportDto[];

  constructor(private courrierService: CourrierService,
    private router: Router) { }

  ngOnInit(): void {
    this.listCourriersArrAeroport();
  }

  public listCourriersArrAeroport() {
    this.courrierService.listArriveeAeroport().subscribe(
      (data) => {
        this.arriveeAeroport = data;
        this.searchedCourrier = data;
      }
    );
  }

  public deleteCourrier(numeroCourrier: any) {
    this.courrierService.deleteCourrier(numeroCourrier).subscribe(
      () => {
        this.listCourriersArrAeroport();
        console.log("supp");
      }); (error) => {
        console.log("erreur");
      }

  }

  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedCourrier = this.arriveeAeroport.filter(arrAeroport => {
        return (
          arrAeroport.numeroCourrier.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.dateCourrier.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.dateOrigine.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.typeCourrier.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.parVoie.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.lien.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.expediteur.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.degre.toLowerCase().includes(searchTermLowerCase) ||
          arrAeroport.etatAvancement.toLowerCase().includes(searchTermLowerCase)
        );
      });
    } else {
      this.searchedCourrier = this.arriveeAeroport.slice();
    }
  }

  /*Redirection add*/
  onAdd() {
    this.router.navigateByUrl('/add-arrAeroport');
  }


  /*Pagination*/
  getTotalPages() {
      const totalItems = this.arriveeAeroport.length;
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
