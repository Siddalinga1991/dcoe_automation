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

    it(`validate the recharge account page - ${language}`, () => {
      cy.verifyText(
        RechargeScreen.selectAnAccountTxt,
        Cypress.env("translationRes").pages.accounts.selectAnAccountTxt
      );
      cy.verifyText(
        RechargeScreen.subTitle,
        Cypress.env("translationRes").pages.rechargeAccount
          .rechargeAccountSubTitleTxt
      );
      cy.verifyText(
        RechargeScreen.thirdparty,
        Cypress.env("translationRes").shared.rechargeThirdPartyTxt
      );
    });

    it(`validate the recharge Selelct an amount page - ${language}`, () => {
      cy.get(RechargeScreen.accountList).eq(0).click();
      cy.verifyText(
        RechargeScreen.selectAnAmount,
        Cypress.env("translationRes").shared.selectAmountTxt
      );
      // cy.verifyText(
      //   RechargeScreen.rechargeNoText,
      //   Cypress.env(
      //     "translationRes"
      //   ).pages.rechargeAccount.amountToRecharge.titleTxt.concat(
      //     JSON.parse(window.localStorage.jcaCurrentAccount).serviceNum
      //   )
      // );
      cy.verifyText(
        RechargeScreen.subcontenttitle,
        Cypress.env("translationRes").pages.rechargeAccount.amountToRecharge
          .subTitleTxt
      );

      cy.get(RechargeScreen.rechargeAmt).each(($val, $index) => {
        expect($val.text().trim()).to.contain(
          Cypress.env("MarketConfig").rechargePortal.rechargeAmount[$index]
            .content.price
        );
      });
      cy.verifyText(
        RechargeScreen.customAmountText,
        Cypress.env("translationRes").shared.customAmountTxt
      );

    });
    it(`validate the custom amount field - ${language}`, () => {
      cy.get(RechargeScreen.accountList).eq(0).click();
      cy.get(RechargeScreen.customAmtfieldtext).type(commonFunctions.randomnumberFromInterval(1, 4));
      cy.verifyText(
        RechargeScreen.inlineErrorcustomAmt,
        Cypress.env("translationRes").shared.rechargeConditionTxt
      );
      cy.get(RechargeScreen.customAmtfieldtext).clear().type(commonFunctions.randomnumberFromInterval(501, 1000));
      cy.verifyText(
        RechargeScreen.inlineErrorcustomAmt,
        Cypress.env("translationRes").shared.rechargeConditionTxt
      );
      cy.get(RechargeScreen.customAmtfieldtext).clear().type(commonFunctions.randomnumberFromInterval(5, 500));
      cy.get(RechargeScreen.button).click();
    });
  });
});
