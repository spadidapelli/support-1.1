import { AppPage } from './app.po';
import { browser } from 'protractor';
import { async } from '@angular/core/testing';

describe('support App', () => {
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Icon text', () => {
    page.navigateTo();
    expect(page.getHeaderIconTitle()).toEqual('My VMware');
  });

  it('should display VMware.com Navigation link and text', () => {
    page.navigateTo();
    expect(page.getHeaderLinkText(1).getText()).toEqual('VMware.com');
    page.getHeaderLinkText(1).click().then(() => {
      browser.getAllWindowHandles().then((handles) => {
        browser.switchTo().window(handles[1]).then(() => {
          expect(browser.driver.getCurrentUrl()).toMatch(/https:\/\/www.vmware.com\//);
        });
        browser.close().then(() => {
          browser.switchTo().window(handles[0]);
        });
      });
    });
  });

  it('should display Store Navigation link and text', () => {
    page.navigateTo();
    expect(page.getHeaderLinkText(2).getText()).toEqual('Store');
    page.getHeaderLinkText(2).click().then(() => {
      browser.getAllWindowHandles().then((handles) => {
        browser.switchTo().window(handles[1]).then(() => {
          expect(browser.driver.getCurrentUrl()).toMatch(/https:\/\/store.vmware.com/);
        });
        browser.close().then(() => {
          browser.switchTo().window(handles[0]);
        });
      });
    });
  });

  it('should display Inner Circle Navigation link and text', () => {
    page.navigateTo();
    expect(page.getHeaderLinkText(3).getText()).toEqual('Inner Circle');
    page.getHeaderLinkText(3).click().then(() => {
      browser.getAllWindowHandles().then((handles) => {
        browser.switchTo().window(handles[1]).then(() => {
          expect(browser.driver.getCurrentUrl()).toMatch(/https:\/\/my.vmware.com\/web\/vmware\/login/);
        });
        browser.close().then(() => {
          browser.switchTo().window(handles[0]);
        });
      });
    });
  });

  it('should display Communities Navigation link and text', () => {
    page.navigateTo();
    expect(page.getHeaderLinkText(4).getText()).toEqual('Communities');
    page.getHeaderLinkText(4).click().then(() => {
      browser.getAllWindowHandles().then((handles) => {
        browser.switchTo().window(handles[1]).then(() => {
          expect(browser.driver.getCurrentUrl()).toMatch(/https:\/\/communities.vmware.com\/welcome/);
        });
        browser.close().then(() => {
          browser.switchTo().window(handles[0]);
        });
      });
    });
  });

  it('should display VMWARE right icon with Navigation link', () => {
    page.navigateTo();
    page.getHeaderRightIconLink().click().then(() => {
      browser.getAllWindowHandles().then((handles) => {
        browser.switchTo().window(handles[1]).then(() => {
          expect(browser.driver.getCurrentUrl()).toMatch(/https:\/\/www.vmware.com\/in.html/);
        });
        browser.close().then(() => {
          browser.switchTo().window(handles[0]);
        });
      });
    });
  });

  it('should display products drop down list when user clicks on products dropdown option', () => {
    page.navigateTo();
    page.getHeaderDropDownLink(':nth-child(1) .dropdown-toggle').click().then(() => {
     expect(page.getHeaderDropDownLink(':nth-child(1) .dropdown-menu > label.dropdown-header:nth-of-type(1)').getText()).toEqual('Manage My Products');
     expect(page.getHeaderDropDownLink(':nth-child(1) .dropdown-menu > label.dropdown-header:nth-of-type(2)').getText()).toEqual('Manage My Services');
     expect(page.getHeaderDropDownLink(':nth-child(1) .dropdown-menu > button.dropdown-item:nth-of-type(1)').getText()).toEqual('My Products');
     expect(page.getHeaderDropDownLink(':nth-child(1) .dropdown-menu > button.dropdown-item:nth-of-type(2)').getText()).toEqual('License Keys');
     expect(page.getHeaderDropDownLink(':nth-child(1) .dropdown-menu > button.dropdown-item:nth-of-type(3)').getText()).toEqual('Subscription Services');
     expect(page.getHeaderDropDownLink(':nth-child(1) .dropdown-menu > button.dropdown-item:nth-of-type(4)').getText()).toEqual('Add-on/Upgrade Requests');
    });
  });
  it('should display Accounts drop down list when user clicks on products dropdown option', () => {
    page.navigateTo();
    page.getHeaderDropDownLink(':nth-child(2) .dropdown-toggle').click().then(() => {
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > label.dropdown-header:nth-of-type(1)').getText()).toEqual('Manage Accounts');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > label.dropdown-header:nth-of-type(2)').getText()).toEqual('View Purchases');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > label.dropdown-header:nth-of-type(3)').getText()).toEqual('Manage Funds');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > button.dropdown-item:nth-of-type(1)').getText()).toEqual('Account Summary');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > button.dropdown-item:nth-of-type(2)').getText()).toEqual('Users & Permissions');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > button.dropdown-item:nth-of-type(3)').getText()).toEqual('Order History');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > button.dropdown-item:nth-of-type(4)').getText()).toEqual('Subscription Billing Statements');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > button.dropdown-item:nth-of-type(5)').getText()).toEqual('Enterprise Purchasing Program (EPP)');
     expect(page.getHeaderDropDownLink(':nth-child(2) .dropdown-menu > button.dropdown-item:nth-of-type(6)').getText()).toEqual('Hybrid & Subscription Purchasing Programs (HPP/SPP)');
    });
  });
  it('should display Support drop down list when user clicks on products dropdown option', () => {
    page.navigateTo();
    page.getHeaderDropDownLink(':nth-child(3) .dropdown-toggle').click().then(() => {
     expect(page.getHeaderDropDownLink(':nth-child(3) .dropdown-menu > label.dropdown-header:nth-of-type(1)').getText()).toEqual('Support');
     expect(page.getHeaderDropDownLink(':nth-child(3) .dropdown-menu > label.dropdown-header:nth-of-type(2)').getText()).toEqual('Resources & Education');
     expect(page.getHeaderDropDownLink(':nth-child(3) .dropdown-menu > button.dropdown-item:nth-of-type(1)').getText()).toEqual('Get Support');
     expect(page.getHeaderDropDownLink(':nth-child(3) .dropdown-menu > button.dropdown-item:nth-of-type(2)').getText()).toEqual('Support Request History');
     expect(page.getHeaderDropDownLink(':nth-child(3) .dropdown-menu > button.dropdown-item:nth-of-type(3)').getText()).toEqual('Support Center');
     expect(page.getHeaderDropDownLink(':nth-child(3) .dropdown-menu > button.dropdown-item:nth-of-type(4)').getText()).toEqual('Training');
    });
  });
});
