/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { RecoveryAccess } from "../../../support/pageObjects/recoveryAccess";
import { RegistrationScreen } from "../../../support/pageObjects/registrationScreen";
import { revoveryEmailWithMobile } from "../../../fixtures/testDetails";
const commonFunctions = new CommonFunctions();
const randomNum = commonFunctions.getRandomNumber(3);
const randomPhoneNo = commonFunctions.getRandomNumber(10);
["Spanish", "English"].forEach((language) => {
  describe(`Recovery Access SMS- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.get(RecoveryAccess.languageSwitch).should("be.visible");
      if (language == "English") {
        cy.get(RecoveryAccess.languageSwitch).click();
      }
    });
    it(`Recovery Access via SMS with incorrect Phone Number - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(0).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(randomNum);

      cy.get(RecoveryAccess.backButton).click();
      cy.url().should("contain", "/recover-access");
      cy.get(RecoveryAccess.mobileAccount).eq(0).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(randomPhoneNo);
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.error).should("be.visible");
     
      cy.get(RecoveryAccess.button).eq(0).click();
    });

    it(`Recovery Access SMS with valid Phone Number with less than 6 digit otp - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(0).click();
      cy.get(RecoveryAccess.inputNumber)
        .eq(0)
        .type(revoveryEmailWithMobile.mobileNumber);
        cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.otp).type(randomNum);
     
    });
    
    it(`Recovery Access SMS with valid Phone Number and incorrect otp - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(0).click();
      cy.get(RecoveryAccess.inputNumber)
        .eq(0)
        .type(revoveryEmailWithMobile.mobileNumber);
      
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.otp).should('be.visible',{timeout:1000});
      cy.get(RecoveryAccess.otp).eq(0).click({timeout:2000});
      cy.get(RecoveryAccess.otp).eq(0).type(111111); 
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.error).should("be.visible");
      
      cy.get(RecoveryAccess.button).eq(0).click();
    });

    it(`Recovery Access SMS valid Phone Number and otp with paswword already used. - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(0).click();
      cy.get(RecoveryAccess.inputNumber)
        .eq(0)
        .type(revoveryEmailWithMobile.mobileNumber);
      
      cy.intercept(
        "POST",
        "**/api/care/userinfo/reset-password-mobile/send-code"
      ).as("otp");
      cy.get(RecoveryAccess.button).click();
      cy.wait("@otp").then((interception) => {
        cy.get(RecoveryAccess.otp)
          .eq(0)
          .type(interception.response.body.data.code);
        cy.get(RecoveryAccess.button).click();
      });
      cy.get(RecoveryAccess.success).should("be.visible");
      cy.get(RecoveryAccess.button).eq(1).click();
      cy.get(RegistrationScreen.terms).click();
    
      cy.get(RegistrationScreen.termsPopupCloseicon).click();
      cy.get(RegistrationScreen.password)
        .eq(0)
        .type(revoveryEmailWithMobile.passwordUsed);
      cy.get(RegistrationScreen.password)
        .eq(1)
        .type(revoveryEmailWithMobile.passwordUsed);
      cy.get(RegistrationScreen.eyeIcon).eq(1).click();
      cy.get(RegistrationScreen.termscheckbox).click();
      cy.get(RegistrationScreen.continuebutton).click();
      cy.get(RecoveryAccess.error).should("be.visible");
      
    });

    it(`Recovery Access SMS valid Phone Number and otp with New Password. - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(0).click();
      cy.get(RecoveryAccess.inputNumber)
        .eq(0)
        .type(revoveryEmailWithMobile.mobileNumber);
      cy.intercept(
        "POST",
        "**/api/care/userinfo/reset-password-mobile/send-code"
      ).as("otp");
      cy.get(RecoveryAccess.button).click();
      cy.wait("@otp").then((interception) => {
        cy.get(RecoveryAccess.otp)
          .eq(0)
          .type(interception.response.body.data.code);
        cy.get(RecoveryAccess.button).click();
      });
      cy.get(RecoveryAccess.success).should("be.visible");
      cy.get(RecoveryAccess.button).eq(1).click();
      cy.get(RegistrationScreen.password)
        .eq(0)
        .type(revoveryEmailWithMobile.passwordUsed);
      cy.get(RegistrationScreen.password)
        .eq(1)
        .type(revoveryEmailWithMobile.passwordUsed);
      cy.get(RegistrationScreen.termscheckbox).click();
      cy.fixture("recoveryAccess.json").then((data) => {
        cy.intercept("POST", "**/api/care/userinfo/set-new-password", {
          statusCode: 201,
          body: data.Congratulations,
        }).as("Congratulation");
      });
      cy.get(RegistrationScreen.continuebutton).click();
      cy.wait("@Congratulation");
      cy.get(RecoveryAccess.congratulation).should("be.visible");
      
    });
  });
});
