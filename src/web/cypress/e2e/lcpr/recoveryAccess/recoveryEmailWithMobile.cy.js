/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { RecoveryAccess } from "../../../support/pageObjects/recoveryAccess";
import { revoveryEmailWithMobile } from "../../../fixtures/testDetails";
const commonFunctions = new CommonFunctions();
const randomNum = commonFunctions.getRandomNumber(3);
["Spanish", "English"].forEach((language) => {
  describe(`Recovery Access Sceanrio- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.get(RecoveryAccess.languageSwitch).should("be.visible");
      if (language == "English") {
        cy.get(RecoveryAccess.languageSwitch).click();
      }
    });
    it(`Recovery Access Email with incomplete mobile Account and Pin - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
   
      cy.get(RecoveryAccess.mobileAccount).eq(3).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(randomNum);
      cy.get(RecoveryAccess.inputNumber).eq(1).type(randomNum);
    
      cy.get(RecoveryAccess.backButton).click();
      cy.url().should("contain", "/recover-access");
    });

    it(`Recovery Access Email with valid mobile Account and Pin - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();

      cy.get(RecoveryAccess.mobileAccount).eq(3).click();
      cy.get(RecoveryAccess.inputNumber)
        .eq(0)
        .type(revoveryEmailWithMobile.mobileNumber);
      cy.get(RecoveryAccess.inputNumber)
        .eq(1)
        .type(revoveryEmailWithMobile.mobilePin);
      
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.success).should("be.visible");
      
      cy.get(RecoveryAccess.button).eq(1).click();
      cy.url().should("contain", "/login");
    });

    it(`Recovery Access Email with invalid mobile Account and Pin - ${language}`, () => {
      const PhoneNumber = commonFunctions.getRandomNumber(10);
      const PinNumber = commonFunctions.getRandomNumber(4);
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(3).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(PhoneNumber);
      cy.get(RecoveryAccess.inputNumber).eq(1).type(PinNumber);
      cy.get(RecoveryAccess.button).click();
      
      cy.get(RecoveryAccess.error).should("be.visible");
      cy.get(RecoveryAccess.button).eq(0).click();
      cy.url().should("contain", "/recover-access");
    });
  });
});
