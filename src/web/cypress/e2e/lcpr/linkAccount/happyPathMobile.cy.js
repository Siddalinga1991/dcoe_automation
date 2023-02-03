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
    it(`Validate Inline Error Message - ${language}`, () => {
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(1)
        .click()
        .then(() => {
          cy.verifyText(
            LinkAccount.heading,
            Cypress.env("translationRes").pages.myAccounts
              .addPhoneNumberTitleTxt
          );
          cy.verifyText(
            LinkAccount.subHeading,
            Cypress.env("translationRes").pages.myAccounts
              .addPhoneNumberSubtitletxt
          );
          cy.verifyText(
            LinkAccount.labels,
            Cypress.env("translationRes").shared.phoneNumberTxt
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          commonFunctions.enterInputField("randomNum");
          cy.verifyText(
            LinkAccount.errorMsg,
            Cypress.env("translationRes").shared.phoneNumberErrorMsg
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          commonFunctions.enterInputField("phoneNumber");
          cy.get(LinkAccount.continueButton).should("be.enabled");
          cy.get(LinkAccount.continueButton).click();
          cy.verifyText(
            LinkAccount.heading,
            Cypress.env("translationRes").pages.userLoginPortal.verifyPin
              .titleTxt
          );
          cy.verifyText(
            LinkAccount.subHeading,
            Cypress.env("translationRes").pages.userLoginPortal.verifyPin
              .subtitleTxt
          );
          cy.verifyText(
            LinkAccount.inputLabel,
            Cypress.env("translationRes").shared.pinNumberTxt
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          commonFunctions.enterInputField("randomNum");
          cy.verifyText(
            LinkAccount.errorMsg,
            Cypress.env("translationRes").shared.pinErrorMsg
          );
          cy.get(LinkAccount.continueButton).should("be.disabled");
          cy.get(LinkAccount.pinNumberLink).click();
          cy.verifyText(LinkAccount.pinNumberTitle, Cypress.env('translationRes').shared.whereIsMyPinTxt);
          cy.verifyText(LinkAccount.pinParagraph, commonFunctions.replaceBRtags(Cypress.env('translationRes').pages.userLoginPortal.verifyPin.pinNumberInfoTxt));
        });
    });
    it(`Happy path: Link Prepaid Account - ${language}`, () => {
      linkAccounts.interceptLinkedSuccessApi("linkAccount");
      linkAccounts.goToAddAccountPage();
      cy.get(LinkAccount.mobileAccount)
        .eq(1)
        .click()
        .then(() => {
          linkAccounts.enterInput("phoneNumber", "pinNumber");
          cy.wait("@linkAccount");
          cy.get(LinkAccount.successIcon).should("be.visible");
          cy.verifyText(
            LinkAccount.successTitle,
            Cypress.env("translationRes").pages.myAccounts
              .accountLinkedSuccessTxt
          );
          cy.verifyText(
            LinkAccount.numberLabel,
            Cypress.env("translationRes").pages.myAccounts
              .successPhoneNumberTxt,
            0
          );
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
  });
});
