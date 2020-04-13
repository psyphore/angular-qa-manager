import { ExpectedConditions, browser } from 'protractor';
import { ProjectPage } from '../../page-objects/project/project.po';
import { Release } from '../../../src/app/shared/interfaces/release.interface';
import { Person } from '../../../src/app/shared/interfaces/person.interface';

describe('SignIn', () => {
  let page: ProjectPage;
  const ec = ExpectedConditions;
  let originalTimeout: number;
  let browser10SecondNap: number;
  let project: Release;
  let person: Person;
  let projectId: number;

  beforeAll(() => {
    page = new ProjectPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
    browser10SecondNap = 10000;
  });


  afterAll(() => {
    page = null;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should load page', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    browser.waitForAngular('wait for login page to load');
    expect(browser.getCurrentUrl()).toContain(page.loginPath);
  });

  it('should create a new project', () => {
    browser.waitForAngularEnabled(false);

    project = <Release>{
      projectName: 'P1',
      releaseName: 'R1',
      environment: '2',
      system: '2',
      status: '1',
      person: <Person>{ id: 2 },
      customer: 'HLD'
    };

    page.captureProject(project);

    browser.waitForAngular('wait for project page to load');
    expect(browser.getCurrentUrl()).toContain(page.loginPath);
  });

  it('should view a project', () => {
    browser.waitForAngularEnabled(false);
    projectId = 1;

    browser.waitForAngular('wait for project page to load');
    expect(browser.getCurrentUrl()).toContain(page.loginPath);
  });

  it('should list projects', () => {
    browser.waitForAngularEnabled(false);
    projectId = 1;

    browser.waitForAngular('wait for project page to load');
    expect(browser.getCurrentUrl()).toContain(page.loginPath);
  });
});
