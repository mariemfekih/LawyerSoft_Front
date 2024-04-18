import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartInterneDto } from 'src/app/models/depart-interne';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourrierService } from 'src/app/services/courrier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-di',
  templateUrl: './update-di.component.html',
  styleUrls: ['./update-di.component.scss']
})
export class UpdateDiComponent implements OnInit {

  fileToUpload: File | null = null;
  numeroCourrier: string;
  di: DepartInterneDto;

  constructor(private courrierService: CourrierService,
              private authService:AuthenticationService,
              private userService:UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.numeroCourrier = params.get('numeroCourrier');
      this.loadCourrier();
    });
  }

  loadCourrier() {
    this.courrierService.getCourrierByNumero(this.numeroCourrier).subscribe(courrier => {
      this.di = courrier;
    });
  }

  onSubmit(deForm: NgForm) {
    const { dateCourrier, typeCourrier, reponse, parVoie, destinataire, degre, reponseExigee, sujet, etatAvancement, file } = deForm.value;
    const departInterne = {
      dateCourrier, typeCourrier, reponse, parVoie, destinataire, degre, reponseExigee, sujet, etatAvancement
    };

    this.courrierService.updateDepartInterne(this.numeroCourrier, departInterne, this.fileToUpload)
      .subscribe(updatedCourrier => {
        this.router.navigate(['list-di']);
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
