import { Settings } from "../../../support/pageObjects/settings";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";

["Spanish", "English"].forEach((language) => {
  describe(`Settings Page Validation - ${Cypress.env(
    "environment"
  )} - - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
    });
    it(`Settings for Fixed Services - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.fixed,
        }).as("fetchAccounts");
      });
      cy.fixture("fetchAccountOverview.json").then((data) => {
        cy.intercept(
          UrlConstant.POST_METHOD,
          UrlConstant.fetchAccountOverview,
          {
            body: data.fixed,
          }
        ).as("fetchAccountOverview");
      });
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
        cy.get(Settings.breadcrumb).should("be.visible");
        cy.get(Settings.settingList).each(($val, $index) => {
          cy.verifyText(
            Settings.settingOptions,
            Cypress.env("translationRes").appSettings.home[$index]
              .displayNameTxt,
            $index
          );
          cy.verifyText(
            Settings.settingOptionDesc,
            Cypress.env("translationRes").appSettings.home[$index].bodyTxt,
            $index
          );
        });
        cy.verifyText(
          Settings.termsLink,
          Cypress.env("translationRes").shared.termsConditionsTxt
        );
      });
    });
    it(`Settings for Prepaid Services- ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
      });
      cy.fixture("fetchAccountOverview.json").then((data) => {
        cy.intercept(
          UrlConstant.POST_METHOD,
          UrlConstant.fetchAccountOverviewPrepaid,
          {
            body: data.prepaid,
          }
        ).as("fetchAccountOverview");
      });
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
        cy.get(Settings.breadcrumb).should("be.visible");
        cy.get(Settings.settingList).each(($val, $index) => {
          cy.verifyText(
            Settings.settingOptions,
            Cypress.env("translationRes").appSettings.prepaid[$index]
              .displayNameTxt,
            $index
          );
          cy.verifyText(
            Settings.settingOptionDesc,
            Cypress.env("translationRes").appSettings.prepaid[$index].bodyTxt,
            $index
          );
        });
        cy.verifyText(
          Settings.termsLink,
          Cypress.env("translationRes").shared.termsConditionsTxt
        );
      });
    });
    it(`Settings for Postpaid Services - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.postpaid,
        }).as("fetchAccounts");
      });
      cy.fixture("fetchAccountOverview.json").then((data) => {
        cy.intercept(
          UrlConstant.POST_METHOD,
          UrlConstant.fetchAccountOverview,
          {
            body: data.postpaid,
          }
        ).as("fetchAccountOverview");
      });
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
        cy.get(Settings.breadcrumb).should("be.visible");
        cy.get(Settings.settingList).each(($val, $index) => {
          cy.verifyText(
            Settings.settingOptions,
            Cypress.env("translationRes").appSettings.postpaid[$index]
              .displayNameTxt,
            $index
          );
          cy.verifyText(
            Settings.settingOptionDesc,
            Cypress.env("translationRes").appSettings.postpaid[$index].bodyTxt,
            $index
          );
        });
        cy.verifyText(
          Settings.termsLink,
          Cypress.env("translationRes").shared.termsConditionsTxt
        );
      });
    });
  });
});
