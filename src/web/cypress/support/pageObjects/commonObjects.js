export class CommonScreenObjects {
   static ALPHANUMERICCHARACTERS =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   static ALPHACHARACTERS =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   static NUMERICCHARACTERS = '0123456789';
   static ALPHANUMERICSPECIALCHARACTERS ='0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   static rechargeNumberScreenTitle = 'div.layout-container__recharge-section__header';
   static errorTitle = 'div#lla-error-title';
   static languageSwitcher = 'div.desktop-view div.llac-language-switcher__container';
   static languageSwitch = '#lla-language-switch'
   static languageSwitcherMobileView = 'div.mobile-view div.llac-language-switcher__container'
   static llaButton = 'lla-button#lla-error-button button';
   static button = 'button[data-cy="lla-button"]';
   static errorTryAgainButton = 'div #lla-error-button button';
   static backButton = 'a.lla-topnav__content__back-text';
   static numberInput = 'input[data-cy="lla-reactive-input"]';
   static toggleButton = '.llac-btn-groups button[type="button"]';
   static greetingText = "#lla-user-info-name";
   static topBarMenu = '[data-cy="lla-top-bar"] a[class="link-handler"]';
   static menuOptions ='div.desktop-view ul a[data-cy="lla-horizontal-menu-link"] span.horizontal-menu__text';
   static languages = ['EN', 'ES'];
   static priceFormat = new Intl.NumberFormat('en-US', {
     minimumFractionDigits: 2,
   });
}

