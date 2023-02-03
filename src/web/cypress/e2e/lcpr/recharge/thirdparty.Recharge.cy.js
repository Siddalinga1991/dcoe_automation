/// <reference types="cypress" />
import { phoneNumberDetails } from "../../../fixtures/testDetails";
import { HomeScreen } from "../../../support/pageObjects/homeScreen";
import { RechargeScreen } from "../../../support/pageObjects/recharge";
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
    });
    it(`validate the inline error  - ${language}`, () => {
      cy.get(RechargeScreen.rechargeMenutab).eq(0).click();
      cy.get(RechargeScreen.thirdParty).click();
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.shortNumber);
      cy.verifyText(
        HomeScreen.phoneNumberInLineError,
        Cypress.env("translationRes").pages.phoneRecharge.phoneInvalidTxt
      );
      cy.get(HomeScreen.rechargeButton).should("not.be.enabled");
    });

    it(`Phone number field suspended number validation - ${language}`, () => {
      cy.get(RechargeScreen.rechargeMenutab).eq(0).click();
      cy.get(RechargeScreen.thirdParty).click();
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
      cy.get(HomeScreen.phoneNumberInLineError).should("not.exist");
      cy.get(HomeScreen.rechargeButton).should("not.be.disabled");
      cy.fixture("recharge.json").then((data) => {
        cy.intercept(
          "GET",
          `**/validate-number?publicIdentifier=1${phoneNumberDetails.active}`,
          {
            statusCode: 201,
            body: data.stolen,
          }
        ).as("stolen");
      });
      cy.get(HomeScreen.rechargeButton).click();
      cy.wait("@stolen");
      cy.verifyText(
        RechargeScreen.errortile,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel
          .phoneNumberErrorTxt
      );
      cy.verifyText(
        RechargeScreen.errorsubtitle,
        Cypress.env("translationRes").errorStrategies
          .phoneNumberSuspendedErrorSubtitleTxt
      );
    });

    it(`Phone number api fails with system error - ${language}`, () => {
      cy.get(RechargeScreen.rechargeMenutab).eq(0).click();
      cy.get(RechargeScreen.thirdParty).click();
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
      cy.get(HomeScreen.phoneNumberInLineError).should("not.exist");
      cy.get(HomeScreen.rechargeButton).should("not.be.disabled");
      cy.intercept(
        "GET",
        `**/validate-number?publicIdentifier=1${phoneNumberDetails.active}`,
        {
          statusCode: 401,
        }
      ).as("systemerror");

      cy.get(HomeScreen.rechargeButton).click();
      cy.wait("@systemerror");
      cy.verifyText(
        RechargeScreen.errortile,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel
          .systemErrorTxt
      );
      cy.verifyText(
        RechargeScreen.errorsubtitle,
        Cypress.env("translationRes").errorStrategies.systemErrorSubtitleTxt
      );
    });

    it(`Phone number field cancelled number validation - ${language}`, () => {
      cy.get(RechargeScreen.rechargeMenutab).eq(0).click();
      cy.get(RechargeScreen.thirdParty).click();
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
      cy.get(HomeScreen.phoneNumberInLineError).should("not.exist");
      cy.get(HomeScreen.rechargeButton).should("not.be.disabled");
      cy.fixture("recharge.json").then((data) => {
        cy.intercept(
          "GET",
          `**/validate-number?publicIdentifier=1${phoneNumberDetails.active}`,
          {
            statusCode: 201,
            body: data.cancel,
          }
        ).as("cancel");
      });
      cy.get(HomeScreen.rechargeButton).click();
      cy.wait("@cancel");
      cy.verifyText(
        RechargeScreen.errortile,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel
          .phoneNumberErrorTxt
      );
      cy.verifyText(
        RechargeScreen.errorsubtitle,
        Cypress.env("translationRes").errorStrategies
          .phoneNumberInactiveErrorSubtitleTxt
      );
    });
    it(`Phone number field Active number validation - ${language}`, () => {
      cy.get(RechargeScreen.rechargeMenutab).eq(0).click();
      cy.get(RechargeScreen.thirdParty).click();
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
      cy.get(HomeScreen.phoneNumberInLineError).should("not.exist");
      cy.get(HomeScreen.rechargeButton).should("not.be.disabled");
      cy.get(HomeScreen.rechargeButton).click();
      cy.get(RechargeScreen.rechargecustomfield).should("be.visible");
    });

    it(`Recharge Third Party Limit Validation - ${language}`, () => {
      cy.fixture("recharge.json").then((data) => {
        cy.intercept(
          "POST",
          "**/api/care/saved-accounts/read",
          {
            statusCode: 201,
            body: data.savedAccounts,
          }
        ).as("limit");
      })
      cy.get(RechargeScreen.rechargeMenutab).eq(0).click();
      cy.wait("@limit")
      cy.get(RechargeScreen.thirdParty).click();
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
      cy.get(HomeScreen.phoneNumberInLineError).should("not.exist");
      cy.get(HomeScreen.rechargeButton).should("not.be.disabled");

      cy.get(RechargeScreen.checkBox).should('be.disabled')
      cy.verifyText(
        RechargeScreen.thirdPartyLimitText,
        Cypress.env("translationRes").pages.rechargeAccount.thirdPartyRecharge.saveAccountCheckboxDisableTxt
      );
      cy.get(HomeScreen.rechargeButton).should('be.visible').and('be.enabled');

    });
  });
});
