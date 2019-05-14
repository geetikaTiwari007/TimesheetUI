import { TimesheetPage } from './xtimesheet.po';
import { AppPage } from '../app.po';

describe('Timesheet App - Admin Timesheet page', () => {
  let timesheetpage: TimesheetPage;
  let page: AppPage;

  beforeEach(() => {
    timesheetpage = new TimesheetPage();
    page = new AppPage();
    page.waitPage();

  });

  it('when user click on Timesheet Admin link he should see Timesheet Admin screen', (done) => {
    page.navigateTo();
    timesheetpage.clickTimesheetAdminWindow();
    expect(timesheetpage.getPageTitleText()).toEqual('All Timesheet Details');
    expect(timesheetpage.columnCount).toBe(7);
    done();
  });

  it('Add timesheet in home screen', (done) => {
    timesheetpage.navigateTo();
    timesheetpage.clickButton('[id="openAdminAddTimesheet"]');
    expect(timesheetpage.getPageTitleTexth2()).toEqual('Add Timesheet');
    timesheetpage.saveTask();
    expect(page.getSuccessMessage()).toEqual('Timesheet added successfully');
    done();
  });

  it('Update timesheet in home screen', (done) => {
    timesheetpage.navigateTo();
    timesheetpage.clickButton('.btn-info');
    expect(timesheetpage.getPageTitleTexth2()).toEqual('Update Timesheet');
    timesheetpage.updateTask();
    expect(page.getSuccessMessage()).toEqual('Timesheet updated successfully');
    done();
  });

  it('Delete timesheet in home screen', (done) => {
    timesheetpage.navigateTo();
    timesheetpage.clickButton('.btn-danger');
    page.confirmTrue();
    expect(timesheetpage.getPageTitleText()).toEqual('All Timesheet Details');
    expect(page.getSuccessMessage()).toEqual('Timesheet deleted successfully');
    done();
  });

  it('Logout from App', (done) => {
    page.navigateTo();
    timesheetpage.openUserRightNavPage('Logout');
    expect(page.getParagraphText()).toEqual("Login");
    done();
  });


});
