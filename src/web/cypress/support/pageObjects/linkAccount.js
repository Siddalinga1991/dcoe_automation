import { CommonFunctions } from "../commonFunctions";
import { UrlConstant } from "../urlConstants";
import { CommonScreenObjects } from "./commonObjects";
const commonFunctions = new CommonFunctions();
export class LinkAccount {
  static myAccount = '[data-cy="lla-top-bar"] a[class="link-handler"]';
  static addAccountButton = "#lla-link-account";
  static mobileAccount = 'lla-add-account [data-cy="llac-actionable-lists"]';
  static continueButton = '.llac-add-account [data-cy="lla-button"]';
  static pinNumberInput = "#lla-enter-pinNumber";
  static errorIcon = "#lla-error-image";
  static successIcon = "#lla-success-icon";
  static greetingText = "#lla-user-info-name";
  static supportChatButton = "#lla-support-chat-button";
  static toggleButton = 'lla-add-account button[type="button"]';
  static goToMyAccountButton = "#lla-account-linked-button-text";
  static pinNumberLink = "#lla-buttons-link";
  static title = ".modalTitle";
  static subtitle = ".modalSubTitle";
  static heading = ".llac-add-account .main-container__form__heading";
  static subHeading = ".main-container__form__sub-heading";
  static inputLabel = '[data-cy="lla-label"]';
  static hintText = "#lla-input-hint-text";
  static validatorTitle = ".validator-title";
  static successTitle = ".llac-add-account__success-title";
  static numberLabel = ".success-display";
  static buttonText = ".btn-text";
  static errorMsg = ".main-container__form__error-validation";
  static labels = ".main-container__form__label";
  static pageTitle = ".dialog-title";
  static successPageButton = '.llac-add-account__button-summary';
  static pageName = '.lla-page-name';
  static errorTitle = '#lla-error-title';
  static errorSubtitle = '#lla-error-subtitle';
  static pinNumberTitle = '.pin-txt';
  static pinParagraph = '.pin-paragraph';
  enterInput(input1, input2) {
    commonFunctions.enterInputField(input1);
    cy.get(LinkAccount.continueButton).click();
    if (input2 == "phoneNumber") {
      cy.toggleButton(input2);
    } else {
      commonFunctions.enterInputField(input2);
    }
    cy.get(LinkAccount.continueButton).click();
  }
  interceptLinkedAccountApi(aliasName) {
    cy.fixture("linkAccount.json").then((data) => {
      cy.intercept(UrlConstant.POST_METHOD, UrlConstant.linkAccount, {
        statusCode: 201,
        body: data.alreadyLinked,
      }).as(aliasName);
    });
  }
  interceptLinkedSuccessApi(aliasName) {
    cy.fixture("linkAccount.json").then((data) => {
      cy.intercept(UrlConstant.POST_METHOD, UrlConstant.linkAccount, {
        statusCode: 201,
        body: data.linkAccount,
      }).as(aliasName);
    });
  }
  goToAddAccountPage() {
    cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
    cy.get(LinkAccount.greetingText).should("be.visible");
    cy.get(LinkAccount.myAccount).eq(0).click();
    cy.get(LinkAccount.addAccountButton).click();
  }
  errorPageValidation(errorTitle, errorSubTitle) {
    cy.get(LinkAccount.errorIcon).should("be.visible");
    cy.verifyText(LinkAccount.errorTitle, errorTitle);
    cy.verifyText(LinkAccount.errorSubtitle, errorSubTitle);
    cy.verifyText(LinkAccount.buttonText, Cypress.env('translationRes').buttonGroup.tryAgainBtnTxt, 1);
    cy.verifyText(LinkAccount.buttonText, Cypress.env('translationRes').shared.supportChatTxt, 2);
    cy.get(CommonScreenObjects.errorTryAgainButton).click();
  }
}
