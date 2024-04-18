import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public user!: User[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedUser: User[];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  //Afficher la liste des Users
  public getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log(data)
        this.user = data;
        this.searchedUser = data;
      }
    );
  }




  /*Recherche dynamique*/
  public onSearch(): void {
    const searchTermLowerUser = this.searchTerm.toLowerCase();

    if (searchTermLowerUser) {
      this.searchedUser = this.user.filter(aff => {
        return (
          aff.firstName.toLowerCase().includes(searchTermLowerUser) ||
          aff.lastName.toString().toLowerCase().includes(searchTermLowerUser) ||
          aff.username.toString().toLowerCase().includes(searchTermLowerUser) ||
          aff.email.toLowerCase().includes(searchTermLowerUser) ||
          aff.role.toLowerCase().includes(searchTermLowerUser) ||
          aff.birthDate.toString().toLowerCase().includes(searchTermLowerUser) ||
          aff.gender.toString().toLowerCase().includes(searchTermLowerUser) ||
          aff.city.toLowerCase().includes(searchTermLowerUser) 

        );
      });
    } else {
      this.searchedUser = this.user.slice();
    }
  }

  onAddUser() {
    this.router.navigateByUrl('/add-user');
  }

  public deleteUser(id: any) {
    const userId: number = Number(id); // Convert id to number
    if (isNaN(userId)) {
        console.error('Invalid id:', id);
        return; // Stop execution if id is not a valid number
    }

    this.userService.deleteUser(userId).subscribe(
        () => {
            this.getUsers();
            console.log("supp"); 
        },
        (error) => {
            console.error("erreur", error);
        }
    );
}






  /*Pagination*/
  getTotalPages() {
    if (!this.user || !Array.isArray(this.user)) {
        return 0;  }
    const totalItems = this.user.length;
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
