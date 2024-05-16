import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Auxiliary } from 'src/app/models/auxiliary';
import { Case } from 'src/app/models/case';
import { Contributor } from 'src/app/models/contributor';
import { Court } from 'src/app/models/court';
import { NewContributor } from 'src/app/models/dto/newContributor';
import { newTrial } from 'src/app/models/dto/newTrial';
import { Trial } from 'src/app/models/trial';
import { ContributorTypeTranslator } from 'src/app/models/type/TranslatorFr/contributorTypeTranslator';
import { ContributorType } from 'src/app/models/type/contributorType';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import { CaseService } from 'src/app/services/case.service';
import { ContributorService } from 'src/app/services/contributor.service';
import { CourtService } from 'src/app/services/court.service';
import { TrialService } from 'src/app/services/trial.service';

@Component({
  selector: 'app-info-case',
  templateUrl: './info-case.component.html',
  styleUrls: ['./info-case.component.scss']
})
export class InfoCaseComponent implements OnInit {
  case: Case;
  court:Court;
  idCase: number;
  idCourt:number;
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

  displayAddContributorStyle: string = 'none';  
  displayUpdateContributorStyle: string = 'none'; 
  displayDeleteContributorStyle: string = 'none'; 
  idContributor: number;
  updatedContributor: Contributor = new Contributor(); 
  //contributors: Contributor[] = [];


  //*************testttttt**************** */
contributors: Contributor[] = [];
selectedAuxiliaryId: number;
selectedCourtId: number;
courts: Court[] = [];

auxiliaries: Auxiliary[] = [];
selectedContributorType:ContributorType;
contributorTypes = Object.values(ContributorType);
translateContributorType(type: ContributorType): string {
  return ContributorTypeTranslator.translateFrType(type);
}

  constructor(
    private route: ActivatedRoute,
    private caseService: CaseService,
    private trialService: TrialService ,
    private auxiliaryService:AuxiliaryService,
  private contributorService:ContributorService,
private courtService:CourtService ) { }

  ngOnInit(): void {
    this.idCase = this.route.snapshot.params['idCase'];    
    this.idCourt = this.route.snapshot.params['idCourt'];
    this.idTrial = this.route.snapshot.params['idTrial'];
    this.idContributor = this.route.snapshot.params['idContributor'];

    this.loadCaseDetails(this.idCase);
    this.getTrialsByCaseId();
    this.getContributorsByCaseId(this.idCase); 

    this.auxiliaryService.getAuxiliaries().subscribe(
      (data: Auxiliary[]) => {
        console.log('Auxiliaries fetched:', data);
        this.auxiliaries = data;
      },
      error => {
        console.error('Error fetching auxiliaries:', error);
      }
    );
    this.courtService.getCourts().subscribe(
      (data: Court[]) => {
        console.log('Courts fetched:', data);
        this.courts = data;
      },
      error => {
        console.error('Error fetching courts:', error);
      }
    );

  }

  getTrialsByCaseId() {
    this.trialService.getTrialsByCaseId(this.idCase).subscribe(
      (data: Trial[]) => {
        this.trials = data;
        console.log('Trials:', this.trials); 
      },
      error => {
        console.error('Error fetching trials:', error);
        // Handle error: display an error message or log it
      }
    );
  }
  getContributorsByCaseId(caseId: number) {
    this.contributorService.getContributorsByCaseId(caseId).subscribe(
      (data: Contributor[]) => {
        this.contributors = data;
        console.log('Contributors:', this.contributors); // Log the fetched contributors for debugging
      },
      error => {
        console.error('Error fetching contributors:', error);
        // Handle error: display an error message or log it
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
  loadCourtDetails(idCourt: number) {
    this.courtService.getCourtById(idCourt).subscribe(
      (data) => {
        this.court = data;
      },
      (error) => {
        console.error('Error fetching case details:', error);
      }
    );
  }



/**
 * Trial
 */
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

  onAddTrial(): void {
    // Check if the court ID is undefined
    this.trial1.idCourt=this.selectedCourtId
    if (this.trial1.idCourt === undefined) {
      console.error('Court ID is undefined');
      return;
    }
  
    this.trialService.addTrialToCase(this.idCase, this.selectedCourtId, this.trial1).subscribe(
      (newTrial: Trial) => {
        
        console.log('Selected Court ID:', this.selectedCourtId);
        console.log('Trial added successfully');
        this.closeAddTrialPopup();
        this.fetchTrials(); 
      },
      (error) => {
        console.error('Error adding trial:', error);
      }
    );
  }
  
  
  
  fetchTrials(): void {
    this.trialService.getTrialsByCaseId(this.idCase)
      .subscribe(
        (trials: Trial[]) => {
          this.trials = trials; // Update the trials list locally
        },
        (error) => {
          console.error('Error fetching trials:', error);
        }
      );
  }
  
  onDeleteTrial() {
    this.trialService.deleteTrial(this.idCase, this.idTrial).subscribe(
        () => {
            console.log('Trial deleted successfully');
            this.trials = this.trials.filter(trial => trial.idTrial !== this.idTrial);
            this.closeDeleteTrialPopup();
        },
        (error) => {
            console.error('Error deleting trial:', error);
        }
    );
  }


  updateTrial(): void {
    this.trialService.updateTrial(this.idCase,this.idCourt, this.idTrial, this.updatedTrial)
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


onAddContributor(): void {
  const newContributor: NewContributor = {
    type: this.selectedContributorType,
    idAuxiliary: this.selectedAuxiliaryId
  };
  this.contributorService.addContributorToCase(this.case.idCase, newContributor)
    .subscribe(
      (addedContributor: Contributor) => {
        console.log('Selected Auxiliary ID:', this.selectedAuxiliaryId);
        console.log('Contributor added successfully:', addedContributor);
        this.closeAddContributorPopup(); 
        // Refetch the contributors list after adding a new contributor
        this.fetchContributors(); // Implement this method to fetch contributors from the server
      },
      (error) => {
        console.error('Error adding contributor:', error);
      }
    );
}

fetchContributors(): void {
  // Call your service method to fetch the updated list of contributors
  this.contributorService.getContributorsByCaseId(this.case.idCase)
    .subscribe(
      (contributors: Contributor[]) => {
        this.contributors = contributors; // Update the contributors list locally
      },
      (error) => {
        console.error('Error fetching contributors:', error);
      }
    );
}
onDeleteContributor() {
  this.contributorService.deleteContributor(this.idCase, this.idContributor).subscribe(
      () => {
          console.log('Contributor deleted successfully');
          this.contributors = this.contributors.filter(contributor => contributor.idContributor !== this.idContributor);
          this.closeDeleteContributorPopup();
      },
      (error) => {
          console.error('Error deleting contributor:', error);
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

    getCurrentPageTrials(): any[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.trials.slice(startIndex, endIndex);
    }
  
    // Function to change current page
    changePage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
        this.currentPage = pageNumber;
      }
    }
    

}
