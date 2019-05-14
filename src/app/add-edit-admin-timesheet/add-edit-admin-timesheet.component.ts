import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { TimesheetService, AlertService, UserService } from '../_services';
import { User } from '../_models';
import { first, debounceTime, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-edit-admin-timesheet',
  templateUrl: './add-edit-admin-timesheet.component.html'
})
export class AddEditAdminTimesheetComponent implements OnInit {
  addAdminTimesheetForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;
  showUpdateButton = false;
  filteredUsers: any[];
  isLoading = false;
  searchTerm: FormControl = new FormControl();
  selectedOption: string;
  dateWorked = '';
  constructor(private formBuilder: FormBuilder,
    private timesheetService: TimesheetService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.addAdminTimesheetForm = this.formBuilder.group({
      id: '',
      userId: '',
      taskName: ['', Validators.required],
      totalTime: ['', Validators.pattern('^[0-9]+$')],
      dateWorked: '',
      notes: this.formBuilder.array([this.formBuilder.group({ note: '' })]),
      createdBy: this.currentUser ? this.currentUser.username : 'admin',
      updatedBy: this.currentUser ? this.currentUser.username : 'admin'

    });

    this.searchTerm
      .valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.userService.lookupUser(value))
      )
      .subscribe(users => {
        if (users.length > 0) {
          this.filteredUsers = users;
        } else {
          this.filteredUsers = [{ username: "No Result Found" }];
        }
      });

    let timesheetData = localStorage.getItem('editTimesheetData');
    if (timesheetData) {
      this.showUpdateButton = true;
      let dataModel = JSON.parse(timesheetData);
      dataModel.id = (JSON.parse(timesheetData)._id).toString();
      this.searchTerm.patchValue(dataModel.user_details[0].username);
      this.dateWorked = dataModel.dateWorked;
      this.addAdminTimesheetForm.patchValue(dataModel);
      for (let i = 1; i < dataModel.notes.length; i++) {
        this.notesArray.push(this.formBuilder.group({ note: dataModel.notes[i].note.toString() }));
      }
    }
  }

  get f() { return this.addAdminTimesheetForm.controls; }

  get notesArray() {
    return this.addAdminTimesheetForm.get('notes') as FormArray;
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
    if (this.addAdminTimesheetForm.invalid) {
      return;
    }
    if (this.searchTerm.value == '') {
      this.alertService.error("Please select the valid User!");
      return;
    }
    this.userService.findByUserName(this.searchTerm.value)
      .subscribe(users => {
        if (users.length > 0) {
          this.selectedOption = (users[0]._id).toString();
          let timesheetData = localStorage.getItem('editTimesheetData');
          if (!timesheetData) {
            let dataModel = this.addAdminTimesheetForm.value;
            dataModel.userId = this.selectedOption;
            this.timesheetService.createTimesheet(dataModel)
              .subscribe(data => {
                this.alertService.success('Timesheet added successfully', true);
                this.router.navigate(['/all-timesheet-details']);
              },
                error => {
                  this.alertService.error(error);
                });
          } else {
            let dataModel = this.addAdminTimesheetForm.value;
            dataModel.userId = this.selectedOption ? this.selectedOption : (JSON.parse(timesheetData).userId).toString();
            this.timesheetService.updateTimesheet(dataModel)
              .pipe(first())
              .subscribe(
                data => {
                  this.alertService.success('Timesheet updated successfully', true);
                  this.router.navigate(['/all-timesheet-details']);
                },
                error => {
                  this.alertService.error(error);
                });
          }
        } else {
          this.alertService.error("Please select the valid User!");
          return;
        }
      });
    
  }

  goBack() {
    this.router.navigate(['/all-timesheet-details']);
  }
}
