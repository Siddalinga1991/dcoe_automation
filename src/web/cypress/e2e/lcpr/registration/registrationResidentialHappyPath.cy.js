/// <reference types="cypress" />
import { RegistrationScreen } from "../../../support/pageObjects/registrationScreen";
import { CommonFunctions } from "../../../support/commonFunctions";
const commonFunctions = new CommonFunctions();
const randomNum = commonFunctions.getRandomNumber(3);
const random = commonFunctions.randomAlphaNumericStr();
["Spanish", "English"].forEach((language) => {
  describe(`Registration Residential Sceanrio- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
  it(`validate Registration Residential inline error and tooltip - ${language}`, () => {
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(0).click();
    cy.get(RegistrationScreen.accountInput).type(randomNum);
    cy.verifyText(
      RegistrationScreen.accountNumberTxt,
      Cypress.env("translationRes").shared.accountNumberTxt
    );
    cy.verifyText(
      RegistrationScreen.pinErrorMsg,
      Cypress.env("translationRes").pages.forgotEmail.accNumberInvalidTxt
    );
    cy.get(RegistrationScreen.accNumberTooltipInfo).click();
    cy.verifyText(
      RegistrationScreen.accNumberTooltipDesc,
      Cypress.env("translationRes").pages.userLoginPortal.accountNumberPage.accNumberTooltipInfo
    );
  });

  it(`validate Registration Residential inline error in verify Ownership- ${language}`, () => {
    const numbers = commonFunctions.getRandomNumber(17);
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(0).click();
    cy.get(RegistrationScreen.accountInput).type(numbers);
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.emailInput).type(randomNum);
    cy.get(RegistrationScreen.ssn).eq(1).type(randomNum);
    cy.verifyText(
      RegistrationScreen.verifyPintitleTxt,
      Cypress.env("translationRes").pages.userLoginPortal.verifyIdentity.titleTxt
    );
    cy.verifyText(
      RegistrationScreen.verifyPinsubtitleTxt,
      Cypress.env("translationRes").pages.userLoginPortal.verifyIdentity.subTitleTxt
    );  
  });

  it(`Happy path Registration Residential with 16 digit Account No - ${language}`, () => {
    const numbers = commonFunctions.getRandomNumber(17);
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(0).click();
    cy.get(RegistrationScreen.accountInput).type(numbers);
    cy.get(RegistrationScreen.continuebutton).click();
    const ssno = commonFunctions.getRandomNumber(4);
    cy.get(RegistrationScreen.emailInput).type(random.concat("@gmail.com"));
    cy.get(RegistrationScreen.ssn).eq(1).type(ssno);
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