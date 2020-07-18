import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lead p')).getText();
  }

  getHeadingText() {
    return element(by.css('display-4 h1')).getText();
  }
}
