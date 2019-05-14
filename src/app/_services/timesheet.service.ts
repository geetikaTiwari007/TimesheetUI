import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Timesheet } from '../_models';

@Injectable()
export class TimesheetService {

    constructor(private http: HttpClient) { }

    getAllTimesheet() {
        return this.http.get<{ timesheet: Timesheet[] }>(`${environment.apiUrl}/timesheet/`);
    }

    getCurrentUserTimesheet() {
        return this.http.get<{ timesheet: Timesheet[] }>(`${environment.apiUrl}/timesheet/current`);
    }

    getTimesheetByDates(all, fromDate, toDate) {
        let params = new HttpParams();
        params = params.append("fromDate", fromDate);
        params = params.append("toDate", toDate);
        return this.http.get<{ timesheet: Timesheet[] }>(`${environment.apiUrl}/timesheet/filterByDates`, { params: { "All": all, "fromDate": fromDate, "toDate": toDate } });
    }

    createTimesheet(reqBody) {
        return this.http.post(`${environment.apiUrl}/timesheet/createTimesheet`, reqBody);
    }

    deleteTimesheet(id: number) {
        return this.http.delete(`${environment.apiUrl}/timesheet/` + id);
    }

    getTimesheetById(id) {
        return this.http.get<{ timesheet: Timesheet }>(`${environment.apiUrl}/timesheet/` + id);
    }

    updateTimesheet(timesheet: Timesheet) {
        return this.http.put(`${environment.apiUrl}/timesheet/` + timesheet.id, timesheet);
    }
}
