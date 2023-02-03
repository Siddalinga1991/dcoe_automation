import { CommonScreenObjects } from './commonObjects';
export class HomeScreen extends CommonScreenObjects {
   static phoneNumberField = 'input[data-cy="lla-reactive-input"]';
   static phoneNumberInLineError = 'div.main-container__form__error-validation';
   static rechargeButton = 'button[data-cy="lla-button"]';
   static menuOptionsDesktopView = 'div.desktop-view ul a[data-cy="lla-horizontal-menu-link"] span.horizontal-menu__text';
   static menuOptionsMobileView = 'div.mobile-view ul a[data-cy="lla-horizontal-menu-link"] span.horizontal-menu__text';
   static subMenuOptionsDesktopView = 'div.desktop-view a[data-cy="lla-horizontal-submenu-link"] span.horizontal-menu__text';
   static subMenuOptionsMobileView = 'div.mobile-view a[data-cy="lla-horizontal-submenu-link"] span.horizontal-menu__text';
   static hamburgerMenu = 'lla-recharge-portal div[data-cy="lla-nav-icon"]';
   static chevronButton = 'div.main-menu__sidebar--menu span.icon-chevron-up';
   static chevronButtonStores = 'lla-store-rocket div.main-menu__sidebar--menu span.icon-chevron-up';
   static menuCloseBtn = 'span.icon-close-outline';
   static hamburgerMenuStores = 'lla-store-rocket .mobile-view div.nav-icon';
}