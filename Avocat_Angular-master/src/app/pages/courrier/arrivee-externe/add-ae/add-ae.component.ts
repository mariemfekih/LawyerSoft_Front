import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ArriveeExterneDto } from 'src/app/models/arrivee-externe';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-add-ae',
  templateUrl: './add-ae.component.html',
  styleUrls: ['./add-ae.component.scss']
})
export class AddAeComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private courrierService:CourrierService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(aeForm: NgForm) {
    const { numeroCourrier, dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement, file } = aeForm.value;
    const courrier = new ArriveeExterneDto(numeroCourrier, dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement, file);

    this.courrierService.addArriveeExterne(courrier, this.fileToUpload)
      .subscribe(savedCourrier => {
        this.router.navigate(['list-ae']);
      });
  }



  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
