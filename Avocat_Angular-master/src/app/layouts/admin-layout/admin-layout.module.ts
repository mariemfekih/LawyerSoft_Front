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
import { ListDEComponent } from 'src/app/pages/courrier/depart-externe/list-de/list-de.component';
import { AddDEComponent } from 'src/app/pages/courrier/depart-externe/add-de/add-de.component';
import { UpdateDEComponent } from 'src/app/pages/courrier/depart-externe/update-de/update-de.component';
import { ListDiComponent } from 'src/app/pages/courrier/depart-interne/list-di/list-di.component';
import { AddDiComponent } from 'src/app/pages/courrier/depart-interne/add-di/add-di.component';
import { UpdateDiComponent } from 'src/app/pages/courrier/depart-interne/update-di/update-di.component';
import { ListAeComponent } from 'src/app/pages/courrier/arrivee-externe/list-ae/list-ae.component';
import { AddAeComponent } from 'src/app/pages/courrier/arrivee-externe/add-ae/add-ae.component';
import { UpdateAeComponent } from 'src/app/pages/courrier/arrivee-externe/update-ae/update-ae.component';
import { ListArrAeroportComponent } from 'src/app/pages/courrier/arrivee-aeroport/list-arr-aeroport/list-arr-aeroport.component';
import { AddArrAeroportComponent } from 'src/app/pages/courrier/arrivee-aeroport/add-arr-aeroport/add-arr-aeroport.component';
import { UpdateArrAeroportComponent } from 'src/app/pages/courrier/arrivee-aeroport/update-arr-aeroport/update-arr-aeroport.component';
import { ListAppelOffreComponent } from 'src/app/pages/courrier/appel-offre/list-appel-offre/list-appel-offre.component';
import { AddAppelOffreComponent } from 'src/app/pages/courrier/appel-offre/add-appel-offre/add-appel-offre.component';
import { UpdateAppelOffreComponent } from 'src/app/pages/courrier/appel-offre/update-appel-offre/update-appel-offre.component';
import { ListDossiersComponent } from 'src/app/pages/dossier/list-dossiers/list-dossiers.component';
import { DetailDossierComponent } from 'src/app/pages/dossier/detail-dossier/detail-dossier.component';
import { SelectDossierComponent } from 'src/app/pages/dossier/select-dossier/select-dossier.component';
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
import { DashboardAdminComponent } from 'src/app/pages/dashboard-admin/dashboard-admin.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
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
    ListDEComponent,
    AddDEComponent,
    UpdateDEComponent,
    ListDiComponent,
    AddDiComponent,
    UpdateDiComponent,
    ListAeComponent,
    AddAeComponent,
    UpdateAeComponent,
    ListArrAeroportComponent,
    AddArrAeroportComponent,
    UpdateArrAeroportComponent,
    ListAppelOffreComponent,
    AddAppelOffreComponent,
    UpdateAppelOffreComponent,
    ListDossiersComponent,
    DetailDossierComponent,
    SelectDossierComponent,
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
    DashboardAdminComponent

  ]
})

export class AdminLayoutModule {}
