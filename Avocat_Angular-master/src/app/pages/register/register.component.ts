import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Governorate } from 'src/app/models/type/governorate';
import { Role } from 'src/app/models/type/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  password: string = '';
  user: User = new User(); 

  selectedCity: Governorate; 
  cityOptions = Object.values(Governorate); 

/**
 * 
 * @param router 
 * @param authenticationService 
 * @param notificationService 
 */
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('dashboard')
    }
  }

  public onRegister(user: User): void {
    user.role= Role.LAWYER;
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User) => {
          this.showLoading= false ;
          this.sendNotification(NotificationType.SUCCESS, 'Un nouveau compte a été créé avec succès!');
          this.router.navigate(['/login']);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading= false ;
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
    if (this.password.length < 8) {
      return 'faible';
    } else if (this.password.length < 12) {
      return 'fort';
    } else {
      return 'moyenne';
    }
  }


}
