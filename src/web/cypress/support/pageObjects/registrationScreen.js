import { CommonScreenObjects } from './commonObjects';
export class RegistrationScreen extends CommonScreenObjects {
    static createOne = 'a.primary-500';
    static residentials = '[data-cy="llac-actionable-lists"]'; 
    static accountInput = 'input[data-cy="lla-reactive-input"]';  
    static toolTip =  '#lla-circular-help-icon';
    static toolTipClose ='.llac-tool-tip [data-cy="lla-icon"]'
    static continuebutton = '[data-cy="lla-button"]'
    static emailInput ='#lla-enter-email';
    static ssn = '[data-cy="lla-reactive-input"]'  
    static password = '#lla-password-form [data-cy="lla-reactive-input"]'
    static retypePassword = '#lla-password-form [data-cy="lla-reactive-input"]'
    static terms = 'a.url';
    static eyeIcon = '[data-cy="lla-reactive-input-icon"]';
    static termsPopupCloseicon = 'span[data-cy="lla-modal-close"]';
    static termscheckbox = '[class="checkmark"]';
    static whereIsMyPinPopup ='#lla-buttons-link';
    static closebutton = '[name="close"]';
    static errorImage = '#lla-error-image';
    static errortitle = '#lla-error-title';
    static errorSubtitle = '#lla-error-subtitle'
    static phoneNoErrorMsg = '#lla-error-validation';
    static emailIsNotValidtext = '[lines="none"]';
    static homeBannerContentHeading = '.section__container__heading';
    static homeBannerContentDescription = '.section__container__desc';
    static PrepaidAccounttitleTxt = '.main-container__form__heading';
    static PrepaidAccountsubTitleTxt = '.main-container__form__sub-heading';
    static verifyPintitleTxt = '.main-container__form__heading';
    static verifyPinsubtitleTxt = '.main-container__form__sub-heading';
    static pinNumberTxt = '[data-cy="lla-label"]';
    static whereIsMyPinBtnTxt = "#lla-buttons-link";
    static pinErrorMsg = '.main-container__form__text-align';
    static SuccessTitleTxt = '#lla-success-title';
    static SuccessSubtitleTxt = '.success-layout__padding';
    static didnotGetEmailTxt ='.success-layout__option-text .success-layout__subtitle';
    static accountNumberTxt = '[data-cy="lla-label';
    static accNumberTooltipInfo = '.-icon [data-cy="lla-icon"]';
    static accNumberTooltipDesc = '#lla-tooltip-description';
    static getEmailtext = '.success-layout__option-text .success-layout__subtitle';
    
   
}