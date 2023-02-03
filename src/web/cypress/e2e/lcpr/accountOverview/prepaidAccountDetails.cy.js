import { AccountScreen } from "../../../support/pageObjects/accountOverview";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";

const accountDetails = new AccountScreen();

["Spanish", "English"].forEach((language) => {
  describe(`Account Overview Validation - Prepaid Service - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
        cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
        cy.wait("@fetchAccounts");
        console.log(data);
      });
    });
    it(`Validate the Account Details for Prepaid service - ${language}`, () => {
      const prepaid = Cypress.env("translationRes");
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
      cy.get(AccountScreen.myAccount).eq(0).should("be.visible").click();
      cy.verifyText(
        AccountScreen.aliasName,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountAlias
      );
      accountDetails.verifyPhoneNumber(
        AccountScreen.phoneNumber,
        JSON.parse(window.localStorage.jcaCurrentAccount).serviceNum
      );
      cy.get(AccountScreen.selectAccount).should("be.visible").click();
      cy.verifyText(
        AccountScreen.accountName,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountAlias
      );
      cy.verifyText(
        AccountScreen.accountNumber,
        JSON.parse(window.localStorage.jcaCurrentAccount).accountId
      );
      cy.verifyText(AccountScreen.rechargeButton, prepaid.shared.rechargeTxt);
      accountDetails.verifyTitle();
      accountDetails.verifySubTitle();
      accountDetails.verifyAccountNumber();
      accountDetails.verifyEditButton();
      accountDetails.verifyPlanIcons();
      cy.get(AccountScreen.button).each((btn) => {
        cy.wrap(btn).should("be.enabled");
      });
      cy.verifyText(AccountScreen.myBalance, prepaid.shared.myBalanceTxt);
      cy.verifyText(
        AccountScreen.myAccountTitle,
        prepaid.pages.myAccounts.registeredAddressTxt,
        4
      );
      cy.verifyText(AccountScreen.subTitle, prepaid.shared.prepaidTxt, 0);
      const dollar = JSON.parse(window.localStorage.jcaCurrentAccount)
        .currencyCode;
      cy.get(AccountScreen.balanceAmount).then((balance) => {
        expect(balance).to.contain(
          dollar.concat(
            JSON.parse(
              window.localStorage.jcaCurrentAccount
            ).outstandingBal.toString()
          )
        );
      });
    });
  });
});
