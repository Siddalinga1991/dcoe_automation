import { CommonScreenObjects } from "./commonObjects";
import { UrlConstant } from "../urlConstants";
export class UsagesScreen extends CommonScreenObjects {
  static usagestab = '[data-cy="lla-mobile-service"]';
  static toastbanner = ".bg-info-50";
  static myusagestext = "#lla-myusage-text";
  static dataText = '[data-cy="lla-button-toggle-0"]';
  static smstext = '[data-cy="lla-button-toggle-1"]';
  static mintutestext = '[data-cy="lla-button-toggle-2"]';
  static usagesdata = ".llac-progress-bar-label__header";
  static packetdata = '[id="lla-usage-progress-bar"] .primary-font-bold';
  static leftTo = ".h7.primary-font-regular";
  static progrssbar = ".mat-progress-bar-primary";
  static icon = '[data-cy="lla-circular-container-icon"] [data-cy="lla-icon"]';
  static expirydate = ".secondary-list__content";
  interceptFetchAccount(aliasName) {
    cy.fixture("accountoverview.json").then((data) => {
      cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
        statusCode: 201,
        body: data.prepaidAccount,
      }).as(aliasName);
    });
  }
  goToAddAccountPage() {
    cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
  }
}
