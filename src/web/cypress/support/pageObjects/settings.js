export class Settings {
  static breadcrumb = 'div[class="breadcrumb"]';
  static settingList = '[data-cy="llac-actionable-lists"]';
  static settingOptions =
    '[data-cy="llac-actionable-lists"] #lla-settings-name';
  static settingOptionDesc =
    '[data-cy="llac-actionable-lists"] #lla-settings-desc';
  static icon = '[data-cy="lla-icon"]';
  static toastBanner = "#lla-flash-notification-alert";
  static toastBannerDescription = ".alert__content";
  static closeIcon = '[data-cy="lla-alert-close"]';
  static notificationTitle =
    'div[class="main-container"] #lla-account-notification-title';
  static notificationSubtitle =
    "div[class='main-container'] #lla-account-notification-subtitle";
  static toggleButton = "div[class='main-container'] .lla-toggle";
  static chatButtonIcon = "div[class='main-container'] #lla-chat-bubble-icon";
  static termsLink = "#lla-open-terms";
  static termsTitle = "#lla-title";
  static termsDescription = "#lla-terms-main-content";
  static termsDiv = ".llac-accordion > div";
  static termsAccordianHeader = ".llac-accordion div #lla-label-title-header";
  static termsContent = ".llac-accordion div #lla-terms-content";
  static dropDown = '#lla-overview-dropdown';
  static serviceSelector = '[data-cy="lla-mobile-service"]';
  static mobileSelector = '#lla-mobile-accounts-group button'; 
  static supportChatLabel = '.support-chat-label';
  static supportChatButton = '.support-chat-button';
  static homeSelector = '#lla-home-mobile-service-tab-button #lla-home-mobile-service-text';

  accountSelector(
    tabLocator,
    accountLocator,
    index
  ) {
    cy.get(Settings.dropDown).click();
    cy.get(tabLocator).eq(2).click();
    cy.get(accountLocator).eq(index).click();
  }
}
