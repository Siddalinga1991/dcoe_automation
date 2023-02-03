/// <reference types="cypress" />
import { LinkAccount } from "../../../support/pageObjects/linkAccount";

const linkAccounts = new LinkAccount();
["Spanish", "English"].forEach((language) => {
  describe(`Link Account: Unhappy Path Sceanrio for Fixed Accounts - ${Cypress.env(
    "environment"
  )} - -${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Unhappy path: Combination of invalid Account or SSN Number - ${language}`, () => {
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(0)
        .click()
        .then(() => {
          linkAccounts.enterInput("accountNumber", "ssnNumber");
          cy.get(LinkAccount.errorIcon).should("be.visible");
            linkAccounts.errorPageValidation(
              Cypress.env("translationRes").shared.verificationErrorTxt,
              Cypress.env("translationRes").errorStrategies
                .accountVerificationFailErrorSubtitleTxt
            );
        });
    });
    it(`Unhappy path: Combination of invalid Account or PIN Number - ${language}`, () => {
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(0)
        .click()
        .then(() => {
          linkAccounts.enterInput("accountNumber", "phoneNumber");
          cy.get(LinkAccount.errorIcon).should("be.visible");
          linkAccounts.errorPageValidation(
            Cypress.env("translationRes").shared.verificationErrorTxt,
            Cypress.env("translationRes").errorStrategies
              .accountVerificationFailErrorSubtitleTxt
          );
        });
    });
    it(`Unhappy path: Already linked account via SSN- ${language}`, () => {
      linkAccounts.interceptLinkedAccountApi("linkAccount");
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(0)
        .click()
        .then(() => {
          linkAccounts.enterInput("accountNumber", "ssnNumber");
          cy.wait("@linkAccount");
          linkAccounts.errorPageValidation(
            Cypress.env("translationRes").errorStrategies.cannotLinkAccountErrorTitleTxt,
            Cypress.env("translationRes").errorStrategies
              .accountLinkedAlreadyErrorSubtitleTxt
          );
        });
    });
    it(`Unhappy path: Already Linked via Phone Number - ${language}`, () => {
      linkAccounts.interceptLinkedAccountApi("linkAccount");
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(0)
        .click()
        .then(() => {
          linkAccounts.enterInput("accountNumber", "phoneNumber");
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
