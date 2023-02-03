import { CommonScreenObjects } from './commonObjects';
export class RechargeScreen extends CommonScreenObjects {
    static rechargeMenutab = '.main-menu__horizontal [data-cy="lla-horizontal-menu-link"]';
    static selectAnAccountTxt = '[data-cy="lla-breadcrumb-1"]';
    static subTitle = '.title-text';
    static thirdparty = '.btn-text';
    static accountList = '[data-cy="llac-actionable-lists"]';
    static selectAnAmount = '[data-cy="lla-breadcrumb-2"]';
    static rechargeNoText = '.layout-container__recharge-section__header--self';
    static subcontenttitle = '#lla-container-sub-title';
    static rechargeAmt = '[data-cy="lla-radio-button"]';
    static customAmountText = '[data-cy="lla-label"]';
    static customAmtfieldtext = '.input-atom__position  #lla-custom-amount-text';
    static inlineErrorcustomAmt = '#lla-input-validation-message';
    static button = '[data-cy="lla-button"]';
    static toastbanner = '.alert__body-contianer .alert__content';
    static phoneNoText = '.text-align-left';
    static localtext = 'div.text-align-left.neutral-600';
    static totalToPay = 'h5.heading.b3-bold';
    static totalbalance = '.primary-font-regular #lla-balance';
    static transactionSummary = ['data-cy="lla-breadcrumb-3"'];
    static termstext = '.dialog-title';
    static termscontent = '.dialog-content';
    static cardDeatilstext = '[data-cy="lla-label"]';
    static cardHolderName = 'input#cardholder-name';
    static creditCardField = 'input#credit-card-number';
    static creditCardExpiration = 'input#expiration';
    static cvvField = 'input#cvv';
    static successicon = '#lla-text-centre';
    static recharagetext ='[id="lla-container-sub-title"]';
    static error = '#lla-error-image';
    static errortile = '#lla-error-title';
    static errorsubtitle = '#lla-error-subtitle';
    static conetent = '.bg-info-100';
    static popup = '#mat-dialog-0';
    static subtitvisble = '#lla-container-sub-title';
    static thirdParty = '.b4-bold';
    static rechargecustomfield = '.mat-radio-group';
    static thirdPartyLimitText = '.label-addon';
    static checkBox= 'input[type="checkbox"]';

    

}
