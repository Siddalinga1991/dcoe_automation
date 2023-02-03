/// <reference types="cypress" />
import { RegistrationScreen } from "../../../support/pageObjects/registrationScreen";
import { CommonFunctions } from "../../../support/commonFunctions";
const commonFunctions = new CommonFunctions();
const Number = commonFunctions.getRandomNumber(10);
    const Num = commonFunctions.getRandomNumber(4);
 const random = commonFunctions.randomAlphaNumericStr();

["Spanish", "English"].forEach((language) => {
  describe(`Registration Unhappy path Mobile Account Sceanrio- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
  it(`UnHappy path Registration with incorrect phone No and Pin-  - ${language}`, () => {
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(1).click();
    cy.get(RegistrationScreen.accountInput).eq(0).type(Number);
    cy.get(RegistrationScreen.accountInput).eq(1).type(random.concat('@gmail.com'));
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.accountInput).click().clear().type(Num);
    cy.get(RegistrationScreen.continuebutton).click();
      cy.get(RegistrationScreen.password).eq(0).click().clear().type('Register123!');
      cy.get(RegistrationScreen.password).eq(1).click().clear().type('Register123!');
      cy.get(RegistrationScreen.eyeIcon).eq(1).click();
      cy.get(RegistrationScreen.termscheckbox).click();
      cy.get(RegistrationScreen.continuebutton).click();
      cy.get(RegistrationScreen.errorImage).should('be.visible');
      cy.verifyText(
        RegistrationScreen.errortitle,
        Cypress.env("translationRes").errorStrategies.validationErrorTitleTxt
      );
      cy.verifyText(
        RegistrationScreen.errorSubtitle,
        Cypress.env("translationRes").errorStrategies.phoneNumberAndPinErrorSubtitleTxt
        
      );

  });
  it(`UnHappy path Registration Mobile Account email is already registered to another account-  - ${language}`, () => {
    
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(1).click();
    cy.get(RegistrationScreen.accountInput).eq(0).type(Number);
    cy.get(RegistrationScreen.accountInput).eq(1).type('sandeep.k@prodapt.com');
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.accountInput).click().clear().type(Num);
    cy.get(RegistrationScreen.continuebutton).click();
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

  it(`UnHappy path Registration Mobile Account system error api down -  - ${language}`, () => {
    cy.get(RegistrationScreen.createOne).click();
    cy.get(RegistrationScreen.residentials).eq(1).click();
    cy.get(RegistrationScreen.accountInput).eq(0).type(Number);
    cy.get(RegistrationScreen.accountInput).eq(1).type('sandeep.k@prodapt.com');
    cy.get(RegistrationScreen.continuebutton).click();
    cy.get(RegistrationScreen.accountInput).click().clear().type(Num);
    cy.get(RegistrationScreen.continuebutton).click();
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