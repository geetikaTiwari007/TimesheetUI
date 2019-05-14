import { browser, by, element } from 'protractor';

export class AppPage {
  private credentias = {
    username: 'adinathJain',
    password: 'Admin123'
  };

  private registerChangeData = {
    firstName: 'Padam',
    lastName: 'Pahup',
    username: 'padam',
    password: 'Admin123',
    preferWorkHrs: 8,
    newpassword: 'admin123'
  };

  waitPage() {
    browser.sleep(4000);
  }

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app h2')).getText();
  }

  fillCredentials(credentias: any = this.credentias) {
    element(by.css('[formControlName="username"]')).sendKeys(credentias.username);
    element(by.css('[formControlName="password"]')).sendKeys(credentias.password);
    element(by.css('.btn-primary')).click();
  }

  saveRegister(registerChangeData: any = this.registerChangeData) {
    element(by.css('[formControlName="firstName"]')).sendKeys(registerChangeData.firstName);
    element(by.css('[formControlName="lastName"]')).sendKeys(registerChangeData.lastName);
    element(by.css('[formControlName="username"]')).sendKeys(registerChangeData.username);
    element(by.css('[formControlName="password"]')).sendKeys(registerChangeData.password);
    element(by.css('[formControlName="preferWorkHrs"]')).sendKeys(registerChangeData.preferWorkHrs);
    element(by.css('[id="saveRegister"]')).click();
  }

  getPageTitleText() {
    return element(by.css('app h1')).getText();
  }

  getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }

  clickButton(buttonElement) {
    element(by.css(buttonElement)).click();
  }

  getSuccessMessage() {
    return element(by.css('.alert-success')).getText();
  }

  saveChangePwd(registerChangeData: any = this.registerChangeData) {
    element(by.css('[formControlName="oldPassword"]')).sendKeys(registerChangeData.password);
    element(by.css('[formControlName="newPassword"]')).sendKeys(registerChangeData.newpassword);
    element(by.css('[id="changePwd"]')).click();
  }

  openUserRightNavPage(optionName) {
    element(by.css('[id="navRight"]'))
      .element(by.css('[id="navbarDropdown"]'))
      .click();

    element(by.css('.dropdown-menu'))
      .element(by.linkText(optionName))
      .click();
  }

  changeSettings() {
    element(by.css('[formControlName="preferWorkHrs"]')).clear();
    element(by.css('[formControlName="preferWorkHrs"]')).sendKeys(10);
    element(by.css('[id= "updateUserSetting"]')).click();
  }

  confirmTrue() {
    let ale: Alert = browser.switchTo().alert();
    // clicks 'OK' button
    ale.accept();
  }

}
