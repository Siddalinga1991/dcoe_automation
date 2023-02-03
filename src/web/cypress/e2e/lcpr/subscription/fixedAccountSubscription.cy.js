import { SubscriptionScreen } from "../../../support/pageObjects/subscriptionScreen";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";

["Spanish", "English"].forEach((language) => {
  describe(`Subscription Page Validation - Fixed Services - ${Cypress.env(
    "environment"
  )} - - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Subscription Page Validation for Fixed Services - ${language}`, () => {
      cy.fixture("subscription.json").then((data) => {
        cy.intercept(UrlConstant.POST_METHOD, UrlConstant.subscription, {
          statusCode: 201,
          body: data.fixed,
        }).as("fetchSubscriptionPlan");
        cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
        cy.verifyIsVisible(CommonScreenObjects.greetingText);
        cy.verifyIsVisible(SubscriptionScreen.myActiveProduct);
        cy.get(SubscriptionScreen.subscriptionTitle)
          .eq(0)
          .should("be.exist")
          .click();
        cy.verifyText(
          SubscriptionScreen.subscriptionTitle,
          data.fixed.data.packages[0].name["en-US"]
        );
        cy.get(SubscriptionScreen.subscriptionPlan).each((plans, index) => {
          cy.verifyText(
            plans,
            data.fixed.data.packages[0].children[index].name["en-US"]
          ),
            index;
        });
        cy.get(SubscriptionScreen.subscriptionIcon).each((icons) => {
          cy.wrap(icons).should("be.visible");
        });
      });
    });
  });
});
