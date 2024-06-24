import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-update-action',
  templateUrl: './update-action.component.html',
  styleUrls: ['./update-action.component.scss']
})
export class UpdateActionComponent implements OnInit {

  action: Action; 

  updateActionForm: FormGroup;

  constructor(    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private actionService: ActionService,
    private router: Router) { }

  ngOnInit(): void {
    this.updateActionForm = this.formBuilder.group({
      reference: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],

    });
  
    const idAction = this.route.snapshot.params['idAction'];
    console.log('idAction:', idAction);
    this.actionService.getActionyById(idAction).subscribe(data => {
      this.action = data as Action;
  
      this.updateActionForm.patchValue({
        reference: this.action.reference,
        amount: this.action.amount,
        description: this.action.description,
 
      });
    });
  }


  updateAction() {
    const idAction = this.route.snapshot.params['idAction'];
    const formData = this.updateActionForm.value;
    console.log(formData);
    this.actionService.updateAction(idAction, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-action']);

    });
  
  }
}
