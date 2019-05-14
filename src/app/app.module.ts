import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, TimesheetService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DataTablesModule } from 'angular-datatables';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AddTimesheetComponent } from './add-timesheet/add-timesheet.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { AllUserDetailsComponent } from './all-user-details/all-user-details.component';
import { AllTimesheetDetailsComponent } from './all-timesheet-details/all-timesheet-details.component';
import { AddEditAdminTimesheetComponent } from './add-edit-admin-timesheet/add-edit-admin-timesheet.component';


import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        DataTablesModule,
        DatePickerModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AddTimesheetComponent,
        AddEditUserComponent,
        AllUserDetailsComponent,
        AllTimesheetDetailsComponent,
        AddEditAdminTimesheetComponent,
        UserSettingComponent,
        ChangePasswordComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        TimesheetService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
