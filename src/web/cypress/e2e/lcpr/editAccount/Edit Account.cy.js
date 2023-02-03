/// <reference types="cypress" />
import { CommonFunctions } from "../../../support/commonFunctions";
import { EditAccount } from "../../../support/pageObjects/editAccount";

const commonFunctions = new CommonFunctions();
const editAccounts = new EditAccount();
const random = commonFunctions.getRandom(5);

["Spanish", "English"].forEach((language) => {
  describe(`Valid the Edit Account  - ${Cypress.env(
    "environment"
  )} - -${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
    });
    it(`validate the Edit Name unsaved chnages popup content- ${language}`, () => {
      editAccounts.goToAddAccountPage();
      cy.get(EditAccount.cancelButton)
        .scrollIntoView({ duration: 1000 })
        .click();
      cy.get(EditAccount.popup).should("be.visible").click();
      cy.verifyText(
        EditAccount.popuptitle,
        Cypress.env("translationRes").pages.myAccounts.unsavedChangesTitleTxt
      );
      cy.verifyText(
        EditAccount.popupsubtitle,
        Cypress.env("translationRes").pages.myAccounts
          .modalAboutMyAccountSubtitleTxt
      );
      cy.verifyText(
        EditAccount.continuebutton,
        Cypress.env("translationRes").buttonGroup.completeEditingBtnTxt
      );
      cy.verifyText(
        EditAccount.continuebutton,
        Cypress.env("translationRes").buttonGroup.completeEditingBtnTxt
      );
      cy.verifyText(
        EditAccount.withoutsaving,
        Cypress.env("translationRes").buttonGroup.leaveWithoutSavingBtnTxt
      );
    });

    it(`validate saved alias name showing in all the pages - ${language}`, () => {
      editAccounts.goToAddAccountPage();
      cy.get(EditAccount.aliasName).should("be.visible").clear().type(random);
      cy.get(EditAccount.cancelButton)
        .scrollIntoView({ duration: 1000 })
        .click();
      cy.get(EditAccount.continueEditing).click();
      cy.get(EditAccount.savedChanages).click();
      cy.verifyText(
        EditAccount.successtoastbanner,
        Cypress.env("translationRes").shared.alertSavedChangesBodyTxt
      );
      cy.verifyText(EditAccount.accountName, random);
      cy.get(EditAccount.navigateBack).click();
      cy.get(EditAccount.accountlist)
        .find(EditAccount.aliastext)
        .eq(0)
        .then((saved) => {
          const savedtext = saved.text().trim();
          expect(savedtext).to.equal(random.trim());
        });
      cy.get(EditAccount.navigatehome).eq(1).click();
      cy.verifyText(EditAccount.accountName, random);
    });
    it(`update empty alias name  - ${language}`, () => {
      const text = commonFunctions.getRandom(1);
      editAccounts.goToAddAccountPage();
      cy.get(EditAccount.aliasName).should("be.visible").clear().type(text);
      cy.get(EditAccount.aliasName).should("be.visible").type("{backspace}");
      cy.get(EditAccount.savedChanages).click();
      cy.verifyText(
        EditAccount.successtoastbanner,
        Cypress.env("translationRes").shared.alertSavedChangesBodyTxt
      );
      cy.get(EditAccount.aliasinputfield).should('have.value', '')
    });
  });
});
