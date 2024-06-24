import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.scss']
})
export class ListActionComponent implements OnInit {


  public action!: Action[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedAction: Action[];

  constructor(private actionService: ActionService,
    private router: Router) { }

  ngOnInit(): void {
    this.getActions();
  }

  public getActions() {
    this.actionService.getActions().subscribe(
      (data) => {
        console.log(data)
        this.action = data;
        this.searchedAction = data;
      }
    );
  }
  public onSearch(): void {
    const searchTermLowerAction = this.searchTerm.toLowerCase();

    if (searchTermLowerAction) {
      this.searchedAction = this.action.filter(action => {
        return (
          action.amount.toString().toLowerCase().includes(searchTermLowerAction) ||
          action.description.toLowerCase().includes(searchTermLowerAction) ||
          action.reference.toLowerCase().includes(searchTermLowerAction)    
        );
      });
    } else {
      this.searchedAction = this.action.slice();
    }
  }

  onAddAction() {
    this.router.navigateByUrl('/add-action');
  }
  public deleteAction(idAction: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ces données une fois supprimées!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const actionId: number = Number(idAction); // Convert idAction to number
        if (isNaN(actionId)) {
          console.error('Invalid idAction:', idAction);
          return;
        }

        this.actionService.deleteAction(actionId).subscribe(
          () => {
            this.getActions(); // Refresh the list after deletion
            Swal.fire('Supprimé!', 'L\'action a été supprimée avec succès.', 'success');
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'action:', error);
            Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression de l\'action.', 'error');
          }
        );
      }
    });
  }


 /*Pagination*/
 getTotalPages() {
  if (!this.action || !Array.isArray(this.action)) {
      return 0;  }
  const totalItems = this.action.length;
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
    showActionDetails(action: Action) {
      Swal.fire({
        title: `<strong>Détails de l'action</strong>`,
        html: `
          <p><strong>Reference:</strong> ${action.reference}</p>
          <p><strong>Description:</strong> ${action.description}</p>
          <p><strong>Montant:</strong> ${action.amount}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Fermer'
      });
    }
}
