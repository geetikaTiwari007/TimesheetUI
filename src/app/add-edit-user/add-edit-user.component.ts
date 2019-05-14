import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService, AlertService } from '../_services';
import { User } from '../_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html'
})
export class AddEditUserComponent implements OnInit {
  addUserForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;
  showUpdateButton = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    let editUserId = localStorage.getItem('editUserId');
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [editUserId ? 'Admin123' : '', [Validators.required, Validators.minLength(6)]],
      editpassword: ['', Validators.minLength(6)],
      firstName: '',
      lastName: '',
      role: ['', Validators.required],
      preferWorkHrs: 0,
      createdBy: this.currentUser ? this.currentUser.username : 'admin',
      updatedBy: this.currentUser ? this.currentUser.username : 'admin'

    });

    if (editUserId) {
      this.showUpdateButton = true;
      this.userService.getById(editUserId).pipe(first()).subscribe(users => {
        this.addUserForm.patchValue(users.user);
      });
    }
  }

  get f() { return this.addUserForm.controls; }

  onSubmit() {
    let id = localStorage.getItem('editUserId');
    if (!id) {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addUserForm.invalid) {
        return;
      }
      this.loading = true;
      this.userService.register(this.addUserForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('User added successfully', true);
            this.router.navigate(['/user-details']);
          },
          error => {
            this.alertService.error(error);

          });

    } else {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addUserForm.invalid) {
        return;
      }
      let dataModel = this.addUserForm.value;
      dataModel.id = id;

      if (dataModel.editpassword == '') {
        delete dataModel.editpassword;
        delete dataModel.password;
      } else {
        dataModel.password = dataModel.editpassword;
        delete dataModel.editpassword;
      }

      this.userService.update(dataModel)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('User updated successfully', true);
            this.router.navigate(['/user-details']);
          },
          error => {
            this.alertService.error(error);
          });
    }
  }

  goBack() {
    this.router.navigate(['/user-details']);
  }
}
