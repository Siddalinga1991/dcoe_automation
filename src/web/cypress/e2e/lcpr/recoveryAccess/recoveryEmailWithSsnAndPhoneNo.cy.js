/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { RecoveryAccess } from "../../../support/pageObjects/recoveryAccess";
import { revoveryEmailWithMobile } from "../../../fixtures/testDetails";
const commonFunctions = new CommonFunctions();
const randomNum = commonFunctions.getRandomNumber(3);
const randomPhoneNo = commonFunctions.getRandomNumber(10);
const randomSsn = commonFunctions.getRandomNumber(4);
const randomAccount = commonFunctions.getRandomNumber(16);
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
    it(`Recovery Access Email with incomplete AccountNo, SSN and phone No- ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(2).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(randomNum);
      cy.get(RecoveryAccess.inputNumber).eq(1).type(randomNum);
  
      cy.get(RecoveryAccess.phoneNumberTab).click();
      cy.get(RecoveryAccess.inputNumber).eq(1).type(randomNum);

     cy.get(RecoveryAccess.backButton).click();
      cy.url().should("contain", "/recover-access");
    });

    it(`Recovery Access Email with invalid Account No, SSN and phone No- ${language}`, () => {
     
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(2).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(randomAccount);
      cy.get(RecoveryAccess.inputNumber).eq(1).type(randomSsn);
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.error).should('be.visible');

      cy.get(RecoveryAccess.button).eq(0).click();
      cy.url().should("contain", "/recover-access");
      cy.get(RecoveryAccess.inputNumber).eq(0).type(randomAccount);
      cy.get(RecoveryAccess.phoneNumberTab).click();
      cy.get(RecoveryAccess.inputNumber).eq(1).type(randomPhoneNo);
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.error).should('be.visible');
  
      cy.get(RecoveryAccess.backButton).click();
      cy.url().should("contain", "/recover-access");

    });
    it(`Recovery Access Email with valid Account No, SSN and phone No- ${language}`, () => {
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(2).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(revoveryEmailWithMobile.accountNumber);
      cy.get(RecoveryAccess.inputNumber).eq(1).type(revoveryEmailWithMobile.ssnNumber);
      cy.get(RecoveryAccess.button).click();
      cy.get(RecoveryAccess.success).should("be.visible");
  
      cy.get(RecoveryAccess.button).eq(1).click();
      cy.url().should("contain", "/login");
      cy.get(RecoveryAccess.cannotLogin).click();
      cy.get(RecoveryAccess.mobileAccount).eq(2).click();
      cy.get(RecoveryAccess.inputNumber).eq(0).type(revoveryEmailWithMobile.accountNumber);
      cy.get(RecoveryAccess.phoneNumberTab).click();
      cy.get(RecoveryAccess.inputNumber).eq(1).type(randomPhoneNo);
      cy.fixture("recoveryAccess.json").then((data) => {
      cy.intercept("POST", "**/care/userinfo/forgot-email", {
        statusCode: 201,
        body: data.RecoverySuccess,
      }).as("Success");
    });
      cy.get(RecoveryAccess.button).click();
      cy.wait('@Success')
      cy.get(RecoveryAccess.success).should("be.visible");
 
    });
})
});