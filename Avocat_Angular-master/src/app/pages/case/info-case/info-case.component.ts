import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Auxiliary } from 'src/app/models/auxiliary';
import { Case } from 'src/app/models/case';
import { Contributor } from 'src/app/models/contributor';
import { Court } from 'src/app/models/court';
import { Customer } from 'src/app/models/customer';
import { NewContributor } from 'src/app/models/dto/newContributor';
import { newTrial } from 'src/app/models/dto/newTrial';
import { Trial } from 'src/app/models/trial';
import { ContributorTypeTranslator } from 'src/app/models/type/TranslatorFr/contributorTypeTranslator';
import { CourtTypeTranslator } from 'src/app/models/type/TranslatorFr/courtTypeTranslator';
import { ContributorType } from 'src/app/models/type/contributorType';
import { CourtType } from 'src/app/models/type/courtType';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import { CaseService } from 'src/app/services/case.service';
import { ContributorService } from 'src/app/services/contributor.service';
import { CourtService } from 'src/app/services/court.service';
import { CustomerService } from 'src/app/services/customer.service';
import { TrialService } from 'src/app/services/trial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-case',
  templateUrl: './info-case.component.html',
  styleUrls: ['./info-case.component.scss']
})
export class InfoCaseComponent implements OnInit {
  case: Case;
  customer:Customer;
  court:Court;
  idUser: number;
  idCase: number;
  idCourt:number;
  trials: Trial[] = [];
  trial1: Trial = {
    idTrial: null,
    title: '',
    description: '',
    judgement: ''
  };trial:Trial;
  customers: Customer[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  displayAddTrialStyle: string = 'none';  //for the update;
  displayUpdateTrialStyle: string = 'none'; // initialisé à 'none' pour masquer la boîte de dialogue modale

  idTrial: number;
  updatedTrial: Trial = new Trial(); 

  displayAddContributorStyle: string = 'none';  
  displayUpdateContributorStyle: string = 'none'; 
  idContributor: number;
  //updatedContributor: Contributor = new Contributor(); 
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
translateCourtType(type: CourtType): string {
  return CourtTypeTranslator.translateFrType(type);
}
updatedContributor: NewContributor = {
  type: ContributorType.DEFENDANT, // Initialize with default value based on your application logic
  idAuxiliary: null // Initialize with null or appropriate default value
};

  constructor(
    private route: ActivatedRoute,
    private caseService: CaseService,
    private trialService: TrialService ,
    private auxiliaryService:AuxiliaryService,
  private contributorService:ContributorService,private customerService:CustomerService,
private courtService:CourtService ) { }

  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('id')!);

    this.idCase = this.route.snapshot.params['idCase'];    
    this.idCourt = this.route.snapshot.params['idCourt'];
    this.idTrial = this.route.snapshot.params['idTrial'];
    this.idContributor = this.route.snapshot.params['idContributor'];
    this.loadCaseDetails(this.idCase);
    console.log(    this.loadCaseDetails(this.idCase)  )
    this.getTrialsByCaseId();
    this.getContributorsByCaseId(this.idCase); 

