/// <reference types="cypress" />
import { LinkAccount } from "../../../support/pageObjects/linkAccount";
const linkAccounts = new LinkAccount();
["Spanish", "English"].forEach((language) => {
  describe(`Link Account: Unhappy Path Sceanrio for Mobile Accounts - ${Cypress.env(
    "environment"
  )} - -${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Unhappy path: Combination of invalid PIN or Phone - ${language}`, () => {
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(1)
        .click()
        .then(() => {
          linkAccounts.enterInput("phoneNumber", "pinNumber");
          cy.get(LinkAccount.errorIcon).should("be.visible");
            linkAccounts.errorPageValidation(
              Cypress.env("translationRes").shared.verificationErrorTxt,
              Cypress.env("translationRes").errorStrategies
                .addAccountPhoneNumberAndPinErrorSubtitleTxt
            );
        });
    });
    it(`Unhappy path: Already linked account - ${language}`, () => {
      linkAccounts.interceptLinkedAccountApi("linkAccount");
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(1)
        .click()
        .then(() => {
          linkAccounts.enterInput("phoneNumber", "pinNumber");
          cy.wait("@linkAccount");
          linkAccounts.errorPageValidation(
            Cypress.env("translationRes").errorStrategies.cannotLinkAccountErrorTitleTxt,
            Cypress.env("translationRes").errorStrategies
              .accountLinkedAlreadyErrorSubtitleTxt
          );
        });
    });
  });
});
