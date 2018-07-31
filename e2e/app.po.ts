import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderIconTitle() {
    return element(by.css('app-header .title')).getText();
  }

  getHeaderLinkText(index) {
    return element(by.css('app-header .header-actions .nav-link:nth-child(' + index + ')'));
  }
  getHeaderRightIconLink() {
    return element(by.css('app-header .header-actions .vmware-logo'));
  }

  getHeaderDropDownLink(elmnt) {
    const selector = 'app-header .header-nav .dropdown';
    return element(by.css(selector + elmnt));
  }
}
