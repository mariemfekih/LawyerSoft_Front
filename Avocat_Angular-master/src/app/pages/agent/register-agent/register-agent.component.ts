import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Governorate } from 'src/app/models/type/governorate';
import { Role } from 'src/app/models/type/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmailService } from 'src/app/services/email.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-agent',
  templateUrl: './register-agent.component.html',
  styleUrls: ['./register-agent.component.scss']
})
export class RegisterAgentComponent implements OnInit {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  password: string = '';
  user: User = new User(); 

  selectedCity: Governorate; 
  cityOptions = Object.values(Governorate); 
  lawyerId:number;
  lawyerFirstName: string;
  lawyerLastName: string;
/**
 * 
 * @param router 
 * @param authenticationService 
 * @param notificationService 
 */
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
            private emailService:EmailService,private userService:UserService) {}

  ngOnInit(): void {
    this.lawyerId = JSON.parse(localStorage.getItem('id')!);
    console.log('Lawyer ID:', this.lawyerId);
    this.loadUserDetails(this.lawyerId);
    if(this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('dashboard')
    }
  }

  loadUserDetails(idUser: number) {
    this.userService.getUserById(idUser).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user)
      } ,(error) => {
          console.error('Error fetching user details:', error);
        }
      );
}
  getUserStatus(user: User): string {
    if (user.active && user.notLocked) {
      return 'Active';
    } else if (!user.active && user.notLocked) {
      return 'Inactive';
    } else if (!user.active && !user.notLocked) {
      return 'Verrouillé';
    } else {
      return 'Unknown';
    }
  }
  public onRegister(user: User): void {
    user.role = Role.MANAGER;
    const username = `${user.firstName}.${user.lastName}`.toLowerCase();
    user.username = username;

    // Perform password strength validation
    const passwordStrength = this.getPasswordStrength();
    if (passwordStrength === 'faible') {
      this.sendNotification(NotificationType.ERROR, 'Le mot de passe ne respecte pas les critères de validation.');
      return;
    }

    // Perform email validation
    if (!this.isEmailValid(user.email)) {
      this.sendNotification(NotificationType.ERROR, "L'adresse e-mail n'est pas valide.");
      return;
    }

    // Perform CIN validation
    if (!this.isCinValid(user.cin)) {
      this.sendNotification(NotificationType.ERROR, "Le CIN n'est pas valide.");
      return;
    }
    

    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User) => {
          this.emailService.sendEmailTemplate(response.email, "subj", "C:\Users\marie\Documents\Github\LawyerSoft_Front\Avocat_Angular-master\src\assets\emailTemplates\afterSignup.html", response.id);
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, 'Votre demande d\'inscription a été reçue. Veuillez consulter votre boîte e-mail pour confirmer votre adresse et finaliser le processus d\'inscription. Un e-mail de confirmation vous sera envoyé sous peu.');
          this.router.navigate(['/login']);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }


  private sendNotification(notificationType: NotificationType, message: string): void{
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Une erreur s"est produite, veuillez réessayer');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getPasswordStrength(): string {
    const password = this.user?.password; // Use optional chaining
    if (!password || password.length < 8) {
      return 'faible';
    } else if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      return 'faible';
    } else if (password.length < 12) {
      return 'moyenne';
    } else {
      return 'fort';
    }
  }
isCinValid(cin: string): boolean {
  // Check if cin is undefined or null
  if (!cin) {
    return false;
  }

  // CIN should be exactly 8 characters long
  if (cin.length !== 8) {
    return false;
  }

  // CIN should start with either 0 or 1
  const firstDigit = cin.charAt(0);
  if (firstDigit !== '0' && firstDigit !== '1') {
    return false;
  }

  // CIN should contain only digits
  if (!/^\d+$/.test(cin)) {
    return false;
  }

  return true;
}

  
  isEmailValid(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
