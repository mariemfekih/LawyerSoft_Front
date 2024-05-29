import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from 'src/app/models/case';
import { CaseStateTranslator } from 'src/app/models/type/TranslatorFr/caseStateTranslator';
import { CaseTypeTranslator } from 'src/app/models/type/TranslatorFr/caseTypeTranslator';
import { CaseState } from 'src/app/models/type/caseState';
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
  userId:number;

  selectedCaseType: CaseType = CaseType.CIVIL; // Valeur initiale
  // Obtenir toutes les valeurs de l'énumération CaseType
  caseTypes = Object.values(CaseType);
  translateCaseType(type: CaseType): string {
    return CaseTypeTranslator.translateFrType(type);
  }

  selectedCaseState: CaseState = CaseState.INITIATED; // Valeur initiale
  // Obtenir toutes les valeurs de l'énumération CaseState
  caseStates = Object.values(CaseState);
  translateCaseState(state: CaseState): string {
    return CaseStateTranslator.translateFrState(state);
  }

  constructor(private caseService: CaseService,
           //   private tribunalService: TribunalService,
              private router: Router) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('id')!);
    
  }

  submitForm() {
    this.case.type = this.selectedCaseType;
    this.case.state=this.selectedCaseState;

  // Check if closing date is after creation date
  if (this.case.closingDate && this.case.creationDate && this.case.closingDate < this.case.creationDate) {
    alert('La date de clôture doit être postérieure à la date de création');
    return;
  }
    this.caseService.addCase(this.case,this.userId).subscribe(
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
