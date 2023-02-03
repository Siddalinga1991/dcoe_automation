
export class EditAccount {
  static myAccount = '[data-cy="lla-top-bar"] a[class="link-handler"]';
  static accountlist = '[data-cy="llac-actionable-lists"]';
  static editButton = '#lla-home-button [data-cy="lla-button"]';
  static cancelButton = '#lla-cancel-button-text [data-cy="lla-button"]';
  static popup = "#cdk-overlay-0";
  static popuptitle = "#lla-unsaved-text";
  static popupsubtitle = "#lla-account-sub-text";
  static continuebutton = '#lla-close-button [data-cy="lla-button"]';
  static withoutsaving =
    '#lla-leave-without-saving-button [data-cy="lla-button"]';
  static aliasName = '#lla-account-alias-text [data-cy="lla-reactive-input"]';
  static continueEditing = '#lla-close-button [data-cy="lla-button"]';
  static savedChanages = '#lla-save-Changes-button-text [data-cy="lla-button"]';
  static successtoastbanner = '.alert__content';
  static accountName = '#lla-account-name';
  static navigateBack = '[data-cy="lla-breadcrumb-1"]';
  static navigatehome = '.breadcrumb [data-cy="lla-breadcrumb-0"]';
  static accountdropdown = '[data-cy="lla-dropdown"]';
  static aliastext = '.b3-bold';
  static toast = 'lla-alert.llac-alert';
  static aliasinputfield = '#lla-raccount-alias .subtitle-txt'
  

  goToAddAccountPage() {
    cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
    cy.get(EditAccount.myAccount).eq(0).click();
    cy.get(EditAccount.accountlist).eq(0).click();
    cy.get(EditAccount.editButton).click();
    
  }
}
