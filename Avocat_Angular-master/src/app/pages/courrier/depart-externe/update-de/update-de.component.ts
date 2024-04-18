import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartExterneDto } from 'src/app/models/depart-externe';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourrierService } from 'src/app/services/courrier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-de',
  templateUrl: './update-de.component.html',
  styleUrls: ['./update-de.component.scss']
})
export class UpdateDEComponent implements OnInit {

  fileToUpload: File | null = null;
  numeroCourrier: string;
  de: DepartExterneDto;

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
      this.de = courrier;
    });
  }

  onSubmit(deForm: NgForm) {
    const { dateCourrier, typeCourrier, expediteur, destinataire, degre, sujet, reponse, etatAvancement, file } = deForm.value;
    const departExterne = {
      dateCourrier, typeCourrier, expediteur, destinataire, degre, sujet, reponse, etatAvancement
    };

    this.courrierService.updateDepartExterne(this.numeroCourrier, departExterne, this.fileToUpload)
      .subscribe(updatedCourrier => {
        this.router.navigate(['list-de']);
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}

