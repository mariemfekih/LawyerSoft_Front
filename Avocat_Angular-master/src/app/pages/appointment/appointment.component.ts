import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentDialogComponent } from '../dialog/appointment-dialog/appointment-dialog.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: frLocale,
    plugins: [dayGridPlugin],
    events: [],
  };

  constructor(private appointmentService: AppointmentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.calendarOptions.events = appointments.map(appointment => ({
        id: appointment.idAppointment.toString(),
        title: appointment.title,
        start: `${appointment.date}T${appointment.startTime}`,
        end: `${appointment.date}T${appointment.endTime}`
      }));
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.addAppointment(1, result).subscribe(() => {
          this.loadAppointments();
        });
      }
    });
  }
}

/*import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr'; // Importez le package de localisation française

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: frLocale, // Définissez la localisation sur française
    plugins: [dayGridPlugin],
    events: [],
  };

  constructor() { }

  ngOnInit(): void {
  }

  handleDateClick(arg) {
    alert('Vous avez cliqué sur: ' + arg.dateStr);
  }
}*/
