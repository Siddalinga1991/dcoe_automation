/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { RechargeScreen } from "../../../support/pageObjects/recharge";
const commonFunctions = new CommonFunctions();
["Spanish", "English"].forEach((language) => {
  describe(`Recharge portal - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.fixture("accountoverview.json").then((data) => {
        cy.intercept("GET", "**/api/care/accounts/fetch-accounts", {
          statusCode: 201,
          body: data.prepaidAccount,
        }).as("fetchAccount");
      });

      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.wait("@fetchAccount");
      cy.get(RechargeScreen.rechargeMenutab).eq(0).click();
    });
    it(`validate the content of transaction summary page - ${language}`, () => {
        cy.get(RechargeScreen.accountList).eq(0).click();
        cy.get(RechargeScreen.customAmtfieldtext).type(commonFunctions.randomnumberFromInterval(5, 500));
        cy.get(RechargeScreen.button).click();
        cy.verifyText(
          RechargeScreen.toastbanner,
          Cypress.env("translationRes").pages.rechargeAccount.summary.alertTxt
        );
        cy.verifyText(
          RechargeScreen.phoneNoText,
          Cypress.env("translationRes").shared.phoneNumberTxt,0
        );
        cy.verifyText(
          RechargeScreen.phoneNoText,
          Cypress.env("translationRes").shared.rechargeAmountTxt,1
        );
        cy.verifyText(
          RechargeScreen.phoneNoText,
          Cypress.env("translationRes").shared.rechargeAmountTxt,1
        );
        cy.verifyText(
          RechargeScreen.phoneNoText,
          Cypress.env("translationRes").pages.billHistory.formBillDetails.taxFeeTxt,2
        );
        cy.verifyText(
          RechargeScreen.localtext,
          Cypress.env("translationRes").shared.termsAppliedTxt
        );
        cy.verifyText(
          RechargeScreen.totalToPay,
          Cypress.env("translationRes").pages.transactionSummary.totalToPayTxt
        );
        cy.get(RechargeScreen.totalbalance).should('have.length',3);
        cy.get(RechargeScreen.button).should('be.visible');
         
         
        });
      });
});