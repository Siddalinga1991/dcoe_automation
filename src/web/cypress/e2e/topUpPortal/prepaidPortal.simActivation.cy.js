/// <reference types="cypress" />
import { HomeScreen } from '../../support/pageObjects/homeScreen';
import { SimActivationScreen } from "../../support/pageObjects/simActivationScreen";
import { phoneNumberDetails } from '../../fixtures/testDetails';

['Spanish', 'English'].forEach((language) => {
  describe(`Recharge portal - Sim activation flow - ${Cypress.env('environment')} - ${language}`, () => {
    it(`Sim activation - activation successful - ${language}`, () => {
      cy.intercept('POST', '**/activate', {
        statusCode: 201,
        body: { "data": true, "success": true, "errorMsg": null }
      }).as('simActivate1');
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(1).click();
      cy.url().should('contain', '/sim-activation');
      cy.eyesCheckWindow({
        tag: `Sim activation phone number entering page in - ${language}.png`,
        target: 'window',
        fully: true,
      });
      cy.get(SimActivationScreen.phoneNumberField).type(phoneNumberDetails.simactivationPhoneNumber);
      cy.eyesCheckWindow({
        tag: `Sim activation -After entering the phone number - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(SimActivationScreen.continueButton).click();
      cy.eyesCheckWindow({
        tag: `Sim activation -page navigation to enter last 4 digits of SIM - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(SimActivationScreen.simNumberField).type(phoneNumberDetails.last4Digits);
      cy.get(SimActivationScreen.hintText).click();
      cy.eyesCheckWindow({
        tag: `Sim activation - where to find sim number dialog - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(SimActivationScreen.dialogClose).click();
      cy.get(SimActivationScreen.ActivateButton).click();
      cy.wait('@simActivate1');
      cy.eyesCheckWindow({
        tag: `Sim activation - Activation is in progress - ${language}`,
        target: 'window',
        fully: true,
      });
    });
    it(`Sim activation - activation failed - ${language}`, () => {
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(1).click();
      cy.url().should('contain', '/sim-activation');
      cy.get(SimActivationScreen.phoneNumberField).type(phoneNumberDetails.simactivationPhoneNumber);
      cy.get(SimActivationScreen.continueButton).click();
      cy.get(SimActivationScreen.simNumberField).type(phoneNumberDetails.last4Digits);
      cy.get(SimActivationScreen.hintText).click();
      cy.get(SimActivationScreen.dialogClose).click();
      cy.get(SimActivationScreen.ActivateButton).click();
      cy.wait('@activate');
      cy.eyesCheckWindow({
        tag: `Sim activation - Activation failed - ${language}`,
        target: 'window',
        fully: true,
      });
    });
    it(`Sim activation - system error - ${language}`, () => {
      cy.intercept('POST', '**/activate', {
        statusCode: 400,
        body: { "data": false, "success": true, "errorMsg": null }
      }).as('simActivate1');
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(1).click();
      cy.url().should('contain', '/sim-activation');
      cy.get(SimActivationScreen.phoneNumberField).type(phoneNumberDetails.simactivationPhoneNumber);
      cy.get(SimActivationScreen.continueButton).click();
      cy.get(SimActivationScreen.simNumberField).type(phoneNumberDetails.last4Digits);
      cy.get(SimActivationScreen.hintText).click();
      cy.get(SimActivationScreen.dialogClose).click();
      cy.get(SimActivationScreen.ActivateButton).click();
      cy.wait('@simActivate1');
      cy.eyesCheckWindow({
        tag: `Sim activation - throwing system error - ${language}`,
        target: 'window',
        fully: true,
      });
    });
  });
});