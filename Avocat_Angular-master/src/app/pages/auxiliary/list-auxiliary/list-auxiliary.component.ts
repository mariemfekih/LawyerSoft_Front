import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auxiliary } from 'src/app/models/auxiliary';
import { StringResult } from 'src/app/models/dto/stringResult';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import {Report } from 'src/app/models/dto/report'
@Component({
  selector: 'app-list-auxiliary',
  templateUrl: './list-auxiliary.component.html',
  styleUrls: ['./list-auxiliary.component.scss']
})
export class ListAuxiliaryComponent implements OnInit {

  public auxiliary!: Auxiliary[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedAuxiliary: Auxiliary[];

  displayDeleteStyle: string = 'none'; 
    idAuxiliary:number;

  report:Report={name:''};
  reportName: StringResult = new StringResult();
  userId:number;
  constructor(private route: ActivatedRoute,
    private auxiliaryService: AuxiliaryService,
              private router: Router) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('id')!);
    this.idAuxiliary = this.route.snapshot.params['idAuxiliary'];
    this.getAuxiliaries();
  }
  printAuxiliary() {
    this.report.name = 'auxiliary';
    this.auxiliaryService.printAuxiliary(this.report).subscribe(
      res => {
        this.reportName = res;
        const pdfPath = `assets/reports/${this.reportName.name}`; // Using string interpolation
        
        window.open(pdfPath, '_blank');
        console.log('PDF generated');
      },
      error => {
        console.error('Error generating PDF:', error);
      }
    );
  }
  

  public getAuxiliaries() {
    this.auxiliaryService.getAuxiliariesByUserId(this.userId).subscribe(
      (data) => {
        console.log(data)
        this.auxiliary = data;
        this.searchedAuxiliary = data;
      }
    );
  }



  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerAuxiliary = this.searchTerm.toLowerCase();

    if (searchTermLowerAuxiliary) {
      this.searchedAuxiliary = this.auxiliary.filter(auxiliary => {
        return (
          auxiliary.firstName.toLowerCase().includes(searchTermLowerAuxiliary) ||
          auxiliary.lastName.toLowerCase().includes(searchTermLowerAuxiliary) ||
          auxiliary.cin.toString().toLowerCase().includes(searchTermLowerAuxiliary) ||
          auxiliary.email.toLowerCase().includes(searchTermLowerAuxiliary) ||
          auxiliary.city.toLowerCase().includes(searchTermLowerAuxiliary) ||
          auxiliary.phone.toString().toLowerCase().includes(searchTermLowerAuxiliary)||
          auxiliary.birthDate.toString().toLowerCase().includes(searchTermLowerAuxiliary) ||
          auxiliary.job.toLowerCase().includes(searchTermLowerAuxiliary) 
        );
      });
    } else {
      this.searchedAuxiliary = this.auxiliary.slice();
    }
  }

  onAddAuxiliary() {
    this.router.navigateByUrl('/add-auxiliary');
  }

  public onDeleteAuxiliary(auxiliary: Auxiliary) {
    const auxiliaryId: number = Number(auxiliary.idAuxiliary); 
    if (isNaN(auxiliaryId)) {
        console.error('Invalid idAuxiliary:', auxiliary.idAuxiliary);
        return;  
    }

    this.auxiliaryService.deleteAuxiliary(auxiliaryId).subscribe(
        () => {
            this.getAuxiliaries();
            console.log("auxiliaire supprimé"); 
            this.closeDeletePopup();
        },

        (error) => {
            console.error("erreur", error);
        }
    );
}

/**
Delete PopUp
 */
  openDeletePopup(idAuxiliary: number) 
  {
    this.idAuxiliary = idAuxiliary;
    this.displayDeleteStyle = 'block';
  }
  closeDeletePopup() {
    this.displayDeleteStyle = 'none'; 
  }



  /*Pagination*/
  getTotalPages() {
    if (!this.auxiliary || !Array.isArray(this.auxiliary)) {
        return 0;  }
    const totalItems = this.auxiliary.length;
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
