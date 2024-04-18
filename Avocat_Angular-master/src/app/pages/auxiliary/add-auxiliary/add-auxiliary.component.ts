import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auxiliary } from 'src/app/models/auxiliary';
import { Governorate } from 'src/app/models/type/governorate';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';

@Component({
  selector: 'app-add-auxiliary',
  templateUrl: './add-auxiliary.component.html',
  styleUrls: ['./add-auxiliary.component.scss']
})
export class AddAuxiliaryComponent implements OnInit {

  public auxiliary: Auxiliary = new Auxiliary();
  governorates = Object.values(Governorate);


  
  constructor(private auxiliaryService: AuxiliaryService,
              private router: Router) {}

  ngOnInit(): void { }

  submitForm() {

    this.auxiliaryService.addAuxiliary(this.auxiliary).subscribe(
      newauxiliary => {
        console.log('auxiliaire ajouté avec succès:', newauxiliary);
        this.router.navigate(['list-auxiliary']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'auxiliaire:', erreur);
      }
    );
  }
}
