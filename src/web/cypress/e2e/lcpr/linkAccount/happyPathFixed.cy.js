/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { LinkAccount } from "../../../support/pageObjects/linkAccount";

const commonFunctions = new CommonFunctions();
const linkAccounts = new LinkAccount();

["Spanish", "English"].forEach((language) => {
  describe(`Link Account: Happy Path Sceanrio for Mobile Accounts - ${Cypress.env(
    "environment"
  )} - -${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Happy path: Link Fixed Account via Account Number & SSN- ${language}`, () => {
      linkAccounts.interceptLinkedSuccessApi("linkAccount");
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(0)
        .click()
        .then(() => {
          cy.verifyText(
            LinkAccount.pageTitle,
            Cypress.env("translationRes").pages.myAccounts.accountHeadingTxt
          );
          cy.verifyText(
            LinkAccount.subHeading,
            Cypress.env("translationRes").pages.myAccounts
              .addAccountDescriptionTxt
          );
          cy.verifyText(
            LinkAccount.inputLabel,
            Cypress.env("translationRes").shared.accountNumberTxt
          );
          cy.verifyText(
            LinkAccount.hintText,
            Cypress.env("translationRes").shared.whereIsItTxt
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          commonFunctions.enterInputField("accountNumber");
          cy.get(LinkAccount.continueButton).should("be.enabled");
          cy.get(LinkAccount.continueButton).click();
          cy.verifyText(
            LinkAccount.heading,
            Cypress.env("translationRes").pages.myAccounts
              .verifyIdentityTitleTxt
          );
          cy.verifyText(
            LinkAccount.subHeading,
            Cypress.env("translationRes").pages.myAccounts
              .verifyIdentityDescriptionTxt
          );
          cy.verifyText(
            LinkAccount.inputLabel,
            Cypress.env("translationRes").shared.ssnHintTxt
          );
          cy.verifyText(
            LinkAccount.toggleButton,
            Cypress.env("translationRes").shared.ssnTxt,
            0
          );
          cy.verifyText(
            LinkAccount.toggleButton,
            Cypress.env("translationRes").pages.recoverAccess.phoneNumberTxt,
            1
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          commonFunctions.enterInputField("ssnNumber");
          cy.get(LinkAccount.continueButton).should("be.enabled");
          cy.get(LinkAccount.continueButton).click();
          cy.wait("@linkAccount");
          cy.get(LinkAccount.successIcon).should("be.visible");
          cy.verifyText(
            LinkAccount.successTitle,
            Cypress.env("translationRes").pages.myAccounts
              .accountLinkedSuccessTxt
          );
          cy.verifyText(
            LinkAccount.numberLabel,
            Cypress.env("translationRes").shared.accountNumberTxt,
            0
          );
          cy.verifyText(LinkAccount.numberLabel, Cypress.env("accountNum"), 1);
          cy.verifyText(
            LinkAccount.buttonText,
            Cypress.env("translationRes").pages.myAccounts
              .accountLinkedButtonTxt,
            1
          );
          cy.get(LinkAccount.successPageButton).click();
          cy.verifyText(
            LinkAccount.buttonText,
            Cypress.env("translationRes").pages.accounts.addAnAccountTxt
          );
        });
    });
    it(`Happy path: Link Fixed Account via Account Number & Phone Number- ${language}`, () => {
      linkAccounts.interceptLinkedSuccessApi("linkAccount");
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(0)
        .click()
        .then(() => {
          linkAccounts.enterInput("accountNumber", "phoneNumber");
          cy.wait("@linkAccount");
          cy.get(LinkAccount.successIcon).should("be.visible");
        });
    });
    it(`Validate Inline Error Message - ${language}`, () => {
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(0)
        .click()
        .then(() => {
          commonFunctions.enterInputField("randomNum");
          cy.verifyText(
            LinkAccount.errorMsg,
            Cypress.env("translationRes").pages.forgotEmail.accNumberInvalidTxt
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          commonFunctions.enterInputField("accountNumber");
          cy.get(LinkAccount.continueButton).click();
          commonFunctions.enterInputField("randomNum");
          cy.verifyText(
            LinkAccount.errorMsg,
            Cypress.env("translationRes").shared.ssnErrorMsg
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          cy.get(LinkAccount.toggleButton).eq(1).click();
          commonFunctions.enterInputField("randomNum");
          cy.verifyText(
            LinkAccount.labels,
            Cypress.env("translationRes").shared.phoneNumberTxt
          );
          cy.verifyText(
            LinkAccount.errorMsg,
            Cypress.env("translationRes").shared.phoneNumberErrorMsg
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
        });
    });
  });
});
