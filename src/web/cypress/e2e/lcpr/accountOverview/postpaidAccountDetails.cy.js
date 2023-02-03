import { AccountScreen } from "../../../support/pageObjects/accountOverview";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";

const accountDetails = new AccountScreen();

["Spanish", "English"].forEach((language) => {
  describe(`Account Overview Validation - Postpaid Service  - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.postpaid,
        }).as("fetchAccount");
        cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
        cy.wait("@fetchAccount");
      });
    });

    it(`Validate the Account Details for Postpaid service - ${language}`, () => {
      const postpaid = Cypress.env("translationRes");
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(AccountScreen.myAccount).eq(0).should("be.visible").click();
      accountDetails.verifyPhoneNumber(
        AccountScreen.phoneNumber,
        JSON.parse(window.localStorage.jcaCurrentAccount).serviceNum
      );
      cy.verifyText(
        AccountScreen.displayName,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountAlias
      );
      cy.get(AccountScreen.selectAccount).should("be.visible").click();

      cy.verifyText(
        AccountScreen.accountNumber,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountId
      );
      cy.verifyText(AccountScreen.billAmount, postpaid.shared.totalDueTxt);
      cy.verifyText(
        AccountScreen.issuedDate,
        postpaid.pages.billHistory.formBillDetails.issuedDateTxt
      );
      accountDetails.verifyTitle();
      accountDetails.verifySubTitle();
      accountDetails.verifyAccountNumber();
      accountDetails.verifyEditButton();
      accountDetails.verifyPlanIcons();
      cy.get(AccountScreen.button).each((btn) => {
        cy.wrap(btn).should("be.enabled");
      });
      cy.verifyText(
        AccountScreen.myAccountTitle,
        postpaid.pages.myAccounts.registeredAddressTxt,
        4
      );
      cy.verifyText(AccountScreen.subTitle, postpaid.shared.postpaidTxt, 0);
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
