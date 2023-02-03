/// <reference types="cypress" />
import { LoginScreen } from "../../../support/pageObjects/loginScreen";
import { CommonFunctions } from "../../../support/commonFunctions";
const commonFunctions = new CommonFunctions();
["Spanish", "English"].forEach((language) => {
  describe(`Login Unhappy Path Sceanrio- ${Cypress.env(
    "environment"
  )} - -${language}`, () => {
    const random = commonFunctions.randomAlphaNumericStr();
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Unhappy path with unregistered email and password  view - ${language}`, () => {
      cy.login(random.concat("@gmail.com"), random);
      cy.get(LoginScreen.errorImage).should("be.visible");
      cy.verifyText(LoginScreen.loginerrortitle,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel.accessErrorTxt
      );
      cy.verifyText(LoginScreen.loginerrorSubtitle,
        Cypress.env("translationRes").errorStrategies.loginErrorSubtitleTxt
      );
      cy.get(LoginScreen.tryAgainButton).click();
    });
    it(`Unhappy path After 3 failed attempts  view - ${language}`, () => {
      cy.fixture("loginUnhappyPath.json").then((data) => {
        cy.intercept("POST", "**/api/care/userinfo/login", {
          statusCode: 201,
          body: data.failedAttempts,
        }).as("failedAttempts");
      });
      cy.errorlogin(random.concat("@gmail.com"), random);
      cy.wait("@failedAttempts");
      cy.get(LoginScreen.errorImage).should("be.visible");
      cy.verifyText(LoginScreen.loginerrorSubtitle,
        Cypress.env("translationRes").errorStrategies.failed3AttemptsSubtitleTxt
      );
      cy.get(LoginScreen.tryAgainButton).click();
    });

    it(`Unhappy path show disable account  view - ${language}`, () => {
      cy.fixture("loginUnhappyPath.json").then((data) => {
        cy.intercept("POST", "**/api/care/userinfo/login", {
          statusCode: 201,
          body: data.disableAccounts,
        }).as("disableAccount");
      });
      cy.errorlogin(random.concat("@gmail.com"), random);
      cy.wait("@disableAccount");
      cy.get(LoginScreen.errorImage).should("be.visible");
      cy.verifyText(LoginScreen.loginerrorSubtitle,
        Cypress.env("translationRes").errorStrategies.accountDisabledSubtitleTxt
      );
     cy.get(LoginScreen.tryAgainButton).click();
    });

    it(`Unhappy path show verification Pending  view - ${language}`, () => {
      cy.fixture("loginUnhappyPath.json").then((data) => {
        cy.intercept("POST", "**/api/care/userinfo/login", {
          statusCode: 201,
          body: data.verificationPending,
        }).as("verificationPending");
      });
      cy.errorlogin(random.concat("@gmail.com"), random);
      cy.wait("@verificationPending");
      cy.get(LoginScreen.errorImage).should("be.visible");
      cy.verifyText(LoginScreen.loginerrortitle,
        Cypress.env("translationRes").errorStrategies.accountVerificationPendingTitleTxt
      );
      cy.verifyText(LoginScreen.loginerrorSubtitle,
        Cypress.env("translationRes").errorStrategies.accountVerificationPendingSubtitleTxt
      );
      cy.get(LoginScreen.tryAgainButton).click();
    });

    it(`Unhappy path show system Error  view - ${language}`, () => {
      cy.fixture("loginUnhappyPath.json").then((data) => {
        cy.intercept("POST", "**/api/care/userinfo/login", {
          statusCode: 406,
          body: data.systemError,
        }).as("systemError");
      });
      cy.errorlogin(random.concat("@gmail.com"), random);
      cy.wait("@systemError");
      cy.get(LoginScreen.errorImage).should("be.visible");
      cy.verifyText(LoginScreen.loginerrortitle,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel.systemErrorTxt
      );
      cy.verifyText(LoginScreen.loginerrorSubtitle,
        Cypress.env("translationRes").errorStrategies.systemErrorSubtitleTxt
      );
      cy.get(LoginScreen.tryAgainButton).click();
    });

    it(`Unhappy path show Password Pending  view - ${language}`, () => {
      cy.fixture("loginUnhappyPath.json").then((data) => {
        cy.intercept("POST", "**/api/care/userinfo/login", {
          body: data.passwordPending,
        }).as("passwordPending");
      });
      cy.errorlogin(random.concat("@gmail.com"), random);
      cy.wait("@passwordPending");
      cy.get(LoginScreen.errorImage).should("be.visible");
      cy.verifyText(LoginScreen.loginerrortitle,
        Cypress.env("translationRes").errorStrategies.pwdPendingTitleTxt
      );
      cy.verifyText(LoginScreen.loginerrorSubtitle,
        Cypress.env("translationRes").errorStrategies.pwdPendingSubtitleTxt
      );
      cy.verifyText(LoginScreen.tryAgainButton,
        Cypress.env("translationRes").buttonGroup.recoverPassword
      );
      cy.verifyText(LoginScreen.tryAgainButton,
        Cypress.env("translationRes").buttonGroup.recoverPassword
      );
      cy.verifyText(LoginScreen.supportchat,
        Cypress.env("translationRes").shared.supportChatTxt
      );
      cy.get(LoginScreen.tryAgainButton).click();
    });
  });
});
