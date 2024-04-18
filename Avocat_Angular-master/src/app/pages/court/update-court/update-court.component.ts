import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtType } from 'src/app/models/type/courtType';
import { Governorate } from 'src/app/models/type/governorate';
import { CourtService } from 'src/app/services/court.service';

@Component({
  selector: 'app-update-court',
  templateUrl: './update-court.component.html',
  styleUrls: ['./update-court.component.scss']
})
export class UpdateCourtComponent implements OnInit {

  governorates = Object.values(Governorate);
  selectedGovernorate: Governorate = Governorate.Ariana;

  courtTypes = Object.values(CourtType);
  court: Court; 
  selectedCourtType: CourtType = CourtType.FIRST_INSTANCE; // Valeur initiale

  updateCourtForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courtService: CourtService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateCourtForm = this.formBuilder.group({
      governorate: ['', Validators.required],
      municipality: ['', Validators.required],
      adress: ['', Validators.required],
      type: ['', Validators.required],
      phone: ['', Validators.required]
    });
  
    const idCourt = this.route.snapshot.params['idCourt'];
    this.courtService.getCourtById(idCourt).subscribe(data => {
      this.court = data as Court;
  
      this.updateCourtForm.patchValue({
        governorate: this.court.governorate,
        municipality: this.court.municipality,
        adress: this.court.adress,
        phone: this.court.phone,
        type: this.court.type 
      });
    });
  }
  

  updateCourt() {
    const idCourt = this.route.snapshot.params['idCourt'];
    const formData = this.updateCourtForm.value;
    console.log(formData);
    this.courtService.updateCourt(idCourt, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-court']);

    });
  
  }
  

}
