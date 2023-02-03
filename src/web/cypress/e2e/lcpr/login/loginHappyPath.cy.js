/// <reference types="cypress" />
import { LoginScreen } from "../../../support/pageObjects/loginScreen";
import { CommonFunctions } from "../../../support/commonFunctions";
const commonFunctions = new CommonFunctions();
["Spanish", "English"].forEach((language) => {
  describe(`Login Happy Path Sceanrio- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`login field inline error validation  - ${language}`, () => {

      const random = commonFunctions.getRandom(4);
      cy.get(LoginScreen.emailInput).type(random);
          cy.verifyText(
            LoginScreen.emailfieldError,
            Cypress.env("translationRes").shared.emailIsNotValidTxt
          );
      cy.get(LoginScreen.passwordInput).type(random).then(() => {
      cy.verifyText(LoginScreen.passwordfieldError,
        Cypress.env("translationRes").pages.login.passwordErrorTxt,0
      );
      });
      cy.get(LoginScreen.eyeIcon).should('be.visible').click();

    });

    it(`validate the content in login page - ${language}`, () => {
      cy.verifyText(
        LoginScreen.bannerContent,
        Cypress.env("translationRes").pages.login.loginBannerContentHeading
      );
      cy.verifyText(
        LoginScreen.homebannerContent,
        Cypress.env("translationRes").pages.recoverAccess.homeBannerContent
          .homeBannerContentDescription
      );
      cy.verifyText(
        LoginScreen.logintitle,
        Cypress.env("translationRes").pages.login.titleTxt
      );
      cy.verifyText(
        LoginScreen.logindontHaveAccountTxt,
        Cypress.env("translationRes").pages.login.dontHaveAccountTxt
      );
      cy.verifyText(
        LoginScreen.logincreateOnetxt,
        Cypress.env("translationRes").pages.login.createOneTxt
      );
      cy.verifyText(
        LoginScreen.logincantLogInTxt,
        Cypress.env("translationRes").pages.login.cantLogInTxt
      );
      cy.verifyText(
        LoginScreen.loginBackToExternalTxt,
        Cypress.env("translationRes").shared.loginBackToExternalTxt
      );
    });
    it(`validate login with valid Email and Password - ${language}`, () => {
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.get(LoginScreen.logout).eq(2).should('be.visible').click();
    });
  });
});
