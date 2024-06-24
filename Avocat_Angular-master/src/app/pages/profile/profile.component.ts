import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roleTranslator } from 'src/app/models/type/TranslatorFr/roleTranslator';
import { Governorate } from 'src/app/models/type/governorate';
import { Role } from 'src/app/models/type/role';
import { User } from 'src/app/models/user';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import { CaseService } from 'src/app/services/case.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User; // Initialize user object to avoid undefined errors
  idUser: number;
  totalCases: number;
  totalAuxiliaries: number;
  updateProfileForm: FormGroup;
  governorates = Object.values(Governorate);
  selectedGovernorate: Governorate;
  translateUserRole(role: Role): string {
    return roleTranslator.translateFrRole(role);
  }
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private caseService: CaseService,
    private auxiliaryService: AuxiliaryService
  ) {}

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
      role: ['', Validators.required],
      cin: ['', Validators.required]
    });

    // Fetch user data and populate the form
    this.userService.getUserById(this.idUser).subscribe((data: User) => {
      this.user = data;

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

      // this.fetchProfileImage(this.user.profileImage);
    });

    // Load additional user details
    this.loadUserDetails(this.idUser);

    // Fetch total cases
    this.getCurrentTotalCases().subscribe(totalCases => {
      this.totalCases = totalCases;
      console.log(this.totalCases);
    });

    // Fetch total auxiliaries
    this.getCurrentTotalAuxiliaries().subscribe(totalAuxiliaries => {
      this.totalAuxiliaries = totalAuxiliaries;
      console.log(this.totalAuxiliaries);
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
        console.log(this.user);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Function to get current total cases
  getCurrentTotalCases(): Observable<number> {
    return this.caseService.getTotalCasesByUser(this.idUser);
  }

  // Function to get current total auxiliaries
  getCurrentTotalAuxiliaries(): Observable<number> {
    return this.auxiliaryService.getTotalAuxiliariesByUser(this.idUser);
  }

  // Function to update user profile including profile image
  updateUser(): void {
    if (this.updateProfileForm.invalid) {
      return;
    }
    const formData = this.updateProfileForm.value;
    this.user.username = formData.username;
    this.user.email = formData.email;
    this.user.firstName = formData.firstName;
    this.user.lastName = formData.lastName;
    this.user.city = formData.city;
    this.user.cin = formData.cin;
    this.user.birthDate = formData.birthDate;
    this.user.gender = formData.gender;

    // Call the UserService to update user details and profile image
    this.userService.updateUser(this.idUser, this.user).subscribe(data => {
      console.log(data);
      // Optionally navigate to another route after successful update
      this.router.navigate(['profile']);
    });
  }
}
