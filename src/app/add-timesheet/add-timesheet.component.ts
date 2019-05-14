import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { TimesheetService, AlertService } from '../_services';
import { User } from '../_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html'

})
export class AddTimesheetComponent implements OnInit {
  addTimesheetForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;
  showUpdateButton = false;
  dateWorked : any;
  constructor(private formBuilder: FormBuilder,
    private timesheetService: TimesheetService,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {

    this.addTimesheetForm = this.formBuilder.group({
      id: '',
      userId: this.currentUser._id,
      taskName: ['', Validators.required],
      totalTime: ['', Validators.pattern('^[0-9]+$')],
      dateWorked: '',
      notes: this.formBuilder.array([this.formBuilder.group({ note: '' })]),
      createdBy: this.currentUser ? this.currentUser.username : 'admin',
      updatedBy: this.currentUser ? this.currentUser.username : 'admin',
    });
    let timesheetId = localStorage.getItem('editTimesheetId');
    if (timesheetId) {
      this.showUpdateButton = true;
      this.timesheetService.getTimesheetById(timesheetId).pipe(first()).subscribe(timesheets => {
        let dataModel = timesheets.timesheet;
        dataModel.id = timesheetId;
        dataModel.userId = this.currentUser._id;
        this.dateWorked = dataModel.dateWorked;
        this.addTimesheetForm.patchValue(dataModel);
        for (let i = 1; i < dataModel.notes.length; i++) {
          this.notesArray.push(this.formBuilder.group({ note: dataModel.notes[i].note.toString() }));
        }
      });
    }
  }

  get f() { return this.addTimesheetForm.controls; }

  get notesArray() {
    return this.addTimesheetForm.get('notes') as FormArray;
  }

  addNotes() {
    this.notesArray.push(this.formBuilder.group({ note: '' }));
  }

  deleteNotes(index) {
    this.notesArray.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addTimesheetForm.invalid) {
      return;
    }
    let id = localStorage.getItem('editTimesheetId');
    if (!id) {
      
      this.timesheetService.createTimesheet(this.addTimesheetForm.value)
        .subscribe(data => {
          this.alertService.success('Timesheet added successfully', true);
          this.router.navigate(['/']);
        },
          error => {
            this.alertService.error(error);
          });
    } else {
      this.timesheetService.updateTimesheet(this.addTimesheetForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Timesheet updated successfully', true);
            this.router.navigate(['/']);
          },
          error => {
            this.alertService.error(error);
          });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
