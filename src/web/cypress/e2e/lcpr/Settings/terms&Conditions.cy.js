import { CommonFunctions } from "../../../support/commonFunctions";
import { Settings } from "../../../support/pageObjects/settings";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";

const commonFunction = new CommonFunctions();

["Spanish", "English"].forEach((language) => {
  describe(`Terms & Conditions Page Validation - ${Cypress.env(
    "environment"
  )} - - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`Terms & Conditions - ${language}`, () => {
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
      cy.get(Settings.termsLink).click();
      cy.verifyText(
        Settings.termsTitle,
        Cypress.env("translationRes").shared.termsConditionsTxt
      );
      const replacedRes = commonFunction.replaceATags(
        Cypress.env("translationRes").pages.termsConditions.termsMainContentTxt
      );
      cy.verifyText(
        Settings.termsDescription,
        commonFunction.replaceBRtags(replacedRes)
      );
      cy.get(Settings.termsDiv).each((val, index) => {
        cy.verifyText(
          Settings.termsAccordianHeader,
          commonFunction.replaceBRtags(
            Cypress.env("translationRes").pages.termsConditions.termsContents[
              index
            ].titleTxt
          ),
          index
        );
        const updatedRes = commonFunction.replaceUTags(
          Cypress.env("translationRes").pages.termsConditions.termsContents[
            index
          ].contentTxt
        );
        const removedAtext = commonFunction.replaceATags(updatedRes);
        cy.verifyText(
          Settings.termsContent,
          commonFunction.replaceBRtags(removedAtext),
          index
        );
    });
  });
  });
});
