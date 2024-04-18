import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Auxiliary } from 'src/app/models/auxiliary';
import { Case } from 'src/app/models/case';
import { Contributor } from 'src/app/models/contributor';
import { Trial } from 'src/app/models/trial';
import { ContributorType } from 'src/app/models/type/contributorType';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import { CaseService } from 'src/app/services/case.service';
import { ContributorService } from 'src/app/services/contributor.service';
import { TrialService } from 'src/app/services/trial.service';

@Component({
  selector: 'app-info-case',
  templateUrl: './info-case.component.html',
  styleUrls: ['./info-case.component.scss']
})
export class InfoCaseComponent implements OnInit {
  case: Case;
  idCase: number;
  trials: Trial[] = [];
  trial1: Trial = {
    idTrial: null,
    title: '',
    description: '',
    judgement: ''
  };
  currentPage: number = 1;
  itemsPerPage: number = 5;
  displayAddTrialStyle: string = 'none';  //for the update;
  displayUpdateTrialStyle: string = 'none'; // initialisé à 'none' pour masquer la boîte de dialogue modale
  displayDeleteTrialStyle: string = 'none'; 

  idTrial: number;
  updatedTrial: Trial = new Trial(); 

  displayAddContributorStyle: string = 'none';  //for the update;
  displayUpdateContributorStyle: string = 'none'; // initialisé à 'none' pour masquer la boîte de dialogue modale
  displayDeleteContributorStyle: string = 'none'; 
  idContributor: number;
  updatedContributor: Contributor = new Contributor(); 
  //contributors: Contributor[] = [];


  //*************testttttt**************** */
contributors: Contributor[] = [];
selectedAuxiliaryId: number;
auxiliaries: Auxiliary[] = [];
selectedContributorType:ContributorType;
contributorTypes = Object.values(ContributorType);


  constructor(
    private route: ActivatedRoute,
    private caseService: CaseService,
    private trialService: TrialService ,
    private auxiliaryService:AuxiliaryService,
  private contributorService:ContributorService ) { }

  ngOnInit(): void {
    this.idCase = this.route.snapshot.params['idCase'];
    this.idTrial = this.route.snapshot.params['idTrial'];
    this.idContributor = this.route.snapshot.params['idContributor'];

    this.loadCaseDetails(this.idCase);
    this.getTrialsByCaseId();

    this.auxiliaryService.getAuxiliaries().subscribe(
      (data: Auxiliary[]) => {
        console.log('Auxiliaries fetched:', data);
        this.auxiliaries = data;
      },
      error => {
        console.error('Error fetching auxiliaries:', error);
      }
    );
  }

  getTrialsByCaseId() {
    this.trialService.getTrialsByCaseId(this.idCase).subscribe(
      (data: Trial[]) => {
        this.trials = data;
      },
      error => {
        console.error('Error fetching trials:', error);
      }
    );
  }

  loadCaseDetails(idCase: number) {
    this.caseService.getCaseById(idCase).subscribe(
      (data) => {
        this.case = data;
      },
      (error) => {
        console.error('Error fetching case details:', error);
      }
    );
  }

  openAddTrialPopup() {
    this.displayAddTrialStyle = 'block'; // pour afficher la boîte de dialogue modale
  }

  // Méthode pour fermer la boîte de dialogue modale pour ajouter un essai
  closeAddTrialPopup() {
    this.displayAddTrialStyle = 'none'; // pour masquer la boîte de dialogue modale
  }

  openUpdateTrialPopup(idTrial: number) {
    this.idTrial = idTrial;
    this.displayUpdateTrialStyle = 'block';
    // Optionally, load the trial details for the specified idTrial here if needed
  }
  

  closeUpdateTrialPopup() {
    this.displayUpdateTrialStyle = 'none'; // pour masquer la boîte de dialogue modale
  }
  openDeleteTrialPopup(idTrial: number) {
    this.idTrial = idTrial;
    this.displayDeleteTrialStyle = 'block';
    // Optionally, load the trial details for the specified idTrial here if needed
  }
  

  closeDeleteTrialPopup() {
    this.displayDeleteTrialStyle = 'none'; // pour masquer la boîte de dialogue modale
  }


