/// <reference types="cypress" />
import { AmountSelectionScreen } from '../../support/pageObjects/amountSelectionScreen';
import { HomeScreen } from '../../support/pageObjects/homeScreen';
import { TransactionSummaryScreen } from "../../support/pageObjects/transactionSummaryScreen";
import { PaymentDetailsScreen } from '../../support/pageObjects/paymentDetailsScreen';
import { phoneNumberDetails, creditCardDetails } from '../../fixtures/testDetails';
['Spanish', 'English'].forEach((language) => {
    describe(`Recharge portal - Payment Details page - ${Cypress.env('environment')} - ${language}`, () => {
        it(`Recharge portal - payment approved in - ${language}`, () => {
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
            cy.get(TransactionSummaryScreen.continueToPaymentBtn).should('be.enabled').click();
            cy.get(TransactionSummaryScreen.termsConditions).should('be.visible');
            cy.get(TransactionSummaryScreen.acceptButton).scrollIntoView().click();
            cy.eyesCheckWindow({
              tag: `Enter the payment details screen in - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(PaymentDetailsScreen.button).should('not.be.enabled');
            cy.findElementInFrame(PaymentDetailsScreen.cardHolderName, PaymentDetailsScreen.cardHolderIframe).should('be.visible').type(Cypress.env('randomName'));
            cy.findElementInFrame(PaymentDetailsScreen.creditCardField, PaymentDetailsScreen.creditCareNumberIframe).should('be.visible').type(creditCardDetails.cardNumber);
            cy.findElementInFrame(PaymentDetailsScreen.creditCardExpiration, PaymentDetailsScreen.expirationDateIframe).should('be.visible').type(creditCardDetails.expirationDate);
            cy.findElementInFrame(PaymentDetailsScreen.cvvField, PaymentDetailsScreen.cvvIframe).should('be.visible').type(creditCardDetails.cvv);
            cy.eyesCheckWindow({
              tag: `After entering the payment details - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(PaymentDetailsScreen.button).should('be.enabled').click();
            cy.wait('@payment');
            cy.get(PaymentDetailsScreen.rechargeNumberScreenTitle).should('be.visible');
            cy.eyesCheckWindow({
              tag: `Payment success page - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(PaymentDetailsScreen.button).should('be.enabled').click();
            cy.eyesCheckWindow({
              tag: `page navigates to recharge phone number screen - ${language}` ,
              target: 'window',
              fully: true,
            });
        });
        it(`Recharge portal - payment transaction error in - ${language}`, () => {
            cy.intercept('POST', '**/fetch-taxes', {
                statusCode: 201,
                body: { data: { taxes: 25.23 }, success: true, errorMsg: null }
            }).as('fetchTaxes1');
            cy.intercept('POST', '**/payment', {
                statusCode: 201,
                body: {"data":null,"success":false,"errorMsg":"Error log from server: 52 | Gateway Rejected: duplicate. Failed with transaction.status=GATEWAY_REJECTED"}
            }).as('payment1');
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
            cy.get(TransactionSummaryScreen.continueToPaymentBtn).should('be.enabled').click();
            cy.get(TransactionSummaryScreen.termsConditions).should('be.visible');
            cy.get(TransactionSummaryScreen.acceptButton).scrollIntoView().click();
            cy.get(PaymentDetailsScreen.button).should('not.be.enabled');
            cy.findElementInFrame(PaymentDetailsScreen.cardHolderName, PaymentDetailsScreen.cardHolderIframe).should('be.visible').type(Cypress.env('randomName'));
            cy.findElementInFrame(PaymentDetailsScreen.creditCardField, PaymentDetailsScreen.creditCareNumberIframe).should('be.visible').type(creditCardDetails.cardNumber);
            cy.findElementInFrame(PaymentDetailsScreen.creditCardExpiration, PaymentDetailsScreen.expirationDateIframe).should('be.visible').type(creditCardDetails.expirationDate);
            cy.findElementInFrame(PaymentDetailsScreen.cvvField, PaymentDetailsScreen.cvvIframe).should('be.visible').type(creditCardDetails.cvv);
            cy.eyesCheckWindow({
              tag: `After entering the payment details - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(PaymentDetailsScreen.button).should('be.enabled').click();
            cy.wait('@payment1');
            cy.get(PaymentDetailsScreen.errorTitle).should('be.visible');
            cy.eyesCheckWindow({
              tag: `Payment transaction error  page - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(PaymentDetailsScreen.errorTryAgainButton).click();
            cy.eyesCheckWindow({
              tag: `page navigates to payment details screen - ${language}` ,
              target: 'window',
              fully: true,
            });
        });
        it(`Recharge portal - payment declined error in - ${language}`, () => {
            cy.intercept('POST', '**/fetch-taxes', {
                statusCode: 201,
                body: { data: { taxes: 25.23 }, success: true, errorMsg: null }
            }).as('fetchTaxes1');
            cy.intercept('POST', '**/payment', {
                statusCode: 201,
                body: {"data":null,"success":false,"errorMsg":"Error log from server: 52 | Gateway Rejected: duplicate. Failed with transaction.status=TRANSACTION_DECLINED"}
            }).as('payment1');
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
            cy.get(TransactionSummaryScreen.continueToPaymentBtn).should('be.enabled').click();
            cy.get(TransactionSummaryScreen.termsConditions).should('be.visible');
            cy.get(TransactionSummaryScreen.acceptButton).scrollIntoView().click();
            cy.get(PaymentDetailsScreen.button).should('not.be.enabled');
            cy.findElementInFrame(PaymentDetailsScreen.cardHolderName, PaymentDetailsScreen.cardHolderIframe).should('be.visible').type(Cypress.env('randomName'));
            cy.findElementInFrame(PaymentDetailsScreen.creditCardField, PaymentDetailsScreen.creditCareNumberIframe).should('be.visible').type('4000111111111115');
            cy.findElementInFrame(PaymentDetailsScreen.creditCardExpiration, PaymentDetailsScreen.expirationDateIframe).should('be.visible').type(creditCardDetails.expirationDate);
            cy.findElementInFrame(PaymentDetailsScreen.cvvField, PaymentDetailsScreen.cvvIframe).should('be.visible').type(creditCardDetails.cvv);
            cy.eyesCheckWindow({
              tag: `After entering the payment details - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(PaymentDetailsScreen.button).should('be.enabled').click();
            cy.wait('@payment1');
            cy.get(PaymentDetailsScreen.errorTitle).should('be.visible');
            cy.eyesCheckWindow({
              tag: `Payment declined error  page - ${language}` ,
              target: 'window',
              fully: true,
            });
            cy.get(PaymentDetailsScreen.errorTryAgainButton).click();
            cy.eyesCheckWindow({
              tag: `page navigates to payment details screen - ${language}` ,
              target: 'window',
              fully: true,
            });
        });
    });
});

