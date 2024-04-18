import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartExterneDto } from 'src/app/models/depart-externe';
//import { File  } from 'src/app/models/file';
import { CourrierService } from 'src/app/services/courrier.service';

@Component({
  selector: 'app-add-de',
  templateUrl: './add-de.component.html',
  styleUrls: ['./add-de.component.scss']
})
export class AddDEComponent implements OnInit {

fileToUpload: File = null;

  constructor(private courrierService:CourrierService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(deForm: NgForm) {
    const { numeroCourrier, dateCourrier, typeCourrier, expediteur, destinataire, degre, sujet, reponse, etatAvancement, file } = deForm.value;
    const courrier = new DepartExterneDto(numeroCourrier,dateCourrier, typeCourrier, expediteur, destinataire, degre, sujet, reponse, etatAvancement, file);

    this.courrierService.addDepartExterne(courrier, this.fileToUpload)
      .subscribe(savedCourrier => {
        this.router.navigate(['list-de']);
      });
  }



  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}

