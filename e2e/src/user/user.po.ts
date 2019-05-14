import { browser, by, element, ElementArrayFinder } from 'protractor';
import { Alert } from 'selenium-webdriver';
export class UserPage {
  private user_details = {
    username: 'chandra',
    password: 'Admin123',
    firstName: 'Chandra',
    lastName: 'Nandan',
    role: 'user',
    preferWorkHrs: 8
  };

  navigateTo() {
    return browser.get('/user-details');
  }

  navigateToAddEditUser() {
    return browser.get('/add-edit-user');
  }

  getPageTitleText() {
    return element(by.css('app h1')).getText();
  }

  getPageTitleTexth2() {
    return element(by.css('app h2')).getText();
  }

  columns(): ElementArrayFinder {
    return element.all(by.css('[id="second-table"]'))
      .all(by.tagName('thead'))
      .all(by.tagName('tr'))
      .all(by.tagName('th'));
  }

  get columnCount(): any {
    return this.columns().count();
  }

  clickButton(buttonElement) {
    element.all(by.css(buttonElement)).first() .click();
  }


  saveUser(user_details: any = this.user_details) {
    element(by.css('[formControlName="username"]')).sendKeys(user_details.username);
    element(by.css('[formControlName="password"]')).sendKeys(user_details.password);
    element(by.css('[formControlName="firstName"]')).sendKeys(user_details.firstName);
    element(by.css('[formControlName="lastName"]')).sendKeys(user_details.lastName);
    element(by.css('[formControlName="role"]')).sendKeys(user_details.role);
    element(by.css('[formControlName="preferWorkHrs"]')).sendKeys(user_details.preferWorkHrs);
    element(by.css('[id = "SaveUser"]')).click();
  }

  updateUser() {
    element(by.css('[formControlName="preferWorkHrs"]')).clear();
    element(by.css('[formControlName="preferWorkHrs"]')).sendKeys(10);
    element(by.css('[id= "UpdateUser"]')).click();
  }

 
  clickUserWindow() {
    element.all(by.css('.navbar-nav')).first()
      .element(by.linkText('User Admin'))
      .click();
  }

 
}
