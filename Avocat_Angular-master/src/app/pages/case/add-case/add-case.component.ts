import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from 'src/app/models/case';
import { Customer } from 'src/app/models/customer';
import { CaseStateTranslator } from 'src/app/models/type/TranslatorFr/caseStateTranslator';
import { CaseTypeTranslator } from 'src/app/models/type/TranslatorFr/caseTypeTranslator';
import { CaseState } from 'src/app/models/type/caseState';
import { CaseType } from 'src/app/models/type/caseType';
import { CaseService } from 'src/app/services/case.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {
  public case: Case = new Case();
  selectedCaseId: number;
  userId:number;

  selectedCaseType: CaseType = CaseType.CIVIL; // Initial value
  caseTypes = Object.values(CaseType);
  translateCaseType(type: CaseType): string {
    return CaseTypeTranslator.translateFrType(type);
  }

  selectedCaseState: CaseState = CaseState.INITIATED; // Initial value
  caseStates = Object.values(CaseState);
  translateCaseState(state: CaseState): string {
    return CaseStateTranslator.translateFrState(state);
  }

  selectedCustomerId: number; // Property to bind the selected customer's ID
  customers: Customer[] = [];

  constructor(
    private caseService: CaseService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('id')!);
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

  submitForm() {
    this.case.type = this.selectedCaseType;
    this.case.state = this.selectedCaseState;
    this.case.customerId = this.selectedCustomerId; // Set the selected customer's ID

    // Check if closing date is after creation date
    if (this.case.closingDate && this.case.creationDate && this.case.closingDate < this.case.creationDate) {
      alert('La date de clôture doit être postérieure à la date de création');
      return;
    }

    this.caseService.addCase(this.case, this.userId, this.selectedCustomerId).subscribe(
      newcase => {
        console.log('Affaire ajoutée avec succès:', newcase);
        this.router.navigate(['list-case']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'affaire:', erreur);
      }
    );
  }
}
