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
import { AppointmentComponent } from 'src/app/pages/appointment/appointment.component';
import { ListContractComponent } from 'src/app/pages/contract/list-contract/list-contract.component';
import { InfoContractComponent } from 'src/app/pages/contract/info-contract/info-contract.component';
import { ListFolderComponent } from 'src/app/pages/folder/list-folder/list-folder.component';
import { InfoFolderComponent } from 'src/app/pages/folder/info-folder/info-folder.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'profile',   component: ProfileComponent },

    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'list-user',           component: ListUserComponent },
    { path: 'info-user/:id',           component: InfoUserComponent },
    { path: 'add-user',           component: AddUserComponent },
    { path: 'update-user/:id',           component: UpdateUserComponent },
   

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

    /**folder */
    { path: 'list-folder',      component: ListFolderComponent},
    { path: 'info-folder',      component: InfoFolderComponent},


    { path: 'update-honoraire/:idHonoraire',           component: UpdateHonoraireComponent },
    { path: 'list-honoraire',           component: ListHonoraireComponent },
    { path: 'add-honoraire',           component: AddHonoraireComponent }

];
