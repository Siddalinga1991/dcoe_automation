/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { RecoveryAccess } from "../../../support/pageObjects/recoveryAccess";
import { revoveryEmailWithMobile } from "../../../fixtures/testDetails";
const commonFunctions = new CommonFunctions();
const randomNum = commonFunctions.getRandomNumber(3);
["Spanish", "English"].forEach((language) => {
  describe(`Recovery Access via Email- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.get(RecoveryAccess.languageSwitch).should("be.visible");
      if (language == "English") {
        cy.get(RecoveryAccess.languageSwitch).click();
      }
    });
    it(`Recovery Access Email with incorrect emailid - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(1).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(randomNum);

      cy.get(RecoveryAccess.backButton).click();
      cy.url().should("contain", "/recover-access");
      cy.get(RecoveryAccess.mobileAccount).eq(1).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(revoveryEmailWithMobile.invalidEmail);
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.error).should("be.visible");
   
      cy.get(RecoveryAccess.button).eq(0).click();
    });

    it(`Recovery Access Email with valid emailid - ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(1).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(revoveryEmailWithMobile.validEmail);
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.successImage).should("be.visible");

      cy.get(RecoveryAccess.sendAgain).eq(2).click();
      cy.get(RecoveryAccess.success).should('be.visible');
 
      cy.get(RecoveryAccess.closepopup).click();
       cy.get(RecoveryAccess.button).click();
   });
});
});