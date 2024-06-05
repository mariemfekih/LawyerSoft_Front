import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { EmailService } from 'src/app/services/email.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit{
  email: string;
  firstName: string;
  lastName: string;
  id:number;
  constructor(private emailService: EmailService,private notificationService:NotificationService,private router:Router) { }
  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.router.navigate([`/add-agent/${this.id}`]);
  }
    
  submitForm() {
    console.log('Form submitted');
    
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
  
    const subject = "Inscription en tant qu'agent";
  
    this.emailService.sendEmailTemplateWithoutId(email, subject, "C:/Users/marie/Documents/Github/LawyerSoft_Front/Avocat_Angular-master/src/assets/emailTemplates/agentEmail.html", firstName, lastName,this.id ).subscribe(
      response => {
        console.log('Email sent successfully:', response);
        this.sendNotification(NotificationType.SUCCESS, 'Votre demande d\'inscription a été reçue. Veuillez consulter votre boîte e-mail pour confirmer votre adresse et finaliser le processus d\'inscription. Un e-mail de confirmation vous sera envoyé sous peu.');
      },
      error => {
        if (error.status === 200 && error.error.text) {
          this.sendNotification(NotificationType.SUCCESS, 'Votre demande d\'inscription a été reçue.');
        } else {
          this.sendNotification(NotificationType.ERROR, 'Une erreur est survenue lors de l\'envoi de l\'e-mail.');
        }
      }
    );
    
  }
  


  private sendNotification(notificationType: NotificationType, message: string): void{
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Une erreur s"est produite, veuillez réessayer');
    }
  }
}
