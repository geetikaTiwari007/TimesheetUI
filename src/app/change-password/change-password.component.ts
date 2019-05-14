import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService, AlertService, AuthenticationService } from '../_services';
import { User } from '../_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {
  changePwdForm: FormGroup;
  currentUser: User;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    this.changePwdForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.changePwdForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePwdForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.changePassword(this.currentUser._id, this.changePwdForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data && data.data == 1) {
            this.alertService.success(data.message, true);
            localStorage.removeItem('currentUser');
            this.authenticationService.logout();
            this.router.navigate(['/login']);
          } else {
            this.alertService.error(data.message);
            return;
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
