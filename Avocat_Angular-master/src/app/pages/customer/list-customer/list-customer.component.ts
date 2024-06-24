import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  public customer!: Customer[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedCustomer: Customer[];

  displayDeleteStyle: string = 'none'; 
  idCustomer: number;

  userId: number;
  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('id')!);
    this.getCustomers(this.userId);
  }

  public getCustomers(userId: number) {
    this.customerService.getUserCustomers(userId).subscribe(
      (data) => {
        console.log(userId);
        console.log(data);
        this.customer = data;
        this.searchedCustomer = data;
      }
    );
  }

  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerCustomer = this.searchTerm.toLowerCase();
  
    if (searchTermLowerCustomer) {
      this.searchedCustomer = this.customer.filter(customer => {
        return (
          customer.firstName.toLowerCase().includes(searchTermLowerCustomer) ||
          customer.lastName.toLowerCase().includes(searchTermLowerCustomer) ||
          customer.cin.toString().toLowerCase().includes(searchTermLowerCustomer) ||
          customer.email.toLowerCase().includes(searchTermLowerCustomer) ||
          customer.city.toLowerCase().includes(searchTermLowerCustomer) ||
          customer.phone.toString().toLowerCase().includes(searchTermLowerCustomer) ||
          customer.birthDate.toString().toLowerCase().includes(searchTermLowerCustomer) ||
          customer.job.toLowerCase().includes(searchTermLowerCustomer) ||
          customer.gender.toString().toLowerCase().includes(searchTermLowerCustomer)
        );
      });
    } else {
      this.searchedCustomer = [...this.customer];
    }
  }

  onAddCustomer() {
    this.router.navigateByUrl('/add-customer');
  }

  public onDeleteCustomer(customer: Customer) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ces données une fois supprimées!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const customerId: number = Number(customer.idCustomer);
        if (isNaN(customerId)) {
          console.error('Invalid idCustomer:', customer.idCustomer);
          return;
        }

        this.customerService.deleteCustomer(customerId).subscribe(
          () => {
            this.getCustomers(this.userId);
            console.log("client supprimé");
            this.closeDeletePopup();
            Swal.fire('Supprimé!', 'Le client a été supprimé avec succès.', 'success');
          },
          (error) => {
            console.error("erreur", error);
            Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression du client.', 'error');
          }
        );
      }
    });
  }

  openDeletePopup(idCustomer: number) {
    this.idCustomer = idCustomer;
    this.displayDeleteStyle = 'block';
  }

  closeDeletePopup() {
    this.displayDeleteStyle = 'none';
  }

  /*Pagination*/
  getTotalPages() {
    if (!this.customer || !Array.isArray(this.customer)) {
      return 0;
    }
    const totalItems = this.customer.length;
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

  exportToPDF() {
    const doc = new jsPDF();
    const data = this.customer.map(client => {
      return {
        Nom: client.firstName,
        Prénom: client.lastName,
        Email: client.email,
        Cin: client.cin,
        Télephone: client.phone,
        Métier: client.job,
        'Date de naissance': client.birthDate,
        Ville: client.city
      };
    });

    const header = [['Nom', 'Prénom', 'Email', 'Cin','Télephone','Métier','Date de naissance','ville']];
    const rows = data.map(obj => Object.keys(obj).map(key => obj[key]));

    (doc as any).autoTable({
      head: header,
      body: rows,
      theme: 'plain',
      didDrawCell: (data: { column: { index: any; }; }) => { 
        console.log('pdf done')
      }
    });
    doc.output('dataurlnewwindow');
    doc.save('clients.pdf');
  }

  showCustomerDetails(customer: Customer) {
    Swal.fire({
      title: `<strong>Détails du Client</strong>`,
      html: `
        <p><strong>Prénom:</strong> ${customer.firstName}</p>
        <p><strong>Nom:</strong> ${customer.lastName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>CIN:</strong> ${customer.cin}</p>
        <p><strong>Téléphone:</strong> ${customer.phone}</p>
        <p><strong>Métier:</strong> ${customer.job}</p>
        <p><strong>Date de naissance:</strong> ${customer.birthDate}</p>
        <p><strong>Ville:</strong> ${customer.city}</p>
        <p><strong>Genre:</strong> ${customer.gender ? 'Homme' : 'Femme'}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Fermer'
    });
  }
  
}
