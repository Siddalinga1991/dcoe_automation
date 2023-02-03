import { AccountScreen } from "../../../support/pageObjects/accountOverview";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";

const accountDetails = new AccountScreen();

["Spanish", "English"].forEach((language) => {
  describe(`Account Overview Validation - Fixed Service - ${Cypress.env(
    "environment"
  )} - - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.fixed,
        }).as("fetchAccount");
      });
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.wait("@fetchAccount");
    });

    it(`Validate the Account Details for Fixed Service - ${language}`, () => {
      const fixed = Cypress.env("translationRes");
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(AccountScreen.myAccount).eq(0).should("be.visible").click();
      accountDetails.verifyPhoneNumber(
        AccountScreen.phoneNumber,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountId
      );
      cy.verifyText(
        AccountScreen.displayName,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountAlias
      );
      cy.get(AccountScreen.selectAccount).should("be.visible").click();

      cy.verifyText(
        AccountScreen.accountName,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountAlias
      );
      accountDetails.verifyAccountNumber();
      accountDetails.verifyEditButton();
      accountDetails.verifyPlanIcons();
      cy.get(AccountScreen.billAmount).should(
        "contain",
        fixed.shared.totalDueTxt
      );
      cy.get(AccountScreen.button).each((btn) => {
        cy.wrap(btn).should("be.enabled");
      });
      cy.verifyText(
        AccountScreen.billHistory,
        fixed.buttonGroup.billHistoryBtnTxt
      );
      accountDetails.verifyTitle();
      cy.verifyText(AccountScreen.subTitle, fixed.shared.homeServiceTxt, 0);
      cy.verifyText(
        AccountScreen.subTitle,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountAlias,
        1
      );
      cy.verifyText(
        AccountScreen.subTitle,
        JSON.parse(window.localStorage.jcaCurrentAccount).displayName,
        2
      );
      cy.verifyText(
        AccountScreen.subTitle,
        JSON.parse(window.localStorage.jcaCurrentAccount).email,
        3
      );
      const dollar = JSON.parse(window.localStorage.jcaCurrentAccount)
        .currencyCode;
      cy.get(AccountScreen.balanceAmount).then((amt) => {
        expect(amt.text()).to.equal(
          dollar.concat(
            JSON.parse(
              window.localStorage.jcaCurrentAccount
            ).outstandingBal.toString()
          )
        );
      });
      cy.get(AccountScreen.billNumberField).then((num) => {
        expect(num.text()).to.equal(
          JSON.parse(window.localStorage.jcaCurrentBill).billNumber
        );
      });
    });
  });
});