  onAddTrial() {
    this.trialService.addTrialToCase(this.idCase, this.trial1).subscribe(
      (newTrial: Trial) => {
        console.log('Trial added successfully');
        this.trials.push(newTrial); 
        this.closeAddTrialPopup(); 
      },
      (error) => {
        console.error('Error adding trial:', error);
      }
    );
  }
  onDeleteTrial() {
    this.trialService.deleteTrial(this.idCase, this.idTrial).subscribe(
        () => {
            console.log('Trial deleted successfully');
            this.trials = this.trials.filter(trial => trial.idTrial !== this.idTrial);
        },
        (error) => {
            console.error('Error deleting trial:', error);
        }
    );
  }
  /*onDeleteTrial(caseId: number, idTrial: number) {
    this.trialService.deleteTrial(caseId, idTrial).subscribe(
        () => {
            console.log('Trial deleted successfully');
            this.trials = this.trials.filter(trial => trial.idTrial !== idTrial);
        },
        (error) => {
            console.error('Error deleting trial:', error);
        }
    );
  }*/
  

  updateTrial(): void {
    this.trialService.updateTrial(this.idCase, this.idTrial, this.updatedTrial)
      .subscribe(
        response => {
          console.log('Trial updated successfully:', response);
          this.closeUpdateTrialPopup();
          // Manually fetch the updated trials after a successful update
          this.getTrialsByCaseId();
        },
        error => {
          console.error('Error updating trial:', error);
        }
      );
  }
  
/**
 * 
 * Contributor 
 */


openAddContributorPopup() {
  this.displayAddContributorStyle = 'block'; 
}
closeAddContributorPopup() {
  this.displayAddContributorStyle = 'none'; 
}

openUpdateContributorPopup(idContributor: number) {
  this.idContributor = idContributor;
  this.displayUpdateContributorStyle = 'block';
}
closeUpdateContributorPopup() {
  this.displayUpdateContributorStyle = 'none'; 
}

openDeleteContributorPopup(idContributor: number) {
  this.idContributor = idContributor;
  this.displayDeleteContributorStyle = 'block';
}
closeDeleteContributorPopup() {
  this.displayDeleteContributorStyle = 'none'; 
}

onAddContributor() {
  const newContributor: Contributor = {
    type: this.selectedContributorType, // Use the selected contributor type instead of ContributorType
    case: this.case, // Assign the current case object
    auxiliary: this.auxiliaries.find(auxiliary => auxiliary.idAuxiliary === this.selectedAuxiliaryId),
    selectedAuxiliaryId: undefined // Reset selectedAuxiliaryId after adding
  };

  this.contributorService.addContributorToCase(this.case.idCase, newContributor)
    .subscribe(
      (addedContributor: Contributor) => {
        console.log('Contributor added successfully:', addedContributor);
        this.contributors.push(addedContributor); // Update the contributors list locally
        this.closeAddContributorPopup(); // Close the popup
      },
      (error) => {
        console.error('Error adding contributor:', error);
      }
    );
}









/*Pagination*/
getTotalPages() {
  if (!this.trials || !Array.isArray(this.trials)) {
    return 0;
  }
  const totalItems = this.trials.length;
  const itemsPerPage = this.itemsPerPage;
  return Math.ceil(totalItems / itemsPerPage);
}


getPages(): number[] {
    let pages: number[] = [];
    const totalPages = this.getTotalPages();
    const currentPage = this.currentPage;
    const maxPages = 5;

      if (totalPages <= maxPages) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
        const endPage = Math.min(totalPages, startPage + maxPages - 1);
        pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

        const hasLeftSpill = startPage > 1;
        const hasRightSpill = totalPages - endPage > 0;
        const spillOffset = maxPages - (endPage - startPage + 1);

        if (hasLeftSpill && !hasRightSpill) {
          const extraPages = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
          pages = [...extraPages, ...pages];
        } else if (!hasLeftSpill && hasRightSpill) {
          const extraPages = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
          pages = [...pages, ...extraPages];
        } else if (hasLeftSpill && hasRightSpill) {
          const leftSpill = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
          const rightSpill = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
          pages = [...leftSpill, ...pages, ...rightSpill];
        }
      }

      return pages;
    }


    translateFrType(type: ContributorType): string {
      switch (type) {
        case ContributorType.CUSTOMER:
          return 'Client';
        case ContributorType.JUDGE:
          return 'Juge';
        case ContributorType.JUDICIAL_OFFICER:
          return 'Officier judiciaire';
        case ContributorType.LEGAL_EXPERT:
          return 'Expert juridique';
        case ContributorType.DEFENDANT:
          return 'Défendeur';
        case ContributorType.PLAIGNANT:
          return 'Plaignant';
        case ContributorType.WITNESS:
          return 'Témoin';
        case ContributorType.REPORTER:
          return 'Rapporteur';
        case ContributorType.LEGAL_COUNSEL:
          return 'Conseiller juridique';
        case ContributorType.INVESTIGATING_JUDGE:
          return 'Juge d\'instruction';
        case ContributorType.LAWYER:
          return 'Avocat';
        default:
          return 'Type inconnu'; 
      }
    }
    
    

}
