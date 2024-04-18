import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from 'src/app/models/case';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-list-case',
  templateUrl: './list-case.component.html',
  styleUrls: ['./list-case.component.scss']
})
export class ListCaseComponent implements OnInit {

    public case!: Case[];
    currentPage: number = 1;
    itemsPerPage: number = 5;
    searchTerm: string;
    searchedCase: Case[];
  
    constructor(private caseService: CaseService,
                private router: Router) { }
  
    ngOnInit(): void {
      this.getCases();
    }
  
    //Afficher la liste des Case
    public getCases() {
      this.caseService.getCases().subscribe(
        (data) => {
          console.log(data)
          this.case = data;
          this.searchedCase = data;
        }
      );
    }
  
    //Supprimer un courrier DE donné par son id
   /* public deleteCourrier(numeroCourrier: any) {
      this.courrierService.deleteCourrier(numeroCourrier).subscribe(
        () => {
          this.listCourriersDi();
          console.log("supp");
        }); (error) => {
          console.log("erreur");
        }
    }*/
  
  
    /*Recherche dynamique*/
    public onSearch(): void {
      const searchTermLowerCase = this.searchTerm.toLowerCase();
  
      if (searchTermLowerCase) {
        this.searchedCase = this.case.filter(aff => {
          return (
            aff.title.toLowerCase().includes(searchTermLowerCase) ||
            aff.creationDate.toString().toLowerCase().includes(searchTermLowerCase) ||
            aff.closingDate.toString().toLowerCase().includes(searchTermLowerCase) ||
            aff.type.toLowerCase().includes(searchTermLowerCase) ||
            aff.description.toLowerCase().includes(searchTermLowerCase)     
          );
        });
      } else {
        this.searchedCase = this.case.slice();
      }
    }

    onAddCase() {
      this.router.navigateByUrl('/add-case');
    }

    public deleteCase(idCase: any) {
      const caseId: number = Number(idCase); // Convert idCase to number
      if (isNaN(caseId)) {
          console.error('Invalid idCase:', idCase);
          return; // Stop execution if idCase is not a valid number
      }
  
      this.caseService.deleteCase(caseId).subscribe(
          () => {
              this.getCases();
              console.log("supp"); 
          },
          (error) => {
              console.error("erreur", error);
          }
      );
  }

  


  
  
    /*Pagination*/
    getTotalPages() {
      if (!this.case || !Array.isArray(this.case)) {
          return 0;  }
      const totalItems = this.case.length;
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
  
  /////////////////////////////////tajrtbaaaaa
  exportToCSV() {
    // Convert affaire data to CSV format
    const csvData = this.convertToCSV(this.case);
    
    // Create a new blob containing the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    // Create a link element and trigger a click event to download the CSV file
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'affaire.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Function to convert data to CSV format
  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }
  }
