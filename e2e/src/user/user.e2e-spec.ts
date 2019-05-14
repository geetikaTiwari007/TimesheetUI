
import { UserPage } from './user.po';
import { AppPage } from '../app.po';

describe('Timesheet App - User page', () => {
  let userpage: UserPage;
  let page: AppPage;

  beforeEach(() => {
    userpage = new UserPage();
    page = new AppPage();
    page.waitPage();
  });

  it('when user click on User Manager link he should User screen', (done) => {
    page.navigateTo();
    userpage.clickUserWindow();
    expect(userpage.getPageTitleText()).toEqual('User Details');
    expect(userpage.columnCount).toBe(7);
    done();
  });

  it('Add User in User Admin screen', (done) => {
    userpage.navigateTo();
    userpage.clickButton('[id="openAddUser"]');
    expect(userpage.getPageTitleTexth2()).toEqual('Add User');
    userpage.saveUser();
    expect(page.getSuccessMessage()).toEqual('User added successfully');
    done();
  });

  it('Username already registered could not be created again', (done) => {
    userpage.navigateTo();
    userpage.clickButton('[id="openAddUser"]');
    expect(userpage.getPageTitleTexth2()).toEqual('Add User');
    userpage.saveUser();
    expect(page.getErrorMessage()).toEqual('Username "chandra" is already taken');
    done();
  });

  it('Update User in User Admin screen', (done) => {
    userpage.navigateTo();
    userpage.clickButton('.btn-info');
    expect(userpage.getPageTitleTexth2()).toEqual('Update User');
    userpage.updateUser();
    expect(page.getSuccessMessage()).toEqual('User updated successfully');
    done();
  });

  it('Delete user in home screen', (done) => {
    userpage.navigateTo();
    userpage.clickButton('.btn-danger');
    page.confirmTrue();
    expect(page.getSuccessMessage()).toEqual('User deleted successfully');
    done();
  });
});
