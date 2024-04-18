import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from 'src/app/models/case';
import { CaseType } from 'src/app/models/type/caseType';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {
  public case: Case = new Case();
  selectedCaseId: number;

  selectedCaseType: CaseType = CaseType.CIVIL; // Valeur initiale
  // Obtenir toutes les valeurs de l'énumération CaseType
  caseTypes = Object.values(CaseType);


  constructor(private caseService: CaseService,
           //   private tribunalService: TribunalService,
              private router: Router) {}

  ngOnInit(): void {

    
  }

  submitForm() {
    this.case.type = this.selectedCaseType;

    this.caseService.addCase(this.case).subscribe(
      newcase => {
        console.log('affaire ajoutée avec succès:', newcase);
        this.router.navigate(['list-case']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'affaire:', erreur);
      }
    );
  }


  
  

}
