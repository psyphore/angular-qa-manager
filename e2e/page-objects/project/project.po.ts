import { browser, by, element } from 'protractor';
import { Release } from '../../../src/app/shared/interfaces/release.interface';

export class ProjectPage {

  private path = '/projects/detail/';

  get loginPath() {
    return this.path;
  }

  navigateTo(projectId: number = 0) {
    return browser.get(`${this.path}${projectId}`);
  }

  captureProject(project: Release) {
    element(by.id('id')).sendKeys(project.id);
    element(by.id('projectName')).sendKeys(project.projectName);
    element(by.id('releaseName')).sendKeys(project.releaseName);
    element(by.id('leadQA')).sendKeys(project.person.id);
    element(by.id('customerName')).sendKeys(project.customer);
    element(by.id('system')).sendKeys(project.system);
    element(by.id('status')).sendKeys(project.status);
    element(by.id('environment')).sendKeys(project.environment);

    element(by.id('addBtn')).click();
  }
}
