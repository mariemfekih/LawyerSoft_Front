import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtType } from 'src/app/models/type/courtType';
import { Governorate } from 'src/app/models/type/governorate';
import { CourtService } from 'src/app/services/court.service';

@Component({
  selector: 'app-add-court',
  templateUrl: './add-court.component.html',
  styleUrls: ['./add-court.component.scss']
})
export class AddCourtComponent implements OnInit {
  public court: Court = new Court();
  selectedCourtId: number;

  selectedCourtType: CourtType = CourtType.FIRST_INSTANCE; // Valeur initiale
  courtTypes = Object.values(CourtType);

  governorates = Object.values(Governorate);
  selectedGovernorate: Governorate = Governorate.Ariana;
  
  constructor(private courtService: CourtService,
              private router: Router) {}

  ngOnInit(): void { }

  submitForm() {
    this.court.type = this.selectedCourtType;

    this.courtService.addCourt(this.court).subscribe(
      newcourt => {
        console.log('tribunal ajouté avec succès:', newcourt);
        this.router.navigate(['list-court']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de tribunal:', erreur);
      }
    );
  }

}
