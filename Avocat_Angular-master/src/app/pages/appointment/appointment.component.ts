import { Component, OnInit } from '@angular/core';
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
}
