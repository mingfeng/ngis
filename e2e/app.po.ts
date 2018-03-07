import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppHeaderTitle() {
    return element(by.css('app-header .navbar-brand')).getText();
  }

  getAppMap() {
    return element(by.css('app-map'));
  }
}
