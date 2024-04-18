import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Honoraire } from 'src/app/models/honoraire';
import { HonoraireService } from 'src/app/services/honoraire.service';

@Component({
  selector: 'app-update-honoraire',
  templateUrl: './update-honoraire.component.html',
  styleUrls: ['./update-honoraire.component.scss']
})
export class UpdateHonoraireComponent implements OnInit {

  constructor(private route: ActivatedRoute, private honoraireService: HonoraireService, private router: Router) { }
  honoraire: Honoraire = new Honoraire();

  ngOnInit(): void {
    const idHonoraire = this.route.snapshot.params['idHonoraire'];
    this.honoraireService.retrieveHonoraire(idHonoraire).subscribe(
      (data) => {
        this.honoraire = data;
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de l\'affaire:', erreur);
      }
    );
  }

  modifierHonoraire(): void {
    this.honoraireService.updateHonoraire(this.honoraire).subscribe(
      (data) => {
        console.log('Affaire modifiée avec succès:', data);
        this.router.navigate(['list-honoraire']);
      },
      (erreur) => {
        console.error('Erreur lors de la modification de l\'affaire:', erreur);
      }
    );
  }

}
