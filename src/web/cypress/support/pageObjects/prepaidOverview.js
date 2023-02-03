import dayjs from 'dayjs';
require('dayjs/locale/es');

export class PrepaidOverview {
    static myBalanceTxt = '#lla-my-bill-text';
    static balance = '[data-cy="lla-pricData"]';
    static circularIcon = '[data-cy="llac-circular-container"]';
    static secondaryList = '.secondary-list__content__text';
    static secondarySubList = '.secondary-list__content__subtext';
    static dateMonth = '.secondary-list__content__text2';
    static primaryButton = '#lla-on-pay-bill-button .button-atom__button--primary-large';
    static secondaryButton = '#lla-on-pay-bill-button .button-atom__button--secondary-large'

    numOFDaysDue(days) {
        const condition =
          days == 1
            ? Cypress.env('translationRes').shared.dayTxt
            : Cypress.env('translationRes').shared.daysTxt;
        cy.verifyText(
          PrepaidOverview.secondarySubList,
          '('
            .concat(Cypress.env('translationRes').shared.prepositionDaysTxt + ' ')
            .concat(days + ' ')
            .concat(condition + ')')
        );
      }
      converDate() {
        const val = JSON.parse(window.localStorage.jcaCurrentAccount).balanceExpiry;
        const date = dayjs(val).format('DD');
        const month = dayjs(val).locale(Cypress.env('language')).format('MMM');
        const dateMonthRes = date.concat(' ' + month.charAt(0).toUpperCase() + month.slice(1));
        cy.verifyText(PrepaidOverview.dateMonth, dateMonthRes);
      }
      convertAutoPayDate() {
        const val = JSON.parse(window.localStorage.jcaCurrentAccount).billAutoPayDate;
        const date = dayjs(val).format('DD');
        const month = dayjs(val).locale(Cypress.env('language')).format('MMM');
        const dateMonthRes = date.concat(' ' + month.charAt(0).toUpperCase() + month.slice(1));
        cy.verifyText(PrepaidOverview.dateMonth, dateMonthRes);
      }
}