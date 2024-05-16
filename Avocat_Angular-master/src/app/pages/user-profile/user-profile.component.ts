import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Role } from 'src/app/models/type/role';
import { User } from 'src/app/models/user';
import { CaseService } from 'src/app/services/case.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  idUser: number;
  userProfileForm: FormGroup;
  users:User[]=[];
  totalCases:number;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,private caseService: CaseService
  ) {}
  ngOnInit(): void {
  
    this.idUser = JSON.parse(localStorage.getItem('id')!);

    ////////////////
    this.userProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: [this.user?.role, Validators.required],
      cin: ['', Validators.required],
    });
  
    this.userService.getUserById(this.idUser).subscribe(data => {
      this.user = data as User;
  
      this.userProfileForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        city: this.user.city ,
        gender: this.user.gender,
        birthDate: this.user.birthDate,
        role: this.user?.role,
        cin: this.user.cin
      });
    });
    ////////////////
    this.loadUserDetails(this.idUser);
    this.getCurrentTotalCases().subscribe(totalCases => {
      this.totalCases = totalCases;
      console.log(this.totalCases);
    });

  }




  loadUserDetails(idUser: number) {
    this.userService.getUserById(idUser).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user)
        if (this.userProfileForm) { // Ensure userProfileForm is initialized
          this.userProfileForm.patchValue({
              username: this.user.username,
              email: this.user.email,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              city: this.user.city,
              gender: this.user.gender, // Assuming gender is a boolean value
              birthDate: this.user.birthDate,
              role: this.user.role,
              cin: this.user.cin,
          });
      }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
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
  
  getCurrentTotalCases(): Observable<number> {
    return this.caseService.getTotalCasesByUser(this.idUser);
  }
  

  updateProfile() {
    if (this.userProfileForm.valid) {
      const formData = this.userProfileForm.value;
      // Call your service method to update user profile
      this.userService.updateUser(this.idUser, formData).subscribe(
        (response) => {
          console.log('User profile updated successfully:', response);
          // Redirect to user profile page or any other page
          this.router.navigate(['/user-profile', this.idUser]);
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    } else {
      // Form is invalid, do something (e.g., display error messages)
    }
  }
}
