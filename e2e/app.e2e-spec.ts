import { AppPage } from './app.po';

describe('bootmap App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app title in app header', () => {
    page.navigateTo();
    expect(page.getAppHeaderTitle()).toEqual('BootMap');
  });

  it('should display an map', () => {
    page.navigateTo();
    expect(page.getAppMap()).toBeDefined();
  });
});
