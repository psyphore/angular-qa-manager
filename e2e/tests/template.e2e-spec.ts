import { browser, ExpectedConditions } from 'protractor';
import { AppPage } from '../page-objects/app.po';

describe('QA Manager App', () => {
  let page: AppPage;
  const ec = ExpectedConditions;
  let originalTimeout: number;
  let browser10SecondNap: number;

  beforeAll(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
    browser10SecondNap = 10000;
  });

  beforeEach(() => {
    page = new AppPage();
  });

  afterAll(() => {
    page = null;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should display welcome message', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });

  it('should sleep successfully', () => {
    browser.waitForAngularEnabled(false);
    browser.sleep(browser10SecondNap);
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL);

});


