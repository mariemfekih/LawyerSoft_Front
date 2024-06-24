import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Folder } from 'src/app/models/folder';

@Component({
  selector: 'app-list-folder',
  templateUrl: './list-folder.component.html',
  styleUrls: ['./list-folder.component.scss']
})
export class ListFolderComponent implements OnInit {
  public folder: Folder[] = [];
  searchTerm: string;
  searchedFolder: Folder[] = [];
  existingFolders: string[] = [];
  idCustomer: number;
  selectedCustomerId: number = null;
  customersWithoutFolders: any[] = [];
  folderName: string = '';
  id: number;

  constructor(private folderService: FolderService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.idCustomer = this.route.snapshot.params['idCustomer'];
    this.getFolders();
    this.getCustomersWithoutFolders();
  }

  getCustomersWithoutFolders() {
    this.customerService.getCustomersWithoutFolders(this.id).subscribe(
      (data) => {
        this.customersWithoutFolders = data;
      },
      (error) => {
        console.error("Error fetching customers without folders:", error);
      }
    );
  }

  public getFolders() {
    this.folderService.getFolders(this.id).subscribe(
      (data) => {
        this.folder = data;
        this.searchedFolder = data;
        console.log("test", data);
      },
      (error) => {
        console.error("Error fetching folders:", error);
      }
    );
  }

  onSubmit() {
    if (!this.selectedCustomerId || !this.folderName) {
      console.error("Customer or folder name is undefined");
      return;
    }

    const folder: Folder = { name: this.folderName };
    this.folderService.addFolder(this.selectedCustomerId)
      .subscribe(
        (addedFolder) => {
          console.log("Folder added successfully:", addedFolder);
          this.getFolders();
          this.folderName = '';
          this.selectedCustomerId = null;
          this.router.navigate(['/list-folder']);
        },
        (error) => {
          console.error("Error adding folder:", error);
        }
      );
  }

  public onSearch(): void {
    const searchTermLowerCustomer = this.searchTerm.toLowerCase();

    if (searchTermLowerCustomer) {
      this.searchedFolder = this.folder.filter(f => {
        return (
          f.name.toLowerCase().includes(searchTermLowerCustomer)
        );
      });
    } else {
      this.searchedFolder = this.folder.slice();
    }
  }

  openFolder(idFolder: number) {
    console.log('idFolder:', idFolder);
    this.router.navigate(['/info-folder', idFolder]);
  }

  onCustomerChange() {
    const selectedCustomer = this.customersWithoutFolders.find(customer => customer.idCustomer === this.selectedCustomerId);
    if (selectedCustomer) {
      this.folderName = `${selectedCustomer.firstName} ${selectedCustomer.lastName}`;
    } else {
      this.folderName = '';
    }
  }
}
