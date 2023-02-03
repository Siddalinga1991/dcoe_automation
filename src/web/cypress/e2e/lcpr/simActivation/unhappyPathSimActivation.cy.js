import { CommonFunctions } from "../../../support/commonFunctions";
import { SimActivationScreen } from "../../../support/pageObjects/simActivationScreen";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";
const commonFunction = new CommonFunctions();

["Spanish", "English"].forEach((language) => {
  describe(`Sim activation: Unhappy Path - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Sim activation - activation failed - ${language}`, () => {
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(CommonScreenObjects.menuOptions).contains(Cypress.env("translationRes").mainMenuList.Prepaid.main_menu_list.menu_list[1].title)
        .click();
      cy.url().should("contain", "/sim-activation");
      commonFunction.enterInputField("phoneNumber");
      cy.get(SimActivationScreen.continueButton).click();
      commonFunction.enterInputField("simNumber");
      cy.get(SimActivationScreen.simActivateButton).click();
      cy.get(SimActivationScreen.errorIcon).should("be.visible");
      cy.verifyText(
        CommonScreenObjects.errorTitle,
        Cypress.env("translationRes").errorStrategies
          .simActivationUnsuccesfulTitleTxt
      );
      cy.verifyText(
        SimActivationScreen.errorSubtitle,
        Cypress.env("translationRes").errorStrategies
          .simActivationUnsuccesfulSubtitleTxt
      );
      cy.verifyText(
        SimActivationScreen.buttonText,
        Cypress.env("translationRes").buttonGroup.tryAgainBtnTxt
      );
      cy.verifyText(
        SimActivationScreen.supoortChatButton,
        Cypress.env("translationRes").shared.supportChatTxt
      );
    });
    it(`Sim activation - system error - ${language}`, () => {
      cy.fixture("simActivation.json").then((data) => {
        cy.intercept(UrlConstant.POST_METHOD, UrlConstant.simActivate, {
          statusCode: 400,
          body: data.systemError,
        }).as("simActivate");
      });
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(CommonScreenObjects.menuOptions).contains(Cypress.env("translationRes").mainMenuList.Prepaid.main_menu_list.menu_list[1].title)
        .click();
      cy.url().should("contain", "/sim-activation");
      commonFunction.enterInputField("phoneNumber");
      cy.get(SimActivationScreen.simActivateButton).click();
      commonFunction.enterInputField("simNumber");
      cy.get(SimActivationScreen.simActivateButton).click();
      cy.wait("@simActivate");
      cy.get(SimActivationScreen.errorIcon).should("be.visible");
      cy.verifyText(
        CommonScreenObjects.errorTitle,
        Cypress.env("translationRes").errorStrategies.sharedErrorLabel
          .systemErrorTxt
      );
      cy.verifyText(
        SimActivationScreen.errorSubtitle,
        Cypress.env("translationRes").errorStrategies.systemErrorSubtitleTxt
      );
      cy.verifyText(
        SimActivationScreen.buttonText,
        Cypress.env("translationRes").buttonGroup.tryAgainBtnTxt
      );
      cy.verifyText(
        SimActivationScreen.supoortChatButton,
        Cypress.env("translationRes").shared.supportChatTxt
      );
      cy.get(CommonScreenObjects.button).eq(0).click();
    });
  });
});
