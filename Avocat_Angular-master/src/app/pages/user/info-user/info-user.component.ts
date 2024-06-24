import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { roleTranslator } from 'src/app/models/type/TranslatorFr/roleTranslator';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss'],
  providers: [DatePipe]
})
export class InfoUserComponent implements OnInit {

  id: any;
  user = new User();
  public formattedJoinDate: string = '';
  public translatedRole: string = '';

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Récupérer les données
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(
      (d) => {
        this.user = d;
        this.translatedRole = roleTranslator.translateFrRole(this.user.role);
        this.formattedJoinDate = this.datePipe.transform(this.user.joinDate, 'dd/MM/yyyy');
      },
      (error) => {
        switch (error.status) {
          case 404:
            console.log('notfound');
            this.router.navigate(['notfound']);
            break;
        }
      },
      () => {
        console.log(this.user);
      }
    )
  }

}
