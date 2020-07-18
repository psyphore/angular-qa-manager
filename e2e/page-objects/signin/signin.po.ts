import { browser, by, element } from 'protractor';

export class SignInPage {

  private path = '/security/signin';

  get loginPath() {
    return this.path;
  }

  navigateTo() {
    return browser.get('/security/signin');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  captureCredentials(username: string, password: string) {
    element(by.id('username')).sendKeys(username);
    element(by.id('password')).sendKeys(password);
    element(by.id('signInBtn')).click();
  }
}
