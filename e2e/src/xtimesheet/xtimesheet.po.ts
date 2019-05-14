import { browser, by, element, ElementArrayFinder } from 'protractor';
import { Alert } from 'selenium-webdriver';
export class TimesheetPage {
  private timesheet_details = {
    username: 'adinathJain',
    taskName: 'Testing Mocha Chai Test Case',
    dateWorked: '12-05-2019',
    totalTime: 8,
    note: 'Writing the testcases'
  };

  navigateTo() {
    return browser.get('/all-timesheet-details');
  }


  getPageTitleText() {
    return element(by.css('app h1')).getText();
  }

  getPageTitleTexth2() {
    return element(by.css('app h2')).getText();
  }

  columns(): ElementArrayFinder {
    return element.all(by.css('[id="third-table"]'))
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
    element(by.css('[id="searchTerm"]')).sendKeys(timesheet_details.username);
    element(by.css('[formControlName="taskName"]')).sendKeys(timesheet_details.taskName);
    element(by.css('[formControlName="totalTime"]')).sendKeys(timesheet_details.totalTime);
    element(by.css('[id="dateWorked_input"]')).sendKeys(timesheet_details.dateWorked);
    //browser.executeScript("document.getElementById('dateWorked_input').value='02/11/2019'");
    element(by.css('[formControlName="note"]')).sendKeys(timesheet_details.note);
    element(by.css('[id= "SaveAdminTimesheet"]')).click();
  }

  updateTask() {
    element(by.css('[formControlName="totalTime"]')).clear();
    element(by.css('[formControlName="totalTime"]')).sendKeys(10);
    element(by.css('[id= "UpdateAdminTimesheet"]')).click();
  }

  
  clickTimesheetAdminWindow() {
    element(by.css('[id="navLeft"]'))
      .element(by.css('[id="TimesheetAdminNav"]'))
      .click();
  }

  openUserRightNavPage(optionName) {
    element(by.css('[id="navRight"]'))
      .element(by.css('[id="navbarDropdown"]'))
      .click();

    element(by.css('.dropdown-menu'))
      .element(by.linkText(optionName))
      .click();
  }
}
