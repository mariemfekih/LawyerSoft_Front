import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {


  public action: Action = new Action();

  constructor(private actionService: ActionService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submitForm() {

    this.actionService.addAction(this.action).subscribe(
      newaction => {
        console.log('action ajouté avec succès:', newaction);
        this.router.navigate(['list-action']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de action:', erreur);
      }
    );
  }

}

