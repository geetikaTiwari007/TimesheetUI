import { AppPage } from './app.po';

describe('Timesheet App - Login page', () => {
  let page: AppPage;
  const wrongCredentias = {
    username: 'wrongname',
    password: 'wrongpasswd'
  };

  const changePwdcred = {
    username: 'padam',
    password: 'Admin123'
  }

  beforeEach(() => {
    page = new AppPage();
    page.waitPage();
  });

  it('should register User', (done) => {
    page.navigateTo();
    page.clickButton('[id="Register"]');
    expect(page.getParagraphText()).toEqual("Register");
    page.saveRegister();
    expect(page.getSuccessMessage()).toEqual('Registration successful');
    done();
  });

  it('when user trying to login with wrong credentials he should stay on “login” page and see error notification', (done) => {
    page.navigateTo();
    page.fillCredentials(wrongCredentias);
    expect(page.getParagraphText()).toEqual('Login');
    expect(page.getErrorMessage()).toEqual('Username or password is incorrect');
    done();
  });

  it('when login is successful — he should redirect to default “Timesheet” page', (done) => {
    page.navigateTo();
    page.fillCredentials(changePwdcred);
    expect(page.getPageTitleText()).toEqual('Timesheet');
    done();
  });

  it('when Preferred Work Hours is changed -personal setting ', (done) => {
    page.navigateTo();
    page.openUserRightNavPage('Settings');
    expect(page.getParagraphText()).toEqual('User Settings');
    page.changeSettings();
    expect(page.getSuccessMessage()).toEqual('User updated successfully');
    done();
  });

  it('when password is changed — he should logout', (done) => {
    page.navigateTo();
    page.openUserRightNavPage('Change Password');
    page.saveChangePwd();
    expect(page.getSuccessMessage()).toEqual('Password changed Successfully');
    page.fillCredentials();
    done();
  });
});
