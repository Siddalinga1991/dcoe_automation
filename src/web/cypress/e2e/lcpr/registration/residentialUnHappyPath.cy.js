/// <reference types="cypress" />
import { RegistrationScreen } from "../../../support/pageObjects/registrationScreen";
import { CommonFunctions } from "../../../support/commonFunctions";
const commonFunctions = new CommonFunctions();
const random = commonFunctions.randomAlphaNumericStr();
const ssno = commonFunctions.getRandomNumber(4);
["Spanish", "English"].forEach((language) => {
  describe(`Login Happy Path Sceanrio- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
  
  it(`UnHappy path Registration Residential with incorrect Account No and SSN- ${language}`, () => {
    const numbers = commonFunctions.getRandomNumber(18);
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(0).click();
    cy.get(RegistrationScreen.accountInput).should('be.visible');
    cy.get(RegistrationScreen.accountInput).type(numbers);
    cy.get(RegistrationScreen.continuebutton).should('be.visible');
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.emailInput).type(random.concat("@gmail.com"));
    cy.get(RegistrationScreen.ssn).eq(1).type(ssno);
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.terms).click();
    cy.get(RegistrationScreen.termsPopupCloseicon).click();
    cy.get(RegistrationScreen.password).eq(0).click().clear().type('Register123!');
    cy.get(RegistrationScreen.password).eq(1).click().clear().type('Register123!');
    cy.get(RegistrationScreen.eyeIcon).eq(1).click();
    cy.get(RegistrationScreen.termscheckbox).click();
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.errorImage).should('be.visible');
      cy.verifyText(
        RegistrationScreen.errortitle,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel.informationErrorTxt
      );
      cy.verifyText(
        RegistrationScreen.errorSubtitle,
        Cypress.env("translationRes").errorStrategies.accountAndSsnErrorSubtitleTxt
      );
  });
  it(`UnHappy path Registration Residential with Email already registred- ${language}`, () => {
    const numbers = commonFunctions.getRandomNumber(18);
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(0).click();
    cy.get(RegistrationScreen.accountInput).type(numbers);
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.emailInput).type("sandeep.k@prodapt.com");
    cy.get(RegistrationScreen.ssn).eq(1).type(ssno);
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.terms).click();
    cy.get(RegistrationScreen.termsPopupCloseicon).click();
    cy.get(RegistrationScreen.password).eq(0).click().clear().type('Register123!');
    cy.get(RegistrationScreen.password).eq(1).click().clear().type('Register123!');
    cy.get(RegistrationScreen.eyeIcon).eq(1).click();
    cy.get(RegistrationScreen.termscheckbox).click();
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.errorImage).should('be.visible');
      cy.verifyText(
        RegistrationScreen.errortitle,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel.informationErrorTxt
      );
      cy.verifyText(
        RegistrationScreen.errorSubtitle,
        Cypress.env("translationRes").errorStrategies.emailVerificationErrorSubtitleTxt
        
      );

  });
  it(`UnHappy path Registration Residential with api down showing system error- ${language}`, () => {
    const numbers = commonFunctions.getRandomNumber(18);
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(0).click();
    cy.get(RegistrationScreen.accountInput).type(numbers);
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.emailInput).type(random.concat("@gmail.com"));
    cy.get(RegistrationScreen.ssn).eq(1).type(ssno);
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.terms).click();
    cy.get(RegistrationScreen.termsPopupCloseicon).click();
    cy.get(RegistrationScreen.password).eq(0).click().clear().type('Register123!');
    cy.get(RegistrationScreen.password).eq(1).click().clear().type('Register123!');
    cy.get(RegistrationScreen.eyeIcon).eq(1).click();
    cy.get(RegistrationScreen.termscheckbox).click();
    cy.fixture("loginUnhappyPath.json").then((data) => {
      cy.intercept("POST", "**/api/care/userinfo/register", {
        statusCode: 406,
        body: data.systemError,
      }).as("systemerror");
    });
    cy.get(RegistrationScreen.continuebutton).click();
    cy.wait('@systemerror');
    cy.get(RegistrationScreen.errorImage).should('be.visible');
    cy.verifyText(
      RegistrationScreen.errortitle,
      Cypress.env("translationRes").errorStrategies.sharedErrorLabel.systemErrorTxt
    );
    cy.verifyText(
      RegistrationScreen.errorSubtitle,
      Cypress.env("translationRes").errorStrategies.userRegistrationSystemErrorSubtitleTxt
    );
  });
});
});