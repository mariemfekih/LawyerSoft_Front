import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { roleTranslator } from 'src/app/models/type/TranslatorFr/roleTranslator'; // Make sure this path is correct
import { Governorate } from 'src/app/models/type/governorate';
import { Role } from 'src/app/models/type/role'; // Make sure this path is correct
import { User } from 'src/app/models/user'; // Make sure this path is correct
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public user: User = new User();
  selectedUserId: number;

  selectedRole: Role = Role.LAWYER;
  roles = Object.values(Role);
  translateRole(role: Role): string {
    return roleTranslator.translateFrRole(role);
  }



  ngOnInit(): void {
    this.selectedGovernorate = Governorate.Ariana; 
  }
  governorates = Object.values(Governorate);
  selectedGovernorate: Governorate; 

  constructor(private userService: UserService,
              private router: Router) {}
              submitForm() {
                this.user.city = this.selectedGovernorate;
                this.user.role = this.selectedRole;
                console.log('Submitting user:', this.user);  // Log the user object before submitting
              
                this.userService.addUser(this.user).subscribe(
                  newUser => {
                    console.log('Utilisateur ajouté avec succès:', newUser);
                    this.router.navigate(['list-user']);
                  },
                  erreur => {
                    console.error('Erreur lors de l\'ajout d\'utilisateur:', erreur);
                  }
                );
              }
              
}

