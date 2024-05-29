import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Case } from 'src/app/models/case';
import { CaseTypeTranslator } from 'src/app/models/type/TranslatorFr/caseTypeTranslator';
import { CaseType } from 'src/app/models/type/caseType';
import { CaseService } from 'src/app/services/case.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CaseState } from 'src/app/models/type/caseState';
import { CaseStateTranslator } from 'src/app/models/type/TranslatorFr/caseStateTranslator';

@Component({
  selector: 'app-list-case',
  templateUrl: './list-case.component.html',
  styleUrls: ['./list-case.component.scss']
})
export class ListCaseComponent implements OnInit {

  public case: Case[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';
  searchedCase: Case[] = [];
  idUser: number = 0;

  constructor(private caseService: CaseService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('id')!);
    if (userId) {
      this.idUser = userId;
      this.getCases(this.idUser);
    }
  }

  public getCases(userId: number) {
    this.caseService.getUserCases(userId).subscribe(
      (data) => {
        console.log(userId);
        console.log(data);
        this.case = data;
        this.searchedCase = data;
      }
    );
  }

  translateCaseType(type: CaseType): string {
    return CaseTypeTranslator.translateFrType(type);
  }

  translateCaseState(state: CaseState): string {
    return CaseStateTranslator.translateFrState(state);
  }

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
    const caseId: number = Number(idCase);
    if (isNaN(caseId)) {
      console.error('Invalid idCase:', idCase);
      return;
    }

    this.caseService.deleteCase(caseId).subscribe(
      () => {
        this.getCases(this.idUser);
        console.log("supp");
      },
      (error) => {
        console.error("erreur", error);
      }
    );
  }

  getTotalPages() {
    if (!this.case || !Array.isArray(this.case)) {
      return 0;
    }
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

  exportToCSV() {
    const csvData = this.convertToCSV(this.case);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'affaire.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  exportToPDF() {
    const doc = new jsPDF();
    const data = this.case.map(aff => {
      return {
        Titre: aff.title,
        'Date Création': aff.creationDate,
        'Date Cloture': aff.closingDate,
        Type: this.translateCaseType(aff.type),
        Etat: this.translateCaseState(aff.state)
      };
    });

    const header = [['Titre', 'Date Création', 'Date Cloture', 'Type','Etat']];
    const rows = data.map(obj => Object.keys(obj).map(key => obj[key]));

    (doc as any).autoTable({
      head: header,
      body: rows,
      theme: 'plain',
      didDrawCell: (data: { column: { index: any; }; }) => { 
        //console.log(data.column.index)
           console.log('pdf done')
       }
    })
    doc.output('dataurlnewwindow');
    doc.save('affaire.pdf');
  }


// Method to toggle case state
public toggleCaseState(caseItem: Case) {
  const states = Object.values(CaseState);
  const currentStateIndex = states.indexOf(caseItem.state);
  const nextStateIndex = (currentStateIndex + 1) % states.length;
  caseItem.state = states[nextStateIndex] as CaseState;
  
  // Optionally save the updated state to the backend
  this.caseService.updateCase(caseItem.idCase, caseItem).subscribe(
    (updatedCase) => {
      console.log('Case state updated', updatedCase);
    },
    (error) => {
      console.error('Error updating case state', error);
    }
  );
}

}
