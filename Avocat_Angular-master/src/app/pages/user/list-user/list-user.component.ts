import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';
import { EmailService } from 'src/app/services/email.service'; // Import the EmailService


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
 idUser: number;
  public user!: User[];
  u:User;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedUser: User[];
  dialog: any;
  displayChange: string = 'none'; 
  currentActivationStatus: boolean;


  constructor(private userService: UserService,
              private emailService: EmailService, 
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getUsers();
    this.idUser = this.route.snapshot.params['id'];
 
  }
  


  public getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log(data)
        this.user = data;
        this.searchedUser = data;
      }
    );
  }
  public getUserById() {
    this.userService.getUserById(this.idUser).subscribe(
      (user: User) => {
        console.log('User object:', user); // Add this line to log the user object
        const userEmail = user.email;
        console.log(userEmail)
      },
      (error: any) => {
        console.error(error);
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

  public onDeleteUser(id: any) {
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
/*public confirmStatusChange(userId: number, currentStatus: string): void {
  let message = '';
  if (currentStatus === 'Active') {
    message = 'Are you sure you want to make this user inactive?';
  } else if (currentStatus === 'Inactive') {
    message = 'Are you sure you want to make this user active?';
  }

}
  changeUserStatus(userId: number, currentStatus: string) {
    throw new Error('Method not implemented.');
  }
*/



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




        
openSendMailPopup(userId: number, currentStatus: boolean) {
  this.idUser = userId;
  this.currentActivationStatus = currentStatus;
  this.displayChange = 'block'; 
}
closeSendMailPopup() {
  this.displayChange = 'none'; 
}

// Méthode pour envoyer un email
sendMail(to: string, cc: string[], subject: string, body: string): void {
  this.emailService.sendMail(to, cc, subject, body).subscribe(
    (response: string) => {
      console.log(response);
    },
    (errorResponse: HttpErrorResponse) => {
      console.error('Erreur lors de l\'envoi de l\'email :', errorResponse); // Enregistrer l'objet complet de l'erreur dans la console
    }
  );
}

// Méthode pour basculer l'activation de l'utilisateur
toggleUserActivation(userId: number, currentStatus: boolean): void {
  this.currentActivationStatus = !currentStatus;

  this.userService.updateUserActiveState(userId, this.currentActivationStatus).subscribe(
    () => {
      this.getUsers();
      this.notificationService.notify(NotificationType.SUCCESS, `Statut d'activation de l'utilisateur modifié avec succès`);

      // Récupérer l'utilisateur après la mise à jour
      this.userService.getUserById(this.idUser).subscribe(
        (user: User) => {
          if (user && user.email) { // Check if user object and email property are defined
            console.log('Objet utilisateur :', user); // Enregistrer l'objet utilisateur dans la console
            const userEmail = user.email;
            let emailSubject: string;
            let templatePath: string;

            // Déterminer le sujet et le corps de l'email en fonction du statut d'activation
            if (this.currentActivationStatus) {
              emailSubject = 'Activation du compte sur LawyerSoft';
              templatePath = "C:/Users/marie/Documents/Github/LawyerSoft_Front/Avocat_Angular-master/src/assets/emailTemplates/mail-activate-account.html";
            } else {
              emailSubject = 'Désactivation du compte sur LawyerSoft';
              templatePath = "C:/Users/marie/Documents/Github/LawyerSoft_Front/Avocat_Angular-master/src/assets/emailTemplates/mail-deactivate-account.html"
            }

            this.emailService.sendEmailTemplate(userEmail, emailSubject, templatePath, this.idUser)
              .subscribe(
                (response) => {
                  console.log('Email sent successfully:', response);
                },
                (error: HttpErrorResponse) => {
                  console.error('Error sending email:', error);
                }
              );
          } else {
            console.error('User object or email property is undefined');
          }
        },
        (error: any) => {
          console.error(error);
          // Gérer l'erreur si impossible de récupérer les données de l'utilisateur
        }
      );

      this.closeSendMailPopup();
    },
    (error: HttpErrorResponse) => {
      console.error(error);
      this.notificationService.notify(NotificationType.ERROR, `Échec de la modification du statut d'activation de l'utilisateur`);
      this.closeSendMailPopup();
    }
  );
}



}
