import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AddTimesheetComponent } from './add-timesheet';
import { AllUserDetailsComponent } from './all-user-details';
import { AddEditUserComponent } from './add-edit-user';
import { AllTimesheetDetailsComponent } from './all-timesheet-details';
import { AddEditAdminTimesheetComponent } from './add-edit-admin-timesheet';
import { UserSettingComponent } from './user-setting';
import { ChangePasswordComponent } from './change-password';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add-timesheet', component: AddTimesheetComponent },
    { path: 'user-details', component: AllUserDetailsComponent },
    { path: 'add-edit-user', component: AddEditUserComponent },
    { path: 'all-timesheet-details', component: AllTimesheetDetailsComponent },
    { path: 'add-edit-admin-timesheet', component: AddEditAdminTimesheetComponent },
    { path: 'user-setting', component: UserSettingComponent },
    { path: 'change-password', component: ChangePasswordComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
