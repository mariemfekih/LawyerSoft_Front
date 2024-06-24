import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auxiliary } from 'src/app/models/auxiliary';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';

@Component({
  selector: 'app-update-auxiliary',
  templateUrl: './update-auxiliary.component.html',
  styleUrls: ['./update-auxiliary.component.scss']
})
export class UpdateAuxiliaryComponent implements OnInit {


  
  auxiliary: Auxiliary; 

  updateAuxiliaryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private auxiliaryService: AuxiliaryService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateAuxiliaryForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      job: ['', Validators.required],
      city: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required]

    });
  
    const idAuxiliary = this.route.snapshot.params['idAuxiliary'];
    this.auxiliaryService.getAuxiliaryById(idAuxiliary).subscribe(data => {
      this.auxiliary = data as Auxiliary;
  
      this.updateAuxiliaryForm.patchValue({
        firstName: this.auxiliary.firstName,
        lastName: this.auxiliary.lastName,
        cin: this.auxiliary.cin,
        email: this.auxiliary.email,
        phone: this.auxiliary.phone,
        city: this.auxiliary.city,
        birthDate: this.auxiliary.birthDate,
        job: this.auxiliary.job ,
        gender: this.auxiliary.gender

      });
    });
  }
  

  updateAuxiliary() {
    const idAuxiliary = this.route.snapshot.params['idAuxiliary'];
    const formData = this.updateAuxiliaryForm.value;
    console.log(formData);
    this.auxiliaryService.updateAuxiliary(idAuxiliary, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-auxiliary']);

    });
  
  }
  

}
