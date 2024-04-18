import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Case } from 'src/app/models/case';
import { CaseType } from 'src/app/models/type/caseType';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-update-case',
  templateUrl: './update-case.component.html',
  styleUrls: ['./update-case.component.scss']
})
export class UpdateCaseComponent implements OnInit {

  caseTypes = Object.values(CaseType);
  case: Case; // Make sure to import Case from the correct path
  selectedCaseType: CaseType = CaseType.CIVIL; // Valeur initiale

  updateCaseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private caseService: CaseService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateCaseForm = this.formBuilder.group({
      title: ['', Validators.required],
      creationDate: ['', Validators.required],
      closingDate: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
  
    const idCase = this.route.snapshot.params['idCase'];
    this.caseService.getCaseById(idCase).subscribe(data => {
      this.case = data as Case;
  
      this.updateCaseForm.patchValue({
        title: this.case.title,
        creationDate: this.case.creationDate,
        closingDate: this.case.closingDate,
        description: this.case.description,
        type: this.case.type 
      });
    });
  }
  

  updateCase() {
    const idCase = this.route.snapshot.params['idCase'];
    const formData = this.updateCaseForm.value;
    console.log(formData);
    this.caseService.updateCase(idCase, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-case']);

    });
  
  }
  
}
