import { Component, OnInit, ViewChildren, OnDestroy, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User, Timesheet } from '../_models';
import { TimesheetService, UserService, AlertService } from '../_services';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-all-timesheet-details',
  templateUrl: './all-timesheet-details.component.html'

})
export class AllTimesheetDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  currentUser: User;
  timesheets: Timesheet[];
  dtTrigger3: Subject<any> = new Subject();
  datepicker_from = '';
  datepicker_to = '';

  constructor(private userService: UserService,
    private timesheetService: TimesheetService,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.timesheetService.getAllTimesheet().pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
      this.dtTrigger3.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger3.unsubscribe();
  }

  rerender(): void {
    this.timesheetService.getAllTimesheet().pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
      this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        dtElement.dtInstance.then((dtInstance: any) => {
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger3.next();
        });
      });
    });
  }

  private loadTimesheetDetails() {
    this.timesheetService.getAllTimesheet().pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
    });
  }

  filter(fromDate, toDate) {
    this.timesheetService.getTimesheetByDates(true, fromDate.toLocaleDateString(), toDate.toLocaleDateString()).pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
    });
  }

  reset() {
    this.datepicker_from = null;
    this.datepicker_to = null;
    this.loadTimesheetDetails();
  }

  addTimesheet(): void {
    localStorage.removeItem("editTimesheetData");
    this.router.navigate(['add-edit-admin-timesheet']);
  };

  editTimesheet(timesheetData): void {
    localStorage.removeItem("editTimesheetData");
    localStorage.setItem('editTimesheetData', JSON.stringify(timesheetData));
    this.router.navigate(['add-edit-admin-timesheet']);
  };

  deleteTimesheet(id) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.timesheetService.deleteTimesheet(id).pipe(first()).subscribe(timesheets => {
        this.alertService.success('Timesheet deleted successfully', false);
        this.rerender();
      });
    }
  }
}
