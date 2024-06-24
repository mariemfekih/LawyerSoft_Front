import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from 'src/app/models/fee';
import { FeeService } from 'src/app/services/fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fee',
  templateUrl: './list-fee.component.html',
  styleUrls: ['./list-fee.component.scss']
})
export class ListFeeComponent implements OnInit {

  public fee!: Fee[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedFee: Fee[];
  constructor(private feeService: FeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getFees()
  }
  public getFees() {
    this.feeService.getFees().subscribe(
      (data) => {
        console.log(data)
        this.fee = data;
        this.searchedFee = data;
      }
    );
  }
  public onSearch(): void {
    const searchTermLowerAction = this.searchTerm.toLowerCase();

    if (searchTermLowerAction) {
      this.searchedFee = this.fee.filter(fee => {
        return (
          fee.amount.toString().toLowerCase().includes(searchTermLowerAction) ||
          fee.reference.toLowerCase().includes(searchTermLowerAction)    
        );
      });
    } else {
      this.searchedFee = this.fee.slice();
    }
  }


  onAddFee() {
    this.router.navigateByUrl('/add-fee');
  }

  public deleteFee(idFee: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ces données une fois supprimées!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const actionId: number = Number(idFee); // Convert idFee to number
        if (isNaN(actionId)) {
          console.error('Invalid idFee:', idFee);
          return;
        }

        this.feeService.deleteFee(actionId).subscribe(
          () => {
            this.getFees(); // Refresh the list after deletion
            Swal.fire('Supprimé!', 'Le frais a été supprimé avec succès.', 'success');
          },
          (error) => {
            console.error('Erreur lors de la suppression du frais:', error);
            Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression du frais.', 'error');
          }
        );
      }
    });
  }
  public editFee(fee: Fee) {
    Swal.fire({
      title: 'Modifier Frais',
      html:
        `<input id="reference" class="swal2-input" placeholder="Référence" value="${fee.reference}">` +
        `<input id="amount" class="swal2-input" placeholder="Montant" value="${fee.amount}">` +
        `<input id="date" class="swal2-input" placeholder="Date" value="${fee.date}">` +
        `<input id="remain" class="swal2-input" placeholder="Reste" value="${fee.remain}">`,
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const updatedFee: Fee = {
          idFee: fee.idFee,
          reference: (document.getElementById('reference') as HTMLInputElement).value,
          amount: Number((document.getElementById('amount') as HTMLInputElement).value),
          date: (document.getElementById('date') as HTMLInputElement).value,
          remain: (document.getElementById('remain') as HTMLInputElement).value
        };
        this.updateFee(updatedFee);
      }
    });
  }

  private updateFee(updatedFee: Fee) {
    this.feeService.updateFee(updatedFee.idFee, updatedFee).subscribe(
      (response) => {
        this.getFees(); // Refresh the list after update
        Swal.fire('Modifié!', 'Le frais a été mis à jour avec succès.', 'success');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du frais:', error);
        Swal.fire('Erreur!', 'Une erreur est survenue lors de la mise à jour du frais.', 'error');
      }
    );
  }



 /*Pagination*/
 getTotalPages() {
  if (!this.fee || !Array.isArray(this.fee)) {
      return 0;  }
  const totalItems = this.fee.length;
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
    showFeeDetails(fee: Fee) {
      Swal.fire({
        title: `<strong>Détails de l'honoraire</strong>`,
        html: `
          <p><strong>Reference:</strong> ${fee.reference}</p>
          <p><strong>Montant Total:</strong> ${fee.amount}</p>
          <p><strong>Reste à payer:</strong> ${fee.remain}</p>
           <p><strong>Date:</strong> ${fee.date}</p>

        `,
        icon: 'info',
        confirmButtonText: 'Fermer'
      });
    }
}