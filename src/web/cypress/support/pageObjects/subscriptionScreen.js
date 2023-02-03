export class SubscriptionScreen {
  static subscriptionTitle = ".expansion-panel__header";
  static subscriptionPlan = 'lla-accordion [class="secondary-list__content"]';
  static subscriptionIcon = 'lla-accordion [data-cy="lla-icon"]';
  static unlimitedPlan = "[for='tab-activeProduct1'] span";
  static limitedPlan = "[for='tab-activeProduct0'] span";
  static myActiveProduct = "[class*='header active']";
  static subscriptionDropdown = ".expansion-panel--roundborder";
  static planIcon = '[data-cy="lla-icon"]';

  verifyPlan(planNum, language) {
    cy.fixture("subscription.json").then((data) => {
      if (planNum == 0) {
        cy.verifyText(
          SubscriptionScreen.limitedPlan,
          data.prepaid.data.packages[planNum].name[language]);
        cy.verifyText(
          SubscriptionScreen.subscriptionPlan,
          data.prepaid.data.packages[planNum].children[0].name[language],0);
        cy.verifyText(
          SubscriptionScreen.subscriptionPlan,
          data.prepaid.data.packages[planNum].children[1].name[language],1);
        cy.verifyText(
          SubscriptionScreen.subscriptionPlan,
          data.prepaid.data.packages[planNum].children[2].name[language],2);
      } else {
        cy.verifyText(
          SubscriptionScreen.unlimitedPlan,
          data.prepaid.data.packages[planNum].name[language]);
        cy.verifyText(
          SubscriptionScreen.subscriptionPlan,
          data.prepaid.data.packages[planNum].children[0].name[language],3);
        cy.verifyText(
          SubscriptionScreen.subscriptionPlan,
          data.prepaid.data.packages[planNum].children[1].name[language],4);
        cy.verifyText(
          SubscriptionScreen.subscriptionPlan,
          data.prepaid.data.packages[planNum].children[2].name[language],5);
      }
    });
  }

  verifyAddOn(language) {
    cy.fixture("subscription.json").then((data) => {
      cy.verifyText(
        SubscriptionScreen.subscriptionPlan,
        data.prepaid.data.packages[2].children[0].name[language],6);
      cy.verifyText(
        SubscriptionScreen.subscriptionPlan,
        data.prepaid.data.packages[2].children[1].name[language],7);
      cy.verifyText(
        SubscriptionScreen.subscriptionPlan,
        data.prepaid.data.packages[2].children[2].name[language],8);
      cy.verifyText(
        SubscriptionScreen.subscriptionPlan,
        data.prepaid.data.packages[2].children[3].name[language],9);
    });
  }
  
  verifyIcon(index) {
    cy.get(SubscriptionScreen.subscriptionDropdown)
      .eq(index)
      .find(SubscriptionScreen.planIcon)
      .each((icon) => {
        cy.wrap(icon).should("be.visible");
      });
  }
}
