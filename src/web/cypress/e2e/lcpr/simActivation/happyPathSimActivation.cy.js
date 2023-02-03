import { CommonFunctions } from "../../../support/commonFunctions";
import { SimActivationScreen } from "../../../support/pageObjects/simActivationScreen";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";
const commonFunction = new CommonFunctions();

["Spanish", "English"].forEach((language) => {
  describe(`Sim activation: Happy Path - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Sim activation - activation success - ${language}`, () => {
      cy.fixture("simActivation.json").then((data) => {
        cy.intercept(UrlConstant.POST_METHOD, UrlConstant.simActivate, {
          body: data.activationSuccess,
        }).as("simActivate");
      });
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(CommonScreenObjects.menuOptions).contains(Cypress.env("translationRes").mainMenuList.Prepaid.main_menu_list.menu_list[1].title)
        .click();
      cy.url().should("contain", "/sim-activation");
      cy.verifyText(
        SimActivationScreen.pageHeading,
        Cypress.env("translationRes").pages.simActivation.title
      );
      cy.verifyText(
        SimActivationScreen.subtitle,
        Cypress.env("translationRes").pages.simActivation.subtitle
      );
      cy.verifyText(
        SimActivationScreen.formLabel,
        Cypress.env("translationRes").shared.phoneNumberTxt
      );
      cy.get(SimActivationScreen.continueButton).should("be.disabled");
      cy.verifyText(
        SimActivationScreen.continueButton,
        Cypress.env("translationRes").buttonGroup.continueBtnTxt
      );
      commonFunction.enterInputField("phoneNumber");
      cy.get(SimActivationScreen.continueButton).should("be.enabled").click();
      cy.verifyText(
        SimActivationScreen.pageHeading,
        Cypress.env("translationRes").pages.simActivation.title
      );
      cy.verifyText(
        SimActivationScreen.subtitle,
        Cypress.env("translationRes").pages.simActivation.subtitle
      );
      cy.verifyText(
        SimActivationScreen.formLabel,
        Cypress.env("translationRes").pages.simActivation.simStrategyInputLabel
      );
      cy.get(CommonScreenObjects.button).should("be.disabled");
      commonFunction.enterInputField("simNumber");
      cy.verifyText(
        CommonScreenObjects.button,
        Cypress.env("translationRes").buttonGroup.activateBtnTxt
      );
      cy.get(CommonScreenObjects.button).should("be.enabled").click();
      cy.wait("@simActivate");
      cy.get(SimActivationScreen.successIcon).should("be.visible");
      cy.verifyText(
        SimActivationScreen.successTitle,
        Cypress.env("translationRes").pages.simActivation.simActivationSuccess
          .simActivationLabelTitleTxt
      );
      cy.verifyText(
        SimActivationScreen.successSubTitle,
        Cypress.env("translationRes").pages.simActivation.simActivationSuccess
          .simActivationLabelSubtitleTxt
      );
      cy.verifyText(
        SimActivationScreen.buttonText,
        Cypress.env("translationRes").buttonGroup.doneBtnTxt
      );
      cy.verifyText(
        SimActivationScreen.secondaryButton,
        Cypress.env("translationRes").buttonGroup.supportChatBtnTxt
      );
    });
    it(`Sim activation - Validate inline error message - ${language}`, () => {
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(CommonScreenObjects.menuOptions).contains(Cypress.env("translationRes").mainMenuList.Prepaid.main_menu_list.menu_list[1].title)
        .click();
      cy.url().should("contain", "/sim-activation");
      commonFunction.enterInputField("randomNum");
      cy.verifyText(
        SimActivationScreen.errorLine,
        Cypress.env("translationRes").pages.phoneRecharge.phoneInvalidTxt
      );
      cy.get(SimActivationScreen.continueButton).should("be.disabled");
      commonFunction.enterInputField("phoneNumber");
      cy.get(SimActivationScreen.continueButton).click();
      commonFunction.enterInputField("randomNum");
      cy.verifyText(
        SimActivationScreen.errorLine,
        Cypress.env("translationRes").pages.simActivation.inputInvalidText
      );
      cy.get(CommonScreenObjects.button).should("be.disabled");
      cy.verifyText(
        SimActivationScreen.simCardLink,
        Cypress.env("translationRes").pages.simActivation.whereIsMySim
      );
      cy.get(SimActivationScreen.simCardLink).click();
      cy.get(SimActivationScreen.modal).should("be.visible");
      cy.verifyText(
        SimActivationScreen.dialogTitle,
        Cypress.env("translationRes").pages.simActivation.whereIsMySimModal
          .title
      );
      cy.get(SimActivationScreen.image).should("be.visible");
      cy.verifyText(
        SimActivationScreen.dialogHeading,
        Cypress.env("translationRes").pages.simActivation.whereIsMySimModal
          .subtitle
      );
      cy.verifyText(
        SimActivationScreen.dialogDescription,
        Cypress.env("translationRes").pages.simActivation.whereIsMySimModal
          .description
      );
      cy.verifyText(
        SimActivationScreen.orderList,
        Cypress.env("translationRes").pages.simActivation.whereIsMySimModal
          .bulletPointOne,
        0
      );
      cy.verifyText(
        SimActivationScreen.orderList,
        Cypress.env("translationRes").pages.simActivation.whereIsMySimModal
          .bulletPointTwo.boldSection +
          Cypress.env("translationRes").pages.simActivation.whereIsMySimModal
            .bulletPointTwo.regularSection,
        1
      );
      cy.verifyText(
        SimActivationScreen.orderList,
        Cypress.env("translationRes").pages.simActivation.whereIsMySimModal
          .bulletPointThree,
        2
      );
      cy.verifyText(
        CommonScreenObjects.button,
        Cypress.env("translationRes").shared.supportChatTxt,
        1
      );
      cy.get(SimActivationScreen.dialogClose).click();
    });
  });
});
