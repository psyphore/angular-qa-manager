import { SignInPage } from '../../page-objects/signin/signin.po';
import { ExpectedConditions, browser } from 'protractor';

describe('SignIn', () => {
  let page: SignInPage;
  const ec = ExpectedConditions;
  let originalTimeout: number;
  let browser10SecondNap: number;

  beforeAll(() => {
    page = new SignInPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
    browser10SecondNap = 10000;
  });


  afterAll(() => {
    page = null;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should load page', () => {
    page.navigateTo();
    page.captureCredentials('siphoh', '.c2h7GX3UMQ@FuV');
    browser.waitForAngularEnabled(false);
    browser.waitForAngular('wait for login page to load');
    expect(browser.getCurrentUrl()).toContain(page.loginPath);
  });
});
