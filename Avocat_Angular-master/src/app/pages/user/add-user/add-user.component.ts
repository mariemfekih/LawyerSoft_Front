import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public fileName: string;
  public profileImage: File;
user:User;
  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public onAddNewUser(userForm: NgForm): void {
    this.userService.addUser(this.user).subscribe(
      newuser => {
        console.log('utilisateur ajoutée avec succès:', newuser);
        this.router.navigate(['list-user']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'affaire:', erreur);
      }
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if(message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Une erreur s"est produite, veuillez réessayer');
    }
  }

  public onProfileImageChange(fileName: string, profileImage: File): void {
    this.fileName =  fileName;
    this.profileImage = profileImage;
  }


}
