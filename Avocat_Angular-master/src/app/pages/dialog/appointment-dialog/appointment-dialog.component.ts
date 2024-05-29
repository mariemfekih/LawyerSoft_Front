import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentType } from 'src/app/models/type/AppointmentType';
import { LocationType } from 'src/app/models/type/LocationType';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import { Auxiliary } from 'src/app/models/auxiliary';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {
  appointmentForm: FormGroup;
  selectedAppointmentType: AppointmentType = AppointmentType.MEETING;
  appointmentTypes = Object.values(AppointmentType);
  selectedLocationType: LocationType = LocationType.ONLINE;
  locationTypes = Object.values(LocationType);

  idUser:number;
  auxiliaries: Auxiliary[] = [];

  constructor( private auxiliaryService: AuxiliaryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      linkHangout: [''],
      location: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('id')!);

    this.auxiliaryService.getAuxiliariesByUserId(this.idUser).subscribe(
      (data: Auxiliary[]) => {
        console.log('Auxiliaries fetched:', data);
        this.auxiliaries = data;
      },
      error => {
        console.error('Error fetching auxiliaries:', error);
      }
    );  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

}
