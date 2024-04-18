import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArriveeExterneDto } from 'src/app/models/arrivee-externe';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourrierService } from 'src/app/services/courrier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-ae',
  templateUrl: './update-ae.component.html',
  styleUrls: ['./update-ae.component.scss']
})
export class UpdateAeComponent implements OnInit {

  fileToUpload: File | null = null;
  numeroCourrier: string;
  ae: ArriveeExterneDto;

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
      this.ae = courrier;
    });
  }

  onSubmit(aeForm: NgForm) {
    const {dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement, file } = aeForm.value;
    const arriveeExterne = {
      dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement
    };

    this.courrierService.updateArriveeExterne(this.numeroCourrier, arriveeExterne, this.fileToUpload)
      .subscribe(updatedCourrier => {
        this.router.navigate(['list-ae']);
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


}
