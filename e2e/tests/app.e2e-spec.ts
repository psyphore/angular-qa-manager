import { AppPage } from '../page-objects/app.po';

describe('QA Manager App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Quality Manager');
    expect(page.getParagraphText()).toEqual('Where all great projects are put to the test');
  });
});
