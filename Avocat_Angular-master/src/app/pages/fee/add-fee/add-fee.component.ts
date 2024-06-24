import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Fee } from 'src/app/models/fee';
import { ActionService } from 'src/app/services/action.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FeeService } from 'src/app/services/fee.service';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.scss']
})
export class AddFeeComponent implements OnInit {

  public fee: Fee = new Fee();
  selectedFeeId: number;
  selectedActionIds: number[] = [];
  actions: any[] = [];
userId:number;
selectedCustomerId: number;
customers: Customer[] = [];

  constructor(private feeService: FeeService,private actionService: ActionService,private customerService:CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('id')!);

    this.loadActions();
    this.loadCustomers();

  }
  loadCustomers() {
    this.customerService.getUserCustomers(this.userId).subscribe(
      customers => {
        this.customers = customers;
      },
      error => {
        console.error('Error loading customers:', error);
      }
    );
  }
  loadActions() {
    this.actionService.getActions().subscribe(
        (data) => {
            this.actions = data;
        },
        (error) => {
            console.error('Error loading actions:', error);
        }
    );
}

  submitForm() {
    this.fee.idCustomer = this.selectedCustomerId;
    this.feeService.addAndAssignFeeToActions(this.fee , this.selectedActionIds ).subscribe(
      newcourt => {
        console.log('tribunal ajouté avec succès:', newcourt);
        this.router.navigate(['list-fee']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de tribufeenal:', erreur);
      }
    );
  }

  

}
