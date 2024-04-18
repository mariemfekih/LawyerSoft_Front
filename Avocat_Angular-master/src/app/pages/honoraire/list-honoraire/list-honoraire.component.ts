import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Honoraire } from 'src/app/models/honoraire';
import { HonoraireService } from 'src/app/services/honoraire.service';

@Component({
  selector: 'app-list-honoraire',
  templateUrl: './list-honoraire.component.html',
  styleUrls: ['./list-honoraire.component.scss']
})
export class ListHonoraireComponent implements OnInit {

  public honoraire!: Honoraire[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedHonoraire: Honoraire[];

  constructor(private honoraireService: HonoraireService,
              private router: Router) { }

  ngOnInit(): void {
    this.listHonoraire();
  }

  //Afficher la liste des affaire
  public listHonoraire() {
    this.honoraireService.listHonoraire().subscribe(
      (data) => {
        this.honoraire = data;
        this.searchedHonoraire = data;
      }
    );
  }


  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedHonoraire = this.honoraire.filter(h => {
        return (
          h.titre.toLowerCase().includes(searchTermLowerCase) ||
          h.type.toLowerCase().includes(searchTermLowerCase) ||
          h.reste.toLowerCase().includes(searchTermLowerCase) ||
          h.date.toLowerCase().includes(searchTermLowerCase)     
        );
      });
    } else {
      this.searchedHonoraire = this.honoraire.slice();
    }
  }

  onAddHonoraire() {
    this.router.navigateByUrl('/add-honoraire');
  }

 public removeHonoraire(idHonoraire: any) {
  this.honoraireService.removeHonoraire(idHonoraire).subscribe(
    () => {
      this.listHonoraire();
      console.log("supp"); 
    }); (error) => {
      console.log("erreur");
    }

  }

  /*Generer qrCode */
generateQRCode(honoraire: Honoraire): void {
  this.honoraireService.generateQRCode(honoraire.idHonoraire).subscribe(
    data => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([data]));
      reader.onloadend = () => {
        honoraire.qrCodeImage = reader.result as string;
      };
    },
    error => {
      console.log(error);
    }
  );
}


  /*Pagination*/
  getTotalPages() {
      const totalItems = this.honoraire.length;
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
