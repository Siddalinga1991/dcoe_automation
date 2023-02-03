/// <reference types="cypress" />
import { HomeScreen } from '../../support/pageObjects/homeScreen';
import { phoneNumberDetails } from '../../fixtures/testDetails';
['Spanish','English'].forEach((language) => {
  describe(`Recharge portal - Phone number entering page - ${Cypress.env('environment')} - ${language}`, () => {
    it(`navigating to topup portal - ${language}`, () => {
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.eyesCheckWindow({
        tag: `Topup portal page in - ${language}` , 
        target: 'window',
        fully: true,
      });
    });

    it(`Phone number field inline error validation - ${language}`, () => {
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.eyesCheckWindow({
        tag: `Topup portal page in - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.shortNumber);
      cy.get(HomeScreen.phoneNumberInLineError).should('be.visible');
      cy.get(HomeScreen.rechargeButton).should('not.be.enabled');
      cy.eyesCheckWindow({
        tag: `Phone number error inline validation in  - ${language}` ,
        target: 'window',
        fully: true,
      });
    });

    it(`Phone number field Active number validation - ${language}`, () => {
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.eyesCheckWindow({
        tag: `Topup portal page in - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.active);
      cy.get(HomeScreen.phoneNumberInLineError).should('not.exist');
      cy.get(HomeScreen.rechargeButton).should('not.be.disabled');
      cy.eyesCheckWindow({
        tag: `Recharge button enabled for Active number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.rechargeButton).click({ force: true });
      cy.wait('@validateNumber');
      cy.get(HomeScreen.rechargeNumberScreenTitle).should('be.visible');
      cy.eyesCheckWindow({
        tag: `Phone number validation for active number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
    });

    it(`Phone number field cancelled number validation - ${language}`, () => {
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.eyesCheckWindow({
        tag: `Topup portal page in - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.cancel);
      cy.get(HomeScreen.phoneNumberInLineError).should('not.exist');
      cy.get(HomeScreen.rechargeButton).should('not.be.disabled');
      cy.eyesCheckWindow({
        tag: `Recharge button enabled for Cancelled number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.rechargeButton).click({ force: true });
      cy.wait('@validateNumber');
      cy.get(HomeScreen.errorTitle).should('be.visible');
      cy.eyesCheckWindow({
        tag: `Phone number validation for cancelled number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
    });

    it(`Phone number field suspended number validation - ${language}`, () => {
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.eyesCheckWindow({
        tag: `Topup portal page in - ${language}` ,
        target: 'window',
      });
      cy.get(HomeScreen.phoneNumberField).type(phoneNumberDetails.suspended);
      cy.get(HomeScreen.phoneNumberInLineError).should('not.exist');
      cy.get(HomeScreen.rechargeButton).should('not.be.disabled');
      cy.eyesCheckWindow({
        tag: `Recharge button enabled for suspended number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.rechargeButton).click({ force: true });
      cy.wait('@validateNumber');
      cy.get(HomeScreen.errorTitle).should('be.visible');
      cy.eyesCheckWindow({
        tag: `Phone number validation for suspended number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
    });

    it(`Phone number api fails with system error - ${language}`, () => {
      cy.intercept('GET', `**/validate-number?publicIdentifier=1${Cypress.env('randomNumber')}`, {
        statusCode: 400
      }).as('validateNumberError');
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.eyesCheckWindow({
        tag: `Topup portal page in - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.phoneNumberField).type(Cypress.env('randomNumber'));
      cy.get(HomeScreen.phoneNumberInLineError).should('not.exist');
      cy.get(HomeScreen.rechargeButton).should('not.be.disabled');
      cy.eyesCheckWindow({
        tag: `Recharge button enabled for suspended number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.rechargeButton).click({ force: true });
      cy.wait('@validateNumberError');
      cy.get(HomeScreen.errorTitle).should('be.visible');
      cy.eyesCheckWindow({
        tag: `Phone number validation for suspended number in  - ${language}` ,
        target: 'window',
        fully: true,
      });
    });

  });
});