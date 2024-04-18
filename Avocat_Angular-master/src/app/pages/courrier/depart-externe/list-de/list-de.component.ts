import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { DepartExterneDto } from 'src/app/models/depart-externe';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-list-de',
  templateUrl: './list-de.component.html',
  styleUrls: ['./list-de.component.scss']
})
export class ListDEComponent implements OnInit {

  public departExterne!: DepartExterneDto[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedCourrier: DepartExterneDto[];

  constructor(private courrierService: CourrierService,
    private router: Router) { }

  ngOnInit(): void {
    this.listCourriersDe();
  }

  //Afficher la liste des courriers DE
  public listCourriersDe() {
    this.courrierService.listDepartExterne().subscribe(
      (data) => {
        this.departExterne = data;
        this.searchedCourrier = data;
      }
    );
  }

  //Supprimer un courrier DE donné par son id
  public deleteCourrier(numeroCourrier: any) {
    this.courrierService.deleteCourrier(numeroCourrier).subscribe(
      () => {
        this.listCourriersDe();
        console.log("supp");
      }); (error) => {
        console.log("erreur");
      }

  }


  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedCourrier = this.departExterne.filter(de => {
        return (
          de.numeroCourrier.toLowerCase().includes(searchTermLowerCase) ||
          de.dateCourrier.toLowerCase().includes(searchTermLowerCase) ||
          de.typeCourrier.toLowerCase().includes(searchTermLowerCase) ||
          de.expediteur.toLowerCase().includes(searchTermLowerCase) ||
          de.destinataire.toLowerCase().includes(searchTermLowerCase) ||
          de.degre.toLowerCase().includes(searchTermLowerCase) ||
          de.etatAvancement.toLowerCase().includes(searchTermLowerCase)
        );
      });
    } else {
      this.searchedCourrier = this.departExterne.slice();
    }
  }

  /*Redirection add*/
  onAdd() {
    this.router.navigateByUrl('/add-de');
  }


  /*Pagination*/
  getTotalPages() {
      const totalItems = this.departExterne.length;
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
