import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import Swal from 'sweetalert2';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentType } from 'src/app/models/type/AppointmentType';
import { LocationType } from 'src/app/models/type/LocationType';
import { AppointmentTypeTranslator } from 'src/app/models/type/TranslatorFr/appointmentTypeTranslator';
import { LocationTypeTranslator } from 'src/app/models/type/TranslatorFr/locationTypeTranslator';

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
    eventClick: this.handleEventClick.bind(this)
  };
  id: number;

  selectedLocationType: LocationType = LocationType.ONLINE;
  selectedAppointmentType: AppointmentType = AppointmentType.CONSULTATION;
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments(this.id).subscribe((appointments) => {
      this.calendarOptions.events = appointments.map((appointment) => ({
        id: appointment.idAppointment.toString(),
        title: appointment.title,
        start: `${appointment.date}T${appointment.startTime}`,
        end: `${appointment.date}T${appointment.endTime}`,
        extendedProps: {
          description: appointment.description,
          type: AppointmentTypeTranslator.translateFrAppointment(appointment.type),
          linkHangout: appointment.linkHangout,
          location: LocationTypeTranslator.translateFrLocation(appointment.location)
        }
      }));
    });
  }

  handleEventClick(arg: EventClickArg) {
    const event = arg.event;
    const { id } = event;

    Swal.fire({
      title: `<strong>${event.title}</strong>`,
      html: `
        <div><strong>Date:</strong> ${event.start?.toLocaleDateString()}</div>
        <div><strong>Heure de début:</strong> ${event.start?.toLocaleTimeString()}</div>
        <div><strong>Heure de fin:</strong> ${event.end?.toLocaleTimeString()}</div>
        <div><strong>Type:</strong> ${event.extendedProps.type}</div>
        <div><strong>Location:</strong> ${event.extendedProps.location}</div>
        <div><strong>Description:</strong> ${event.extendedProps.description}</div>
        <div><strong>Lien GoogleMeet:</strong> <a href="${event.extendedProps.linkHangout}" target="_blank">${event.extendedProps.linkHangout}</a></div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Supprimer',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.openUpdateDialog(event);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.deleteAppointment(Number(id));
      }
    });
  }

  openUpdateDialog(event: any): void {
    const { id, title, start, end, extendedProps } = event;
    const { description, type, linkHangout, location } = extendedProps;

    Swal.fire({
      title: '<h3 class="mb-0">Modifier le Rendez-vous</h3>',
      html: `
        <form id="appointmentForm">
          <div class="form-group">
            <label class="form-control-label" for="title">Titre *</label>
            <input type="text" id="title" name="title" class="form-control form-control-alternative" value="${title}" required>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="description">Description</label>
            <textarea id="description" name="description" class="form-control form-control-alternative">${description}</textarea>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="startTime">Heure de début *</label>
                <input type="time" id="startTime" name="startTime" class="form-control form-control-alternative" value="${start?.toLocaleTimeString().substring(0, 5)}" required>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="endTime">Heure de fin *</label>
                <input type="time" id="endTime" name="endTime" class="form-control form-control-alternative" value="${end?.toLocaleTimeString().substring(0, 5)}" required>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="date">Date *</label>
            <input type="date" id="date" name="date" class="form-control form-control-alternative" value="${start?.toLocaleDateString('en-CA')}" required>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="type">Type *</label>
                <select id="type" name="type" class="form-control form-control-alternative" required>
                  ${Object.values(AppointmentType).map(t => `
                    <option value="${t}" ${t === type ? 'selected' : ''}>${AppointmentTypeTranslator.translateFrAppointment(t)}</option>
                  `).join('')}
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="location">Location *</label>
                <select id="location" name="location" class="form-control form-control-alternative" required>
                  ${Object.values(LocationType).map(loc => `
                    <option value="${loc}" ${loc === location ? 'selected' : ''}>${LocationTypeTranslator.translateFrLocation(loc)}</option>
                  `).join('')}
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="linkHangout">Lien GoogleMeet</label>
            <input type="text" id="linkHangout" name="linkHangout" class="form-control form-control-alternative" value="${linkHangout}">
          </div>
        </form>
      `,
      width: '800px',
      showCancelButton: true,
      confirmButtonText: 'Mettre à jour',
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const startTime = (document.getElementById('startTime') as HTMLInputElement).value;
        const endTime = (document.getElementById('endTime') as HTMLInputElement).value;
        const date = (document.getElementById('date') as HTMLInputElement).value;
        const type = (document.getElementById('type') as HTMLSelectElement).value;
        const linkHangout = (document.getElementById('linkHangout') as HTMLInputElement).value;
        const location = (document.getElementById('location') as HTMLSelectElement).value;

        if (!title || !startTime || !endTime || !date || !type || !location) {
          Swal.showValidationMessage('Tous les champs obligatoires doivent être remplis');
          return false;
        }

        return {
          idAppointment: Number(id),
          title,
          description,
          startTime,
          endTime,
          date,
          type,
          linkHangout,
          location,
        };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.updateAppointment(result.value);
      }
    });
  }

  updateAppointment(updatedAppointment: Appointment) {
    this.appointmentService.updateAppointment(updatedAppointment.idAppointment, updatedAppointment).subscribe(() => {
      this.loadAppointments();
    });
  }

  deleteAppointment(idAppointment: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas annuler cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(idAppointment).subscribe(() => {
          this.loadAppointments();
          Swal.fire('Supprimé!', 'Le rendez-vous a été supprimé.', 'success');
        });
      }
    });
  }

  openDialog(): void {
    Swal.fire({
      title: '<h3 class="mb-0">Ajouter un Rendez-vous</h3>',
      html: `
        <form id="appointmentForm">
          <div class="form-group">
            <label class="form-control-label text-left" for="title">Titre *</label>
            <input type="text" id="title" name="title" class="form-control form-control-alternative" placeholder="Entrez le titre" required>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="description">Description *</label>
            <textarea id="description" name="description" class="form-control form-control-alternative" placeholder="Entrez la description"></textarea>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="startTime">Heure de début *</label>
                <input type="time" id="startTime" name="startTime" class="form-control form-control-alternative" placeholder="HH:mm" required>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="endTime">Heure de fin *</label>
                <input type="time" id="endTime" name="endTime" class="form-control form-control-alternative" placeholder="HH:mm" required>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="date">Date *</label>
            <input type="date" id="date" name="date" class="form-control form-control-alternative" placeholder="yyyy-MM-dd" required>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="type">Type *</label>
                <select id="type" name="type" class="form-control form-control-alternative" required>
                  ${Object.values(AppointmentType).map(type => `
                    <option value="${type}" ${type === this.selectedAppointmentType ? 'selected' : ''}>${AppointmentTypeTranslator.translateFrAppointment(type)}</option>
                  `).join('')}
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="location">Location *</label>
                <select id="location" name="location" class="form-control form-control-alternative" required>
                  ${Object.values(LocationType).map(location => `
                    <option value="${location}" ${location === this.selectedLocationType ? 'selected' : ''}>${LocationTypeTranslator.translateFrLocation(location)}</option>
                  `).join('')}
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="linkHangout">Lien GoogleMeet *<p>(S'il n'y a pas de lien Meet, écrivez qu'il n'y en a pas.)</p></label>
            <input type="text" id="linkHangout" name="linkHangout" class="form-control form-control-alternative" placeholder="Entrez le lien GoogleMeet">
          </div>
        </form>
      `,
      width: '800px',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const startTime = (document.getElementById('startTime') as HTMLInputElement).value;
        const endTime = (document.getElementById('endTime') as HTMLInputElement).value;
        const date = (document.getElementById('date') as HTMLInputElement).value;
        const type = (document.getElementById('type') as HTMLSelectElement).value;
        const linkHangout = (document.getElementById('linkHangout') as HTMLInputElement).value;
        const location = (document.getElementById('location') as HTMLSelectElement).value;
  
        if (!title || !startTime || !endTime || !date || !type || !location) {
          Swal.showValidationMessage('Tous les champs obligatoires doivent être remplis');
          return false;
        }
  
        return {
          title,
          description,
          startTime,
          endTime,
          date,
          type,
          linkHangout,
          location,
        };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.appointmentService.addAppointment(this.id, result.value).subscribe(() => {
          this.loadAppointments();
        });
      }
    });
  }
}  