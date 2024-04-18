import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from 'src/app/models/case';
import { Honoraire } from 'src/app/models/honoraire';
import { CaseService } from 'src/app/services/case.service';
import { HonoraireService } from 'src/app/services/honoraire.service';

@Component({
  selector: 'app-add-honoraire',
  templateUrl: './add-honoraire.component.html',
  styleUrls: ['./add-honoraire.component.scss']
})
export class AddHonoraireComponent implements OnInit {

  public honoraire: Honoraire = new Honoraire();
  public cases: Case[] = [];
  selectedAffaireId: number;


  constructor(private honoraireService: HonoraireService,
              private caseService: CaseService,
              private router: Router) {}

  ngOnInit(): void {
  // Fetch the list of cases
  this.caseService.getCases().subscribe(
    (cases) => {
      console.log('Cases retrieved successfully:', cases);
      this.cases = cases;
    },
    (error) => {
      console.error('Error retrieving cases:', error);
    }
  );
  }

 /* submitForm() {
    this.honoraireService.addHonoraire(this.honoraire).subscribe(
      honoraire => {
        console.log('Affaire ajoutée avec succès:', honoraire);
        this.router.navigate(['list-honoraire']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'affaire:', erreur);
      }
    );
  }*/

  submitForm(): void {
    console.log('Selected Affaire ID:', this.selectedAffaireId);

    // Set the selected affaire in the honoraire object
    this.honoraire.affaire = this.cases.find(affaire => affaire.idCase === this.selectedAffaireId);

    this.honoraireService.addHonoraireAndAffectToAffaire(this.honoraire, this.selectedAffaireId).subscribe(
      () => {
        console.log('Honoraire ajouté avec succès');
        this.router.navigate(['list-honoraire']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'honoraire:', error);
      }
    );
  }


}
