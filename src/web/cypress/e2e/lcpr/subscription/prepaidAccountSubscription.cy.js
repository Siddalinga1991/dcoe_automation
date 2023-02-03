/// <reference types="cypress" />
import { SubscriptionScreen } from "../../../support/pageObjects/SubscriptionScreen";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";

const subscription = new SubscriptionScreen();

["Spanish", "English"].forEach((language) => {
  describe(`Subscription Page Validation - Prepaid Services - ${Cypress.env(
    "environment"
  )} - - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.fixture("subscription.json").then((data) => {
        cy.intercept(UrlConstant.POST_METHOD, UrlConstant.subscription, {
          statusCode: 201,
          body: data.prepaid,
        }).as("fetchSubscription");
      });
    });
    it(`Subscription and Addon Validation for Prepaid Services - ${language}`, () => {
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.verifyIsVisible(CommonScreenObjects.greetingText);
      cy.verifyIsVisible(SubscriptionScreen.myActiveProduct);
      cy.get(SubscriptionScreen.subscriptionTitle)
        .eq(0)
        .should("be.exist")
        .click();
      let lang = "";
      if (language == "Spanish") {
        lang = "es-ES";
      } else {
        lang = "en-US";
      }
      for (let i = 0; i < 2; i++) {
        subscription.verifyPlan(i, lang);
        subscription.verifyIcon(i);
        cy.get(SubscriptionScreen.subscriptionTitle)
          .eq(i + 1)
          .should("be.exist")
          .click();
      }
      subscription.verifyAddOn(lang);
      subscription.verifyIcon(2);
    });
  });
});
