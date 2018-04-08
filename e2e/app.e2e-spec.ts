import { AppPage } from './app.po';

describe('ngis App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app title in app header', () => {
    page.navigateTo();
    expect(page.getAppHeaderTitle()).toEqual('NGIS');
  });

  it('should display an map', () => {
    page.navigateTo();
    expect(page.getAppMap()).toBeDefined();
  });
});