    this.auxiliaryService.getAuxiliariesByUserId(this.idUser).subscribe(
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
        console.log('Case details:', data); // Log the entire case object
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

  showCustomerDetails(aff: Case) {
    if (!aff.customerId) {
      console.error('Customer ID not available in the case object.');
      return;
    }

    this.customerService.getCustomerById(aff.customerId).subscribe(
      (data: Customer) => {
        this.customer = data;
        console.log('Customer details:', this.customer);

        // Display customer details using SweetAlert
        Swal.fire({
          title: `<strong>Détails du Client</strong>`,
          html: `
            <p><strong>Prénom:</strong> ${this.customer.firstName}</p>
            <p><strong>Nom:</strong> ${this.customer.lastName}</p>
            <p><strong>Email:</strong> ${this.customer.email}</p>
            <p><strong>CIN:</strong> ${this.customer.cin}</p>
            <p><strong>Téléphone:</strong> ${this.customer.phone}</p>
            <p><strong>Métier:</strong> ${this.customer.job}</p>
            <p><strong>Date de naissance:</strong> ${this.customer.birthDate}</p>
            <p><strong>Ville:</strong> ${this.customer.city}</p>
            <p><strong>Genre:</strong> ${this.customer.gender ? 'Homme' : 'Femme'}</p>
          `,
          icon: 'info',
          confirmButtonText: 'Fermer'
        });
      },
      (error) => {
        console.error('Error fetching Customer details:', error);
        // Handle error: display an error message or log it
      }
    );
  }

  showTrialDetails(trial: Trial) {
    Swal.fire({
      title: `<strong>Details de l'audience</strong>`,
      html: `
        <p><strong>Titre:</strong> ${trial.title} </p>
        <p><strong>Description:</strong> ${trial.description}</p>
        <p><strong>Jugement:</strong> ${trial.judgement}</p>
        <p><strong>Tribunal:</strong> ${this.translateCourtType(trial.courtInstance.type)}  ${trial.courtInstance.governorate}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Fermer'
    });
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
    this.loadTrialDetails(idTrial); // Load trial details by ID
    this.loadCourtDetailsByIdTrial(idTrial);
  }
  loadTrialDetails(idTrial: number) {
    this.trialService.getTrialById(idTrial).subscribe(
      (data: Trial) => {
        this.updatedTrial = data;
        console.log('Trial details:', data); // Log the entire trial object
        this.loadCourtDetails(data.courtInstance.idCourt); // Load court details by ID
      },
      (error) => {
        console.error('Error fetching trial details:', error);
      }
    );
  }
  loadCourtDetailsByIdTrial(idTrial: number) {
    this.trialService.getTrialById(idTrial).subscribe(
      (data: Trial) => {
        this.loadCourtDetailsById(data.courtInstance.idCourt);
      },
      (error) => {
        console.error('Error fetching trial details:', error);
      }
    );
  }
  
  loadCourtDetailsById(idCourt: number) {
    this.courtService.getCourtById(idCourt).subscribe(
      (data: Court) => {
        this.selectedCourtId = data.idCourt;
        console.log('Court details:', data); // Log the entire court object
      },
      (error) => {
        console.error('Error fetching court details:', error);
      }
    );
  }

  

  closeUpdateTrialPopup() {
    this.displayUpdateTrialStyle = 'none'; // pour masquer la boîte de dialogue modale
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


  
public deleteTrial(idTrial:number) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer ces données une fois supprimées!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.trialService.deleteTrial(this.idCase, idTrial).subscribe(
        () => {
            console.log('Trial deleted successfully');
            this.trials = this.trials.filter(trial => trial.idTrial !== idTrial);
            Swal.fire('Supprimé!', 'L\'audience a été supprimé avec succès.', 'success');
        },
        (error) => {
          console.error('Erreur lors de la suppression d\'audience:', error);
          Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression d\'audience.', 'error');
        }
      );
    }
  });
}

  updateTrial(): void {
    this.trialService.updateTrial( this.idTrial, this.updatedTrial)
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


openUpdateContributorPopup(idContributor: number): void {
  this.idContributor = idContributor;
  this.displayUpdateContributorStyle = 'block';

  // Load the contributor details to update
  this.contributorService.getContributorById(idContributor).subscribe(
    (data: NewContributor) => {
      // Assuming your service returns a NewContributor object
      this.updatedContributor = { ...data }; // Ensure to make a copy if necessary
    },
    error => {
      console.error('Error fetching contributor details:', error);
      Swal.fire('Error', 'Error fetching contributor details: ' + error.message, 'error');
    }
  );
}


closeUpdateContributorPopup(): void {
  this.displayUpdateContributorStyle = 'none';
}

onUpdateContributor(): void {
  this.contributorService.updateContributor(this.idContributor, this.updatedContributor).subscribe(
    response => {
      console.log('Contributor updated successfully:', response);
      Swal.fire('Success', 'Contributor updated successfully!', 'success');
      // Additional logic after successful update
    },
    error => {
      console.error('Error updating contributor:', error);
      Swal.fire('Error', 'Error updating contributor: ' + error.message, 'error');
    }
  );
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


public deleteContributor(idContributor:number) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer ces données une fois supprimées!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.contributorService.deleteContributor(this.idCase, idContributor).subscribe(
        () => {
            console.log('Contributor deleted successfully');
            this.contributors = this.contributors.filter(contributor => contributor.idContributor !== idContributor);
            Swal.fire('Supprimé!', 'L\'intervenant a été supprimé avec succès.', 'success');
        },
        (error) => {
          console.error('Erreur lors de la suppression d\'intervenant:', error);
          Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression d\'intervenant.', 'error');
        }
      );
    }
  });
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
    
    showContributorDetails(contributor: Contributor) {
      Swal.fire({
        title: `<strong>Détails d'intervenant'</strong>`,
        html: `
          <p><strong>Prénom:</strong> ${contributor.auxiliary.firstName}</p>
          <p><strong>Nom:</strong> ${contributor.auxiliary.lastName}</p>
          <p><strong>Email:</strong> ${contributor.auxiliary.email}</p>
          <p><strong>CIN:</strong> ${contributor.auxiliary.cin}</p>
          <p><strong>Téléphone:</strong> ${contributor.auxiliary.phone}</p>
          <p><strong>Date de naissance:</strong> ${contributor.auxiliary.birthDate}</p>
          <p><strong>Ville:</strong> ${contributor.auxiliary.city}</p>
          <p><strong>Genre:</strong> ${contributor.auxiliary.gender ? 'Homme' : 'Femme'}</p>
          <p><strong>Type:</strong>  ${this.translateContributorType(contributor.type)}</p>
          
        `,
        icon: 'info',
        confirmButtonText: 'Fermer'
      });
    }
    
}
