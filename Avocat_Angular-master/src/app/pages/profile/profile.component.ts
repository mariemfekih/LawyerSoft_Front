import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { CaseService } from 'src/app/services/case.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User ; // Initialize user object to avoid undefined errors
  idUser: number;
  users: User[] = [];
  totalCases: number;
  updateProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router, private caseService: CaseService) { }

  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('id')!);

    // Initialize the form controls and setup form validation
    this.updateProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: ['', Validators.required], // Initialize role control
      cin: ['', Validators.required],
    });

    // Fetch user data and populate the form
    this.userService.getUserById(this.idUser).subscribe(data => {
      this.user = data as User;

      // Patch form values with user data
      this.updateProfileForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        city: this.user.city,
        gender: this.user.gender,
        birthDate: this.user.birthDate,
        role: this.user.role,
        cin: this.user.cin
      });
    });

    // Load additional user details
    this.loadUserDetails(this.idUser);

    // Fetch total cases
    this.getCurrentTotalCases().subscribe(totalCases => {
      this.totalCases = totalCases;
      console.log(this.totalCases);
    });
  }

  // Function to calculate age based on birth date
  age(birthDate: string): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }

  // Function to load additional user details
  loadUserDetails(idUser: number): void {
    this.userService.getUserById(idUser).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user)
      }, (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Function to get current total cases
  getCurrentTotalCases(): Observable<number> {
    return this.caseService.getTotalCasesByUser(this.idUser);
  }

  // Function to update user profile
  updateUser(): void {
    const formData = this.updateProfileForm.value;
    console.log(formData);
    this.userService.updateUser(this.idUser, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['list-user']);
    });
  }
}
