/// <reference types="cypress" />
import { AmountSelectionScreen } from '../../support/pageObjects/amountSelectionScreen';
import { HomeScreen } from '../../support/pageObjects/homeScreen';
import { TransactionSummaryScreen } from "../../support/pageObjects/transactionSummaryScreen";
import { phoneNumberDetails } from '../../fixtures/testDetails';
['Spanish', 'English'].forEach((language) => {
    describe(`Recharge portal - Payment transaction summary page - ${Cypress.env('environment')} - ${language}`, () => {
        it(`Transaction Summary page in - ${language}`, () => {
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
            cy.get(AmountSelectionScreen.continuePaymentBtn).should('be.enabled');
            cy.randomCardRadioClick(AmountSelectionScreen.amountRadioButton);
            cy.get(AmountSelectionScreen.continuePaymentBtn).click();
            cy.wait('@fetchTaxes1');
             cy.eyesCheckWindow({
              tag: `Page navigation to transaction summary in  - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(TransactionSummaryScreen.continueToPaymentBtn).click();
             cy.eyesCheckWindow({
              tag: `Terms & conditions in the transaction summary page - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(TransactionSummaryScreen.dialogClose).should('be.visible').click({force:true});
            cy.get(TransactionSummaryScreen.continueToPaymentBtn).should('be.visible');
             cy.eyesCheckWindow({
              tag: `closes terms & conditions popup & shows transaction page - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(TransactionSummaryScreen.continueToPaymentBtn).click();
            cy.get(TransactionSummaryScreen.acceptButton).click();
             cy.eyesCheckWindow({
              tag: `page navigation to enter the payment details in - ${language}` ,
              target: 'window',
              fully: true,
            });
        });
    });
});

