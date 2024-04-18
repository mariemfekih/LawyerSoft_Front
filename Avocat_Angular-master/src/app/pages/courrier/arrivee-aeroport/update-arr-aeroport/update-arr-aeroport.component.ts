import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArriveeAeroportDto } from 'src/app/models/arrivee-aeroport';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourrierService } from 'src/app/services/courrier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-arr-aeroport',
  templateUrl: './update-arr-aeroport.component.html',
  styleUrls: ['./update-arr-aeroport.component.scss']
})
export class UpdateArrAeroportComponent implements OnInit {

  fileToUpload: File | null = null;
  numeroCourrier: string;
  arrAeroport: ArriveeAeroportDto;

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
    this.arrAeroport = courrier;
    });
  }

  onSubmit(arrAeroportForm: NgForm) {
    const {dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement, file } = arrAeroportForm.value;
    const arriveeAeroport = {
      dateCourrier, typeCourrier, parVoie, lien, expediteur, numOrigine, dateOrigine, degre, reponse, reponseExigee, sujet, etatAvancement
    };

    this.courrierService.UpdateArriveeAeroport(this.numeroCourrier, arriveeAeroport, this.fileToUpload)
      .subscribe(updatedCourrier => {
        this.router.navigate(['list-arrAeroport']);
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


}
