/// <reference types="cypress" />
import { CommonFunctions } from "../../support/commonFunctions";
import { AmountSelectionScreen } from '../../support/pageObjects/amountSelectionScreen';
import { HomeScreen } from '../../support/pageObjects/homeScreen';
import { phoneNumberDetails } from '../../fixtures/testDetails';
let common = new CommonFunctions();

['Spanish', 'English'].forEach((language) => {
    describe(`Recharge portal - recharege Amount selection page - ${Cypress.env('environment')} - ${language}`, () => {
        it(`Recharge amount selection page - defined amount- ${language}`, () => {
            cy.intercept('POST', '**/fetch-taxes', {
                statusCode: 201,
                body: { data: { taxes: 25.23 }, success: true, errorMsg: null }
            }).as('fetchTaxes1');
            if (language == 'English') {
                cy.get(AmountSelectionScreen.languageSwitcher).click();
            }
            cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
            cy.get(HomeScreen.rechargeButton).should('not.be.disabled').click({ force: true });
            cy.wait('@validateNumber');
            cy.eyesCheckWindow({
              tag: `Recharge Amount selection/Entering page(default radio button) in  - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(AmountSelectionScreen.continuePaymentBtn).should('be.enabled');
            cy.randomCardRadioClick(AmountSelectionScreen.amountRadioButton);
            cy.eyesCheckWindow({
              tag: `Recharge Amount after selection radio button in  - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(AmountSelectionScreen.continuePaymentBtn).click();
            cy.wait('@fetchTaxes1');
            cy.eyesCheckWindow({
              tag: `Page navigation to transaction summary in  - ${language}` ,
              target: 'window',
              fully: true,
            });
        });
        it(`Recharge amount selection page - custom amount- ${language}`, () => {
            cy.intercept('POST', '**/fetch-taxes', {
                statusCode: 201,
                body: { data: { taxes: 25.23 }, success: true, errorMsg: null }
            }).as('fetchTaxes1');
            if (language == 'English') {
                cy.get(AmountSelectionScreen.languageSwitcher).click();
            }
            cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
            cy.get(HomeScreen.rechargeButton).should('not.be.disabled').click({ force: true });
            cy.wait('@validateNumber');
            cy.eyesCheckWindow({
              tag: `Recharge Amount selection/Entering page(default radio button) in  - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(AmountSelectionScreen.continuePaymentBtn).should('be.enabled');
            cy.get(AmountSelectionScreen.customAmount).clear().type(common.randomnumberFromInterval(1, 4));
            cy.get(AmountSelectionScreen.inlineError).should('exist');
            cy.eyesCheckWindow({
              tag: `custom amount error validation for less than 5$ in  - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(AmountSelectionScreen.customAmount).clear().type(common.randomnumberFromInterval(501, 1000));
            cy.get(AmountSelectionScreen.inlineError).should('exist');
            cy.eyesCheckWindow({
              tag: `custom amount error validation for greate than 500$ in  - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(AmountSelectionScreen.customAmount).clear().type(common.randomnumberFromInterval(5, 500));
            cy.get(AmountSelectionScreen.inlineError).should('not.exist');
            cy.eyesCheckWindow({
              tag: `Recharge Amount after selection radio button in  - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(AmountSelectionScreen.continuePaymentBtn).click();
            cy.wait('@fetchTaxes1');
            cy.eyesCheckWindow({
              tag: `Page navigation to transaction summary in  - ${language}` ,
              target: 'window',
              fully: true,
            });
        });
        it(`Recharge amount - fetch taxes system error - ${language}`, () => {
            cy.intercept('POST', '**/fetch-taxes', {
                statusCode: 201,
                body: { data: null, success: false, errorMsg: 'Error log from server' }
            }).as('fetchTaxes1');
            if (language == 'English') {
                cy.get(AmountSelectionScreen.languageSwitcher).click();
            }
            cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
            cy.get(HomeScreen.rechargeButton).should('not.be.disabled').click({ force: true });
            cy.wait('@validateNumber');
            cy.randomCardRadioClick(AmountSelectionScreen.amountRadioButton);
            cy.get(AmountSelectionScreen.continuePaymentBtn).click();
            cy.wait('@fetchTaxes1');
            cy.eyesCheckWindow({
              tag: `Fetch taxes api failure- system error - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(AmountSelectionScreen.llaButton).click();
            cy.eyesCheckWindow({
              tag: `page Navigates to the amount selection screen - ${language}` ,
              target: 'window',
              fully: true,
            });
        });
    });
});