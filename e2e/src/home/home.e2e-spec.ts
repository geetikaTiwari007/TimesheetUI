import { HomePage } from './home.po';
import { AppPage } from '../app.po';

describe('Timesheet App - Home page', () => {
  let homepage: HomePage;
  let page: AppPage;

  beforeEach(() => {
    homepage = new HomePage();
    page = new AppPage();
    page.waitPage();

  });

  it('when user browses to our app he should see the default “home” screen', (done) => {
    homepage.navigateTo();
    expect(homepage.getPageTitleText()).toEqual('Timesheet');
    expect(homepage.columnCount).toBe(6);
    done();
  });

  it('Add timesheet in home screen', (done) => {
    homepage.navigateTo();
    homepage.clickButton('[id="addRow"]');
    expect(homepage.getPageTitleTexth2()).toEqual('Add Timesheet');
    homepage.saveTask();
    expect(homepage.getPageTitleText()).toEqual('Timesheet');
    expect(homepage.getSuccessMessage()).toEqual('Timesheet added successfully');
    done();
  });

  it('Update timesheet in home screen', (done) => {
    homepage.navigateTo();
    homepage.clickButton('.btn-info');
    expect(homepage.getPageTitleTexth2()).toEqual('Update Timesheet');
    homepage.updateTask();
    expect(homepage.getPageTitleText()).toEqual('Timesheet');
    expect(homepage.getSuccessMessage()).toEqual('Timesheet updated successfully');
    done();
  });

  it('Delete timesheet in home screen', (done) => {
    homepage.navigateTo();
    homepage.clickButton('.btn-danger');
    page.confirmTrue();
    expect(homepage.getPageTitleText()).toEqual('Timesheet');
    expect(page.getSuccessMessage()).toEqual('Timesheet deleted successfully');
    done();
  });
});
