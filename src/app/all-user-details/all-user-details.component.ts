import { Component, OnInit, ViewChildren, OnDestroy, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../_models';
import { UserService, AlertService } from '../_services';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-all-user-details',
  templateUrl: './all-user-details.component.html'
})
export class AllUserDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  currentUser: User;
  users: User[];
  dtTrigger2: Subject<any> = new Subject();

  constructor(private userService: UserService,
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

    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      this.dtTrigger2.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger2.unsubscribe();
  }

  rerender(): void {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        dtElement.dtInstance.then((dtInstance: any) => {
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger2.next();
        });
      });
    });
  }

  addUser(): void {
    localStorage.removeItem("editUserId");
    this.router.navigate(['add-edit-user']);
  };

  editUser(id): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", id.toString());
    this.router.navigate(['add-edit-user']);
  };

  deleteUser(id) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.userService.delete(id).pipe(first()).subscribe((users) => {
        this.alertService.success('User deleted successfully', false);
        this.rerender();
      });
    }
  }
}
