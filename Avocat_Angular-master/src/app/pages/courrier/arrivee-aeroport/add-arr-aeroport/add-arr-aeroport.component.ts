import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ArriveeAeroportDto } from 'src/app/models/arrivee-aeroport';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-add-arr-aeroport',
  templateUrl: './add-arr-aeroport.component.html',
  styleUrls: ['./add-arr-aeroport.component.scss']
})
export class AddArrAeroportComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private courrierService:CourrierService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(arrAeroportForm: NgForm) {
    const { numeroCourrier, dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement, file } = arrAeroportForm.value;
    const courrier = new ArriveeAeroportDto(numeroCourrier, dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement, file);

    this.courrierService.addArriveeAeroport(courrier, this.fileToUpload)
      .subscribe(savedCourrier => {
        this.router.navigate(['list-arrAeroport']);
      });
  }



  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
