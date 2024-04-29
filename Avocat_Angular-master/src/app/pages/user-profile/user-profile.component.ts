import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userId: number;
  userProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];

    this.userProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: ['', Validators.required],
      cin: ['', Validators.required],
    });

    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.user = user;
        this.userProfileForm.patchValue({
          username: user.username,
          email: user.email,
          cin: user.cin,
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          gender: user.gender,
          birthDate: user.birthDate,
          role: user.role,

        });
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  updateProfile() {
    if (this.userProfileForm.valid) {
      const formData = this.userProfileForm.value;
      // Call your service method to update user profile
      this.userService.updateUser(this.userId, formData).subscribe(
        (response) => {
          console.log('User profile updated successfully:', response);
          // Redirect to user profile page or any other page
          this.router.navigate(['/user-profile', this.userId]);
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
