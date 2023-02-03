/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { PaymentDetailsScreen } from "../../../support/pageObjects/paymentDetailsScreen";
import { creditCardDetails } from "../../../fixtures/testDetails";
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
      cy.get(RechargeScreen.accountList).eq(0).click();
      cy.get(RechargeScreen.customAmtfieldtext).type(
        commonFunctions.randomnumberFromInterval(5, 500)
      );
      cy.get(RechargeScreen.button).click();
      cy.get(RechargeScreen.conetent).should("be.visible");
      cy.get(RechargeScreen.button).click();
      cy.get(RechargeScreen.popup).should("be.visible");
      cy.get(RechargeScreen.button).eq(1).click();
      cy.get(RechargeScreen.subtitvisble).should("be.visible");
    });
    it(`validate the conetent in card details page and payment approved  - ${language}`, () => {
      cy.verifyText(
        RechargeScreen.cardDeatilstext,
        Cypress.env("translationRes").pages.rechargeAccount.rechargePayment
          .nameOnCardTxt
      );
      cy.verifyText(
        RechargeScreen.cardDeatilstext,
        Cypress.env("translationRes").pages.rechargeAccount.rechargePayment
          .cardNumberTxt,
        1
      );
      cy.verifyText(
        RechargeScreen.cardDeatilstext,
        Cypress.env("translationRes").pages.transaction.expLabelTxt,
        2
      );
      cy.verifyText(
        RechargeScreen.cardDeatilstext,
        Cypress.env("translationRes").pages.transaction.cvvLabelTxt,
        3
      );
      cy.findElementInFrame(
        PaymentDetailsScreen.cardHolderName,
        PaymentDetailsScreen.cardHolderIframe
      )
        .should("be.visible")
        .type(Cypress.env("randomName"));
      cy.findElementInFrame(
        PaymentDetailsScreen.creditCardField,
        PaymentDetailsScreen.creditCareNumberIframe
      )
        .should("be.visible")
        .type(creditCardDetails.cardNumber);
      cy.findElementInFrame(
        PaymentDetailsScreen.creditCardExpiration,
        PaymentDetailsScreen.expirationDateIframe
      )
        .should("be.visible")
        .type(creditCardDetails.expirationDate);
      cy.findElementInFrame(
        PaymentDetailsScreen.cvvField,
        PaymentDetailsScreen.cvvIframe
      )
        .should("be.visible")
        .type(creditCardDetails.cvv);
      cy.get(PaymentDetailsScreen.button).should("be.enabled").click();
      cy.get(RechargeScreen.successicon).should("be.visible");
      cy.verifyText(
        RechargeScreen.recharagetext,
        Cypress.env("translationRes").pages.topUpPaymentSuccess.subtitleTxt
      );
      cy.get(RechargeScreen.button).should("be.visible");
    });

    it(`Recharge portal - payment transaction error in - ${language}`, () => {
      cy.fixture("recharge.json").then((data) => {
        cy.intercept("POST", "**/payment", {
          statusCode: 201,
          body: data.failedtranscation,
        }).as("payment1");

        cy.findElementInFrame(
          PaymentDetailsScreen.cardHolderName,
          PaymentDetailsScreen.cardHolderIframe
        )
          .should("be.visible")
          .type(Cypress.env("randomName"));
        cy.findElementInFrame(
          PaymentDetailsScreen.creditCardField,
          PaymentDetailsScreen.creditCareNumberIframe
        )
          .should("be.visible")
          .type(creditCardDetails.cardNumber);
        cy.findElementInFrame(
          PaymentDetailsScreen.creditCardExpiration,
          PaymentDetailsScreen.expirationDateIframe
        )
          .should("be.visible")
          .type(creditCardDetails.expirationDate);
        cy.findElementInFrame(
          PaymentDetailsScreen.cvvField,
          PaymentDetailsScreen.cvvIframe
        )
          .should("be.visible")
          .type(creditCardDetails.cvv);
        cy.get(PaymentDetailsScreen.button).should("be.enabled").click();
        cy.wait("@payment1");
        cy.get(RechargeScreen.error).should("be.visible");

        cy.verifyText(
          RechargeScreen.errorTitle,
          Cypress.env("translationRes").errorStrategies.transactionErrorTitleTxt
        );
        cy.verifyText(
          RechargeScreen.errorsubtitle,
          Cypress.env("translationRes").errorStrategies
            .transactionErrorSubtitleTxt
        );
      });
    });

    it(`Recharge portal - payment declined error in - ${language}`, () => {
      cy.fixture("recharge.json").then((data) => {
        cy.intercept("POST", "**/payment", {
          statusCode: 201,
          body: data.transactiondecline,
        }).as("payment1");

        cy.findElementInFrame(
          PaymentDetailsScreen.cardHolderName,
          PaymentDetailsScreen.cardHolderIframe
        )
          .should("be.visible")
          .type(Cypress.env("randomName"));
        cy.findElementInFrame(
          PaymentDetailsScreen.creditCardField,
          PaymentDetailsScreen.creditCareNumberIframe
        )
          .should("be.visible")
          .type(creditCardDetails.cardNumber);
        cy.findElementInFrame(
          PaymentDetailsScreen.creditCardExpiration,
          PaymentDetailsScreen.expirationDateIframe
        )
          .should("be.visible")
          .type(creditCardDetails.expirationDate);
        cy.findElementInFrame(
          PaymentDetailsScreen.cvvField,
          PaymentDetailsScreen.cvvIframe
        )
          .should("be.visible")
          .type(creditCardDetails.cvv);
        cy.get(PaymentDetailsScreen.button).should("be.enabled").click();
        cy.wait("@payment1");
      });
      cy.verifyText(
        RechargeScreen.errorTitle,
        Cypress.env("translationRes").errorStrategies
          .transactionDeclinedTitleTxt
      );
      cy.verifyText(
        RechargeScreen.errorsubtitle,
        Cypress.env("translationRes").errorStrategies
          .transactionDeclinedSubtitleTxt
      );
    });
  });
});
