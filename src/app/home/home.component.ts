import { Component, OnInit, ViewChildren, OnDestroy, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User, Timesheet } from '../_models';
import { TimesheetService, UserService, AlertService } from '../_services';
import { DataTableDirective } from 'angular-datatables';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: any = [];
  currentUser: User;
  timesheets: Timesheet[];
  dtTrigger1: Subject<any> = new Subject();
  settingChangeFlag = '';
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

    this.timesheetService.getCurrentUserTimesheet().pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
      this.dtTrigger1.next();
    });

    if (localStorage.getItem('SettingChanged') === 'true') {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.rerender();
      localStorage.setItem('SettingChanged', null);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger1.unsubscribe();
  }

  rerender(): void {
    this.timesheetService.getCurrentUserTimesheet().pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
      this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        if (dtElement.dtInstance != undefined) {
          dtElement.dtInstance.then((dtInstance: any) => {
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger1.next();
          });
        }
      });
    });
    localStorage.removeItem('SettingChanged');
  }

  private loadTimesheetDetails() {
    this.timesheetService.getCurrentUserTimesheet().pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
    });
  }

  filter(fromDate, toDate) {
    this.timesheetService.getTimesheetByDates(false, fromDate.toLocaleDateString(), toDate.toLocaleDateString()).pipe(first()).subscribe(timesheets => {
      this.timesheets = timesheets.timesheet;
    });

  }

  reset() {
    this.datepicker_from = null;
    this.datepicker_to = null;
    this.loadTimesheetDetails();
  }

  addTimesheet(): void {
    localStorage.removeItem("editTimesheetId");
    this.router.navigate(['add-timesheet']);
  };

  editTimesheet(id: number): void {
    localStorage.removeItem("editTimesheetId");
    localStorage.setItem("editTimesheetId", id.toString());
    this.router.navigate(['add-timesheet']);
  };

  deleteTimesheet(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.timesheetService.deleteTimesheet(id).pipe(first()).subscribe(timesheets => {
        this.alertService.success('Timesheet deleted successfully', false);
        this.rerender();

      });
    }
  }

  printPDF(timesheetsData) {
    const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];

    function buildTableBody(data, columns, columnHeaders) {
      let body = [];

      body.push(columnHeaders);
      let index = 1;
      data.forEach(function (row) {
        let dataRow = [];

        columns.forEach(function (column) {
          if (column == 'index') {
            dataRow.push(index);
          } else if (column == 'notes') {
            let noteData = '';
            row[column].forEach(function (note) {
              if (noteData == '') {
                noteData = '* ' + note['note'];
              } else {
                noteData = noteData + " \n * " + note['note'];
              }
            });
            dataRow.push(noteData.toString());
          } else if (column == 'dateWorked') {
            let date = new Date(row[column]);
            let monthIndex = date.getMonth();
            const parsedDate = monthNames[monthIndex] + ' ' + date.getDate() + ', ' + date.getFullYear();
            dataRow.push(parsedDate.toString());
          } else {
            dataRow.push(row[column].toString());
          }
        })
       body.push(dataRow);
        index++;
      });
      return body;
    }

    function table(data, columns) {
      return {
        table: {
          headerRows: 1,
          body: buildTableBody(data, columns, [{ text: 'S.No.', bold: true }, { text: 'Task Name', bold: true }, { text: 'Date', bold: true }, { text: 'Total Time', bold: true }, { text: 'Notes', bold: true }])
        }
      };
    }
    let docDefinition = {
      content: [
        { text: this.currentUser.firstName + ' Timesheet', style: 'header', bold: true, alignment: 'center', fontSize: 25 },
        table(timesheetsData, ['index', 'taskName', 'dateWorked', 'totalTime', 'notes'])
      ]
    };

    pdfMake.createPdf(docDefinition).download();
  }
}
