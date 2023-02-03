/// <reference types="cypress" />
import { HomeScreen } from '../../support/pageObjects/homeScreen';
['Spanish', 'English'].forEach((language) => {
  describe(`Recharge portal - Menu Options- ${Cypress.env('environment')} - ${language}`, () => {
    it(`Menu options in desktop view - ${language}`, () => {
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcher).click();
      }
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(0).click();
      cy.eyesCheckWindow({
        tag: `Page should show only menu links - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(1).click();
      cy.url().should('contain', '/sim-activation');
      cy.eyesCheckWindow({
        tag: `Page should be in sim activation portal screen - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.backButton).click();
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(2).trigger('mouseenter').should('be.visible');
      cy.get(HomeScreen.subMenuOptionsDesktopView).eq(0).should('exist').click({ force: true });
      cy.url().should('contain', '/contact-center');
      cy.eyesCheckWindow({
        tag: `Page should be in Contact center screen - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.backButton).click();
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(2).trigger('mouseenter').should('be.visible');
      cy.get(HomeScreen.subMenuOptionsDesktopView).eq(1).should('exist').click({ force: true });

      cy.url().should('contain', '/store-locator');
      cy.eyesCheckWindow({
        tag: `Page should be in Store Locater screen - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.backButton).click();
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(2).trigger('mouseenter').should('be.visible');
      cy.get(HomeScreen.subMenuOptionsDesktopView).eq(2).should('exist').click({ force: true });
      cy.get('@winOpen')
        .should((win) => {
          expect(win, 'whatsapp page called').to.have.been.calledWithMatch('/send?phone=17873553535');
        });
      cy.get(HomeScreen.menuOptionsDesktopView).should('be.visible').eq(2).trigger('mouseenter').should('be.visible');
      cy.get(HomeScreen.subMenuOptionsDesktopView).eq(3).should('exist').click({ force: true });
      cy.url().should('contain', '/terms');
      cy.eyesCheckWindow({
        tag: `Page should be in terms conditions screen - ${language}`,
        target: 'window',
        fully: true,
      });
    });

    it(`Menu options in Mobile view - ${language}`, () => {
      cy.viewport(375, 667);
      if (language == 'English') {
        cy.get(HomeScreen.languageSwitcherMobileView).click();
      }
      cy.get(HomeScreen.hamburgerMenu).click();
      cy.get(HomeScreen.chevronButton).click();
      cy.eyesCheckWindow({
        tag: `Shows up the menu links in mobile view - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.menuOptionsMobileView).should('be.visible').eq(0).click();
      cy.eyesCheckWindow({
        tag: `Page should be in recharge portal screen - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.hamburgerMenu).click();
      cy.get(HomeScreen.menuOptionsMobileView).should('be.visible').eq(1).click();
      cy.url().should('contain', '/sim-activation');
      cy.eyesCheckWindow({
        tag: `Page should be in sim activation portal screen - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.backButton).click();
      cy.get(HomeScreen.hamburgerMenu).click();
      cy.get(HomeScreen.chevronButton).click();
      cy.eyesCheckWindow({
        tag: `Page should show the expanded support menu - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.menuOptionsMobileView).should('be.visible').eq(2).trigger('mouseenter').should('be.visible');
      cy.get(HomeScreen.subMenuOptionsMobileView).eq(0).should('exist').click({ force: true });
      cy.url().should('contain', '/contact-center');
      cy.eyesCheckWindow({
        tag: `Page should be in Contact center screen - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.backButton).click();
      cy.get(HomeScreen.hamburgerMenu).click();
      cy.get(HomeScreen.chevronButton).click();
      cy.get(HomeScreen.menuOptionsMobileView).should('be.visible').eq(2).trigger('mouseenter').should('be.visible');
      cy.get(HomeScreen.subMenuOptionsMobileView).eq(1).should('exist').click({ force: true });
      cy.url().should('contain', '/store-locator');
      cy.eyesCheckWindow({
        tag: `Page should be in Store Locater screen - ${language}`,
        target: 'window',
        fully: true,
      });
      cy.get(HomeScreen.hamburgerMenuStores).click();
      cy.get(HomeScreen.chevronButtonStores).click();
      cy.get(HomeScreen.subMenuOptionsMobileView).eq(2).should('exist').click({ force: true });
      cy.get('@winOpen')
        .should((win) => {
          expect(win, 'whatsapp page called').to.have.been.calledWithMatch('/send?phone=17873553535');
        })
      cy.get(HomeScreen.subMenuOptionsMobileView).eq(3).should('exist').click({ force: true });
      cy.url().should('contain', '/terms');
      cy.eyesCheckWindow({
        tag: `Page should be in terms conditions screen - ${language}`,
        target: 'window',
        fully: true,
      });
    });



  });
});