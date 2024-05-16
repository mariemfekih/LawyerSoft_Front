import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';


import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListUserComponent } from 'src/app/pages/user/list-user/list-user.component';
import { InfoUserComponent } from 'src/app/pages/user/info-user/info-user.component';
import { AddUserComponent } from 'src/app/pages/user/add-user/add-user.component';
import { UpdateUserComponent } from 'src/app/pages/user/update-user/update-user.component';

import { AddCaseComponent } from 'src/app/pages/case/add-case/add-case.component';
import { ListCaseComponent } from 'src/app/pages/case/list-case/list-case.component';
import { ListHonoraireComponent } from 'src/app/pages/honoraire/list-honoraire/list-honoraire.component';
import { AddHonoraireComponent } from 'src/app/pages/honoraire/add-honoraire/add-honoraire.component';
import { UpdateHonoraireComponent } from 'src/app/pages/honoraire/update-honoraire/update-honoraire.component';
import { UpdateCaseComponent } from 'src/app/pages/case/update-case/update-case.component';
import { InfoCaseComponent } from 'src/app/pages/case/info-case/info-case.component';
import { ListCourtComponent } from 'src/app/pages/court/list-court/list-court.component';
import { AddCourtComponent } from 'src/app/pages/court/add-court/add-court.component';
import { UpdateCourtComponent } from 'src/app/pages/court/update-court/update-court.component';
import { ListAuxiliaryComponent } from 'src/app/pages/auxiliary/list-auxiliary/list-auxiliary.component';
import { AddAuxiliaryComponent } from 'src/app/pages/auxiliary/add-auxiliary/add-auxiliary.component';
import { UpdateAuxiliaryComponent } from 'src/app/pages/auxiliary/update-auxiliary/update-auxiliary.component';
// import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentComponent } from 'src/app/pages/appointment/appointment.component';
import { ListContractComponent } from 'src/app/pages/contract/list-contract/list-contract.component';
import { InfoContractComponent } from 'src/app/pages/contract/info-contract/info-contract.component';
import { ListFolderComponent } from 'src/app/pages/folder/list-folder/list-folder.component';
import { InfoFolderComponent } from 'src/app/pages/folder/info-folder/info-folder.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ListUserComponent,
    InfoUserComponent,
    AddUserComponent,
    UpdateUserComponent,
  
    ListCaseComponent,
    AddCaseComponent,
    InfoCaseComponent,
    ListHonoraireComponent,
    AddHonoraireComponent,
    UpdateHonoraireComponent,
    UpdateCaseComponent,
    ListCourtComponent,
    AddCourtComponent,
    UpdateCourtComponent,
    ListAuxiliaryComponent,
    AddAuxiliaryComponent,
    UpdateAuxiliaryComponent,
    AppointmentComponent,
    ListContractComponent,
    InfoContractComponent,
    InfoFolderComponent,
    ListFolderComponent,
    ProfileComponent

  ]
})

export class AdminLayoutModule {}
