/// <reference types="cypress" />
import { RegistrationScreen } from "../../../support/pageObjects/registrationScreen";
import { CommonFunctions } from "../../../support/commonFunctions";
const commonFunctions = new CommonFunctions();
const randomNum = commonFunctions.getRandomNumber(3);
const random = commonFunctions.randomAlphaNumericStr();
const Number = commonFunctions.getRandomNumber(10);
const Num = commonFunctions.getRandomNumber(4);
["Spanish", "English"].forEach((language) => {
  describe(`Registration Mobile Account Sceanrio- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });

    it(`validate the inline error - ${language}`, () => {
      cy.get(RegistrationScreen.createOne).click();
      cy.get(RegistrationScreen.residentials).eq(1).click();
      cy.get(RegistrationScreen.accountInput).eq(0).type(randomNum);
      cy.verifyText(
        RegistrationScreen.phoneNoErrorMsg,
        Cypress.env("translationRes").shared.phoneNumberErrorMsg
      );
      cy.get(RegistrationScreen.accountInput).eq(1).type(randomNum);

      cy.verifyText(
        RegistrationScreen.emailIsNotValidtext,
        Cypress.env("translationRes").shared.emailIsNotValidTxt
      );
      
      cy.verifyText(
        RegistrationScreen.homeBannerContentHeading,
        Cypress.env("translationRes").pages.userLoginPortal.homeBannerContent
          .homeBannerContentHeading
      );
      cy.verifyText(
        RegistrationScreen.homeBannerContentDescription,
        Cypress.env("translationRes").pages.userLoginPortal.homeBannerContent
          .homeBannerContentDescription
      );

      cy.verifyText(
        RegistrationScreen.PrepaidAccounttitleTxt,
        Cypress.env("translationRes").pages.userLoginPortal.createPrepaidAccount
          .titleTxt
      );
      cy.verifyText(
        RegistrationScreen.PrepaidAccountsubTitleTxt,
        Cypress.env("translationRes").pages.userLoginPortal.createPrepaidAccount
          .subTitleTxt
      );
    });

    it(`validate the inline error and content for enter pin page - ${language}`, () => {
      cy.get(RegistrationScreen.createOne).click();
      cy.get(RegistrationScreen.residentials).eq(1).click();
      cy.get(RegistrationScreen.accountInput).eq(0).type(Number);
      cy.get(RegistrationScreen.accountInput)
        .eq(1)
        .type(random.concat("@gmail.com"));
      cy.get(RegistrationScreen.continuebutton).click();
      cy.verifyText(
        RegistrationScreen.verifyPintitleTxt,
        Cypress.env("translationRes").pages.userLoginPortal.verifyPin.titleTxt
      );
      cy.verifyText(
        RegistrationScreen.verifyPinsubtitleTxt,
        Cypress.env("translationRes").pages.userLoginPortal.verifyPin
          .subtitleTxt
      );
      cy.verifyText(
        RegistrationScreen.pinNumberTxt,
        Cypress.env("translationRes").shared.pinNumberTxt
      );
      cy.verifyText(
        RegistrationScreen.whereIsMyPinBtnTxt,
        Cypress.env("translationRes").buttonGroup.whereIsMyPinBtnTxt
      );
      cy.get(RegistrationScreen.accountInput).type(randomNum);

      cy.verifyText(
        RegistrationScreen.pinErrorMsg,
        Cypress.env("translationRes").shared.pinErrorMsg
      );
    });
    it(`Happy path Registration Mobile Account  10 digit and valid Email - ${language}`, () => {
      cy.get(RegistrationScreen.createOne).click();
      cy.get(RegistrationScreen.residentials).eq(1).click();
      cy.get(RegistrationScreen.accountInput).eq(0).type(Number);
      cy.get(RegistrationScreen.accountInput)
        .eq(1)
        .type(random.concat("@gmail.com"));
      cy.get(RegistrationScreen.continuebutton).click();
      cy.get(RegistrationScreen.whereIsMyPinPopup).click();
      cy.get(RegistrationScreen.closebutton).click();
      cy.get(RegistrationScreen.accountInput).click().clear().type(Num);
      cy.get(RegistrationScreen.continuebutton).click();
      cy.get(RegistrationScreen.password).eq(0).type(random);
      cy.get(RegistrationScreen.eyeIcon).eq(0).click();
      cy.get(RegistrationScreen.password).eq(1).type(random);
      cy.get(RegistrationScreen.eyeIcon).eq(1).click();
      cy.get(RegistrationScreen.terms).click();
      cy.get(RegistrationScreen.termsPopupCloseicon).click();
      cy.get(RegistrationScreen.password)
        .eq(0)
        .click()
        .clear()
        .type("Register123!");
      cy.get(RegistrationScreen.password)
        .eq(1)
        .click()
        .clear()
        .type("Register123!");
      cy.get(RegistrationScreen.eyeIcon).eq(1).click();
      cy.get(RegistrationScreen.termscheckbox).click();
      cy.fixture("linkAccount.json").then((data) => {
        cy.intercept("POST", "**/api/care/userinfo/register", {
          statusCode: 201,
          body: data.linkAccount,
        }).as("registration");
      });
      cy.get(RegistrationScreen.continuebutton).click();
      cy.wait('@registration');
      cy.verifyText(
        RegistrationScreen.SuccessTitleTxt,
        Cypress.env("translationRes").successView.registrationSuccessTitleTxt
      );

      cy.verifyText(
        RegistrationScreen.SuccessSubtitleTxt,
        Cypress.env("translationRes").successView.registrationSuccessSubtitleTxt
      );
      cy.verifyText(
        RegistrationScreen.didnotGetEmailTxt,
        Cypress.env("translationRes").shared.didnotGetEmailTxt
      );
    });
  });
});
