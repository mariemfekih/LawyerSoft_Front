import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtTypeTranslator } from 'src/app/models/type/TranslatorFr/courtTypeTranslator';
import { CourtType } from 'src/app/models/type/courtType';
import { Governorate } from 'src/app/models/type/governorate';
import { CourtService } from 'src/app/services/court.service';

@Component({
  selector: 'app-list-court',
  templateUrl: './list-court.component.html',
  styleUrls: ['./list-court.component.scss']
})
export class ListCourtComponent implements OnInit {

  public court!: Court[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedCourt: Court[];



  constructor(private courtService: CourtService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCourts();
  }
  translateCourtType(type: CourtType): string {
    return CourtTypeTranslator.translateFrType(type);
  }
  //Afficher la liste des Court
  public getCourts() {
    this.courtService.getCourts().subscribe(
      (data) => {
        console.log(data)
        this.court = data;
        this.searchedCourt = data;
      }
    );
  }



  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCourt = this.searchTerm.toLowerCase();

    if (searchTermLowerCourt) {
      this.searchedCourt = this.court.filter(court => {
        return (
          court.governorate.toLowerCase().includes(searchTermLowerCourt) ||
          court.adress.toLowerCase().includes(searchTermLowerCourt) ||
          court.type.toLowerCase().includes(searchTermLowerCourt) ||
          court.phone.toString().toLowerCase().includes(searchTermLowerCourt)     
        );
      });
    } else {
      this.searchedCourt = this.court.slice();
    }
  }

  onAddCourt() {
    this.router.navigateByUrl('/add-court');
  }

  public deleteCourt(idCourt: number) {
    const courtId: number = Number(idCourt); // Convert idCourt to number
    if (isNaN(courtId)) {
        console.error('Invalid idCourt:', idCourt);
        return; // Stop execution if idCourt is not a valid number
    }

    this.courtService.deleteCourt(courtId).subscribe(
        () => {
            this.getCourts();
            console.log("supp"); 
        },
        (error) => {
            console.error("erreur", error);
        }
    );
}






  /*Pagination*/
  getTotalPages() {
    if (!this.court || !Array.isArray(this.court)) {
        return 0;  }
    const totalItems = this.court.length;
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
