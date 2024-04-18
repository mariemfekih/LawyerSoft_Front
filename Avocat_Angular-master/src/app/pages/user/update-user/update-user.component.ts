import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  user:User;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router ,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],      
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
    });
  
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe(data => {
      this.user = data as User;
  
      this.updateUserForm.patchValue({
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        role: this.user.role ,
        birthDate: this.user.birthDate,
        city: this.user.city,
        gender: this.user.gender
      });
    });
  }
  

  updateUser() {
    const id = this.route.snapshot.params['id'];
    const formData = this.updateUserForm.value;
    console.log(formData);
    this.userService.updateUser(id, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-case']);

    });
  }

  
}
