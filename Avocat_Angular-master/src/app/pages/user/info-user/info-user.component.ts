import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  id:any;
  user = new User();
  public formattedJoinDate: string = '';

  constructor(private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }


    ngOnInit(): void {
      //Récupérer les données
      this.id=this.activatedRoute.snapshot.params['id'];
      this.userService.getUserById(this.id).subscribe(
        (d)=>{
          this.user=d;
          
        },
        (error)=>{
          switch (error.status){
          case 404: console.log('notfound');
          this.router.navigate(['notfound'])
          break;
          }
        }
        ,
          ()=>{
            console.log(this.user)
          }
      )
    }

}
