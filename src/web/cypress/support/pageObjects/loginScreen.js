import { CommonScreenObjects } from './commonObjects';
export class LoginScreen extends CommonScreenObjects {
    static languageSwitcher = '#lla-language-switch';
    static emailInput = '#lla-enter-email';
    static passwordInput = '[data-cy="lla-reactive-input"]#lla-enter-password';
    static eyeIcon = '#lla-enter-password [data-cy="lla-reactive-input-icon"]';
    static loginButton = '[data-cy="lla-button"]';
    static tryAgainButton ='#lla-error-button [data-cy="lla-button"]';
    static accountdropdown = '[data-cy="lla-account-dropdown"]';
    static errorTitle ='#lla-error-title';
    static errorImage ='#lla-error-image';
    static menu = '[data-cy="lla-nav-icon"]';
    static logout = '[data-cy="lla-top-bar"] [class="link-handler"]';
    static emailfieldError = '#lla-submit-form .main-container__form__text-align';
    static passwordfieldError = '#lla-submit-form > :nth-child(1) > :nth-child(5)';
    static bannerContent= '.ion-page .section__container__heading';
    static homebannerContent = '.ion-page .section__container__desc';
    static logintitle = 'h3.main-container__form__heading';
    static logindontHaveAccountTxt = ".neutral-900";
    static logincreateOnetxt = '.button-summary .primary-500';
    static logincantLogInTxt = '#lla-buttons-link';
    static loginBackToExternalTxt = '.lla-topnav__content__back-text';
    static loginerrortitle = '#lla-error-title';
    static loginerrorSubtitle = '#lla-error-subtitle';
    static supportchat = '#lla-support-chat-button [data-cy="lla-button"]'
    


}
