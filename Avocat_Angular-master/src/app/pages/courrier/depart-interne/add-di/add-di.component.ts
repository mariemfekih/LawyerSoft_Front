import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartInterneDto } from 'src/app/models/depart-interne';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-add-di',
  templateUrl: './add-di.component.html',
  styleUrls: ['./add-di.component.scss']
})
export class AddDiComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private courrierService:CourrierService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(diForm: NgForm) {
    const { numeroCourrier, dateCourrier, typeCourrier, reponse, parVoie, destinataire, degre, reponseExigee, sujet, etatAvancement, file } = diForm.value;
    const courrier = new DepartInterneDto(numeroCourrier, dateCourrier, typeCourrier, reponse, parVoie, destinataire, degre, reponseExigee, sujet, etatAvancement, file);

    this.courrierService.addDepartInterne(courrier, this.fileToUpload)
      .subscribe(savedCourrier => {
        this.router.navigate(['list-di']);
      });
  }



  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
