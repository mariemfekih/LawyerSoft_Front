import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
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
import { ListCaseComponent } from 'src/app/pages/case/list-case/list-case.component';
import { AddCaseComponent } from 'src/app/pages/case/add-case/add-case.component';

import { UpdateHonoraireComponent } from 'src/app/pages/honoraire/update-honoraire/update-honoraire.component';
import { ListHonoraireComponent } from 'src/app/pages/honoraire/list-honoraire/list-honoraire.component';
import { AddHonoraireComponent } from 'src/app/pages/honoraire/add-honoraire/add-honoraire.component';
import { UpdateCaseComponent } from 'src/app/pages/case/update-case/update-case.component';
import { InfoCaseComponent } from 'src/app/pages/case/info-case/info-case.component';
import { ListCourtComponent } from 'src/app/pages/court/list-court/list-court.component';
import { AddCourtComponent } from 'src/app/pages/court/add-court/add-court.component';
import { UpdateCourtComponent } from 'src/app/pages/court/update-court/update-court.component';
import { AddAuxiliaryComponent } from 'src/app/pages/auxiliary/add-auxiliary/add-auxiliary.component';
import { ListAuxiliaryComponent } from 'src/app/pages/auxiliary/list-auxiliary/list-auxiliary.component';
import { UpdateAuxiliaryComponent } from 'src/app/pages/auxiliary/update-auxiliary/update-auxiliary.component';
import { DashboardAdminComponent } from 'src/app/pages/dashboard-admin/dashboard-admin.component';
import { AppointmentComponent } from 'src/app/pages/appointment/appointment.component';
import { ListContractComponent } from 'src/app/pages/contract/list-contract/list-contract.component';
import { InfoContractComponent } from 'src/app/pages/contract/info-contract/info-contract.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },

    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'list-user',           component: ListUserComponent },
    { path: 'info-user/:id',           component: InfoUserComponent },
    { path: 'add-user',           component: AddUserComponent },
    { path: 'update-user/:id',           component: UpdateUserComponent },
    { path: 'list-de',           component: ListDEComponent },
    { path: 'add-de',           component: AddDEComponent },
    { path: 'update-de/:numeroCourrier',           component: UpdateDEComponent },
    { path: 'list-di',           component: ListDiComponent },
    { path: 'add-di',           component: AddDiComponent },
    { path: 'update-di/:numeroCourrier',           component: UpdateDiComponent },
    { path: 'list-ae',           component: ListAeComponent },
    { path: 'add-ae',           component: AddAeComponent },
    { path: 'update-ae/:numeroCourrier',           component: UpdateAeComponent },
    { path: 'list-arrAeroport',           component: ListArrAeroportComponent },
    { path: 'add-arrAeroport',           component: AddArrAeroportComponent },
    { path: 'update-arrAeroport/:numeroCourrier',           component: UpdateArrAeroportComponent },
    { path: 'list-appOffre',           component: ListAppelOffreComponent },
    { path: 'add-appOffre',           component: AddAppelOffreComponent },
    { path: 'update-appOffre/:numeroCourrier',           component: UpdateAppelOffreComponent },
    { path: 'list-dossiers',           component: ListDossiersComponent },
    { path: 'detail-dossier/:idDossier',           component: DetailDossierComponent },
    { path: 'select-dossier/:numeroCourrier',           component: SelectDossierComponent },

    /*Case */
    { path: 'list-case',           component: ListCaseComponent },
    { path: 'add-case',           component: AddCaseComponent },
    { path: 'update-case/:idCase',           component: UpdateCaseComponent },
    { path: 'info-case/:idCase',           component: InfoCaseComponent },

  /*court */
  { path: 'list-court',           component: ListCourtComponent },
  { path: 'add-court',           component: AddCourtComponent },
  { path: 'update-court/:idCourt',           component: UpdateCourtComponent },

  /*auxiliaire */
  { path: 'list-auxiliary',           component: ListAuxiliaryComponent },
  { path: 'add-auxiliary',           component: AddAuxiliaryComponent },
  { path: 'update-auxiliary/:idAuxiliary',           component: UpdateAuxiliaryComponent },

  /**Appointlment */
  { path: 'appointment',      component: AppointmentComponent },
  /**Contract */
  { path: 'list-contract',      component: ListContractComponent},
  { path: 'info-contract',      component: InfoContractComponent},
  
/**
 * Admin
 */
{ path: 'dashboard-admin',      component: DashboardAdminComponent },
  
    { path: 'update-honoraire/:idHonoraire',           component: UpdateHonoraireComponent },
    { path: 'list-honoraire',           component: ListHonoraireComponent },
    { path: 'add-honoraire',           component: AddHonoraireComponent }

];
