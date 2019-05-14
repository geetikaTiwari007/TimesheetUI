import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService, AlertService } from '../_services';
import { User } from '../_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html'
})
export class UserSettingComponent implements OnInit {
  userSettingForm: FormGroup;
  currentUser: User;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.userSettingForm = this.formBuilder.group({
      preferWorkHrs: this.currentUser.preferWorkHrs,
      updatedBy: this.currentUser ? this.currentUser.username : 'admin'

    });
  }

  updateUserSetting() {
   let dataModel = this.userSettingForm.value;
    dataModel.id = this.currentUser._id;
    this.userService.updateUserPatch(dataModel)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('User updated successfully', true);
          this.userService.getCurrent().pipe(first()).subscribe(user => {
            localStorage.setItem('SettingChanged', 'true');
            localStorage.removeItem('currentUser');
            let userModel = user;
            userModel.token = this.currentUser.token;
            localStorage.setItem('currentUser', JSON.stringify(userModel));
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          });
        },
        error => {
          this.alertService.error(error);
        });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
