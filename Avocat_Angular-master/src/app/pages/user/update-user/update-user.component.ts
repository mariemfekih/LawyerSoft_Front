import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { roleTranslator } from 'src/app/models/type/TranslatorFr/roleTranslator';
import { Role } from 'src/app/models/type/role';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  roles = Object.values(Role);
  selectedRole: Role = Role.LAWYER; // Valeur initiale
  translateRole(role: Role): string {
    return roleTranslator.translateFrRole(role);
  }
  user: User;
  updateUserForm: FormGroup;
  idUser: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      city: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      isActive: ['', Validators.required],
      isNotLocked: ['', Validators.required]
    });
  
    const idUser = this.route.snapshot.params['id'];
    this.userService.getUserById(idUser).subscribe(data => {
      this.user = data as User;

        this.updateUserForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
          confirmPassword: this.user.password,
          role: this.user.role,
          city: this.user.city,
          birthDate: this.user.birthDate,
          gender: this.user.gender,
          isActive: this.user.isActive,
          isNotLocked: this.user.isNotLocked
        });
      });
    }
  
  updateUser() {
    const idUser = this.route.snapshot.params['idUser'];
    const formData = this.updateUserForm.value;
    console.log(formData);
    this.userService.updateUser(idUser, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-user']);

    });
  
  }
  
 /* updateUser() {
    const formData = this.updateUserForm.value;
    console.log(formData);
    this.userService.updateUser(this.idUser, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-user']);
    });
  }*/
}