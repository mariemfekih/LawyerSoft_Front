import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/models/court';
import { CourtTypeTranslator } from 'src/app/models/type/TranslatorFr/courtTypeTranslator';
import { CourtGouv } from 'src/app/models/type/courtGov';
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

  selectedCourtType: CourtType = CourtType.FIRST_INSTANCE;
  courtTypes = Object.values(CourtType);
  translateCourtType(type: CourtType): string {
    return CourtTypeTranslator.translateFrType(type);
  }
  governorates = Object.values(CourtGouv);
  selectedGovernorate: CourtGouv; 

  constructor(private courtService: CourtService,
              private router: Router) {}

  ngOnInit(): void {
    this.selectedGovernorate = CourtGouv.Ariana; 
  }

  submitForm() {
    this.court.type = this.selectedCourtType;
    this.court.governorate = this.selectedGovernorate; 

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
