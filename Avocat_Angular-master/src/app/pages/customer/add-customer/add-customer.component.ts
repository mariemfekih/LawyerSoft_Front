import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Governorate } from 'src/app/models/type/governorate';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {


  public client: Customer = new Customer();
  governorates = Object.values(Governorate);
  userId:number;

  
  constructor(private customerService: CustomerService,
              private router: Router) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('id')!);

   }

  submitForm() {

    this.customerService.addCustomer(this.client,this.userId).subscribe(
      newclient => {
        console.log('client ajouté avec succès:', newclient);
        this.router.navigate(['list-customer']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout du client:', erreur);
      }
    );
  }
}
