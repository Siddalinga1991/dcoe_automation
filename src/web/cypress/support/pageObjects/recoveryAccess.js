import { CommonScreenObjects } from './commonObjects';
export class RecoveryAccess extends CommonScreenObjects {
    static cannotLogin = '[id="lla-buttons-link"]';
    static backButton = '.lla-topnav__content__back-container';
    static mobileAccount = '[data-cy="llac-actionable-lists"]';
    static inputNumber ='[data-cy="lla-reactive-input"]';
    static button = '[data-cy="lla-button"]';
    static success = '.cdk-overlay-pane';
    static closepopup = '[class="icon-close"]';
    static languageSwitch = '.llac-language-switcher__container';
    static error = '[id="lla-error-image"]';
    static successImage = '[id="lla-success-image"]'
    static phoneNumberTab = '[data-cy="lla-button-toggle-1"]';
    static sendAgain = '[id="lla-success-subtitle"]';
    static otp = '[id="lla-input-0"]';
    static congratulation = '#lla-success-image';

}