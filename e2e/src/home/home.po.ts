import { browser, by, element,ElementArrayFinder } from 'protractor';
import { Alert } from 'selenium-webdriver';
export class HomePage {
  private timesheet_details = {
    taskName: 'Testing Mocha Chai Test Case',
    dateWorked: '12-05-2019',
    totalTime: 8,
    note: 'Writing the testcases'
  };

  navigateTo() {
    return browser.get('/home');
  }

  navigateToAddEditTimesheet() {
    return browser.get('/add-timesheet');
  }

  getPageTitleText() {
    return element(by.css('app h1')).getText();
  }

  getPageTitleTexth2() {
    return element(by.css('app h2')).getText();
  }

  columns(): ElementArrayFinder {
    return element.all(by.css('[id="first-table"]'))
      .all(by.tagName('thead'))
      .all(by.tagName('tr'))
      .all(by.tagName('th'));
  }

  get columnCount(): any {
    return this.columns().count();
  }

  clickButton(buttonElement) {
    element.all(by.css(buttonElement)).first().click();
  }


  saveTask(timesheet_details: any = this.timesheet_details) {
    element(by.css('[formControlName="taskName"]')).sendKeys(timesheet_details.taskName);
    element(by.css('[formControlName="totalTime"]')).sendKeys(timesheet_details.totalTime);
    element(by.css('[id="dateWorked_input"]')).sendKeys(timesheet_details.dateWorked);
    element(by.css('[formControlName="note"]')).sendKeys(timesheet_details.note);
    element(by.css('[id= "SaveTimesheet"]')).click();
  }

  updateTask() {
    element(by.css('[formControlName="totalTime"]')).clear();
    element(by.css('[formControlName="totalTime"]')).sendKeys(10);
    element(by.css('[id= "UpdateTimesheet"]')).click();
  }

   getSuccessMessage() {
    return element(by.css('.alert-success')).getText();
  }

  clickUserWindow() {
    element(by.css('.navbar-nav'))
      .element(by.linkText('User Admin'))
      .click();
  }
}
