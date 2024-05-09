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
      cin: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      city: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      active: ['', Validators.required],
      notLocked: ['', Validators.required]
    });
  
    const idUser = this.route.snapshot.params['id'];
    console.log('idUser:', idUser); 
    this.userService.getUserById(idUser).subscribe(data => {
      this.user = data as User;

        this.updateUserForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          cin: this.user.cin,
          email: this.user.email,
          password: this.user.password,
          confirmPassword: this.user.password,
          role: this.user.role,
          city: this.user.city,
          birthDate: this.user.birthDate,
          gender: this.user.gender,
          active: this.user.active,
          notLocked: this.user.notLocked
        });
      });
    }
  
    updateUser() {
      const idUser = this.route.snapshot.params['id']; // Use 'id' instead of 'idUser'
      const formData = this.updateUserForm.value;
      console.log(formData);
      this.userService.updateUser(idUser, formData).subscribe(data => {
        console.log(data);
        this.router.navigate(['list-user']);
      });
    }
    
  
  }

