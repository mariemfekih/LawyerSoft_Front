import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Governorate } from 'src/app/models/type/governorate';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  client: Customer;
  updateClientForm: FormGroup;
  governorates = Object.values(Governorate);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateClientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      job: ['', Validators.required],
      city: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required]
    });

    const idCustomer = this.route.snapshot.params['idCustomer'];
    this.customerService.getCustomerById(idCustomer).subscribe(data => {
      this.client = data as Customer;
      this.updateClientForm.patchValue({
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        cin: this.client.cin,
        email: this.client.email,
        phone: this.client.phone,
        city: this.client.city,
        birthDate: this.client.birthDate,
        job: this.client.job,
        gender: this.client.gender
      });
    });
  }

  updateClient() {
    const idCustomer = this.route.snapshot.params['idCustomer'];
    const formData = this.updateClientForm.value;
    console.log(formData);
    this.customerService.updateCustomer(idCustomer, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-customer']);
    });
  }
}
