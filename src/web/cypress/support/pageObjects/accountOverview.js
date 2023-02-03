export class AccountScreen {
  static myAccount = 'lla-main-menu [class*="bold link"]';
  static aliasName = '[class*="content__title"]';
  static planContent = '[class*="body content"]';
  static selectAccount = '[data-cy="llac-actionable-lists"]';
  static accountDetails = '[data-cy="lla-breadcrumb-2"]';
  static accountNumber = "#lla-account-number-field";
  static accountInfo = "lla-account-info .account-info";
  static accountName = "#lla-account-name";
  static serviceNumber = "#lla-service-number";
  static phoneNumber = '[class*="body content"]';
  static planExpires = '[class*="plan-expiry-txt"]';
  static myBalance = "#my-prepaid-balance";
  static accountNumTitle = "#lla-account-number-text";
  static planIcons = ".container lla-icon";
  static myAccountTitle = '[class*=" title-txt"]';
  static autopayAlert = '[class*="alert__title "]';
  static autopayDateTitle = "#lla-autopay-date-text";
  static rechargeButton = '.bill-box-prepaid__recharge [data-cy="lla-button"]';
  static editButton = 'lla-about-my-account [data-cy="lla-button"]';
  static subTitle = ".subtitle-txt";
  static button = '[data-cy="lla-button"]';
  static balanceAmount = "#lla-balance";
  static billAmount = "#lla-total-due-text";
  static issuedDate = "#lla-due-date-text";
  static billNumber = "#lla-bill-number";
  static currentBillDate = "#lla-currentBill-date";
  static displayName = '[class*="content__title"]';
  static autoapayDate = "#lla-autopay-date";
  static billNumberField = ".bill-number__field";
  static billHistory = "#bill-history-button";

  verifyTitle() {
    cy.verifyText(
      AccountScreen.myAccountTitle,
      Cypress.env("translationRes").pages.myAccounts.serviceCategoryTxt,
      0
    );
    cy.verifyText(
      AccountScreen.myAccountTitle,
      Cypress.env("translationRes").pages.myAccounts.accountAliasTxt,
      1
    );
    cy.verifyText(
      AccountScreen.myAccountTitle,
      Cypress.env("translationRes").pages.myAccounts.registeredNameTxt,
      2
    );
    cy.verifyText(
      AccountScreen.myAccountTitle,
      Cypress.env("translationRes").shared.registeredEmailTxt,
      3
    );
  }
  verifySubTitle() {
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
    cy.get(AccountScreen.subTitle)
      .eq(4)
      .then((addr) => {
        expect(addr.text().trim()).to.equal(
          JSON.parse(window.localStorage.jcaCurrentAccount).billingAddr
        );
      });
  }
  verifyAccountNumber() {
    cy.get(AccountScreen.accountNumTitle).should(
      "contain",
      Cypress.env("translationRes").shared.accountNumberTxt
    );
  }
  verifyEditButton() {
    cy.get(AccountScreen.editButton).should(
      "contain",
      Cypress.env("translationRes").buttonGroup.editAccountBtnTxt
    );
  }
  verifyPlanIcons() {
    cy.get(AccountScreen.planIcons).each((icon) => {
      cy.wrap(icon).should("be.visible");
    });
  }
  verifyPhoneNumber(element, response) {
    cy.get(element).then((number) => {
      const phoNum = number.text().replace(/[^a-zA-Z0-9]/g, "");
      expect(phoNum).to.equal(response);
    });
  }
}
