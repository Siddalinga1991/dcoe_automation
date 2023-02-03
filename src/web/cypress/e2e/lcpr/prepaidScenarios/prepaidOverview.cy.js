import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";
import { Contextual } from "../../../fixtures/prepaidScenario";
import { PrepaidOverview } from "../../../support/pageObjects/prepaidOverview";
import { Colors } from "../../../support/pageObjects/colors";
import { CommonFunctions } from "../../../support/commonFunctions";

const jsondata = Contextual;
const prepaid = new PrepaidOverview();
const commonFunction = new CommonFunctions();

["Spanish", "English"].forEach((language) => {
  describe(`Prepaid Scenario Validations - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
    });
    it(`Scenario 1: When the due date is in future - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
      });
      cy.intercept(
        UrlConstant.POST_METHOD,
        UrlConstant.fetchAccountOverviewPrepaid,
        {
          body: jsondata.scenario1,
        }
      ).as("fetchAccountOverview");
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.verifyText(
          PrepaidOverview.myBalanceTxt,
          Cypress.env("translationRes").shared.myBalanceTxt
        );
        cy.verifyText(
          PrepaidOverview.balance,
          JSON.parse(window.localStorage.jcaCurrentAccount).currencyCode.concat(
            CommonScreenObjects.priceFormat.format(
              JSON.parse(window.localStorage.jcaCurrentAccount).outstandingBal
            )
          )
        );
        cy.get(PrepaidOverview.circularIcon).should(
          "have.css",
          "background-color",
          Colors.paidPill
        );
        cy.verifyText(
          PrepaidOverview.secondaryList,
          Cypress.env("translationRes").shared.expiryDateTxt
        );
        prepaid.converDate();
        prepaid.numOFDaysDue(Cypress.env("dueDateS1"));
        cy.verifyText(
          PrepaidOverview.primaryButton,
          Cypress.env("translationRes").shared.rechargeTxt
        );
        commonFunction.verifyButtonBGAndTextColor(
          PrepaidOverview.primaryButton,
          Colors.primaryButton,
          Colors.whiteColor
        );
      });
    });
    it(`Scenario 2: When due date is less than 5 days - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
      });
      cy.intercept(
        UrlConstant.POST_METHOD,
        UrlConstant.fetchAccountOverviewPrepaid,
        {
          body: jsondata.scenario2,
        }
      ).as("fetchAccountOverview");
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.verifyText(
          PrepaidOverview.myBalanceTxt,
          Cypress.env("translationRes").shared.myBalanceTxt
        );
        cy.verifyText(
          PrepaidOverview.balance,
          JSON.parse(window.localStorage.jcaCurrentAccount).currencyCode.concat(
            CommonScreenObjects.priceFormat.format(
              JSON.parse(window.localStorage.jcaCurrentAccount).outstandingBal
            )
          )
        );
        cy.get(PrepaidOverview.circularIcon).should(
          "have.css",
          "background-color",
          Colors.orangePill
        );
        cy.verifyText(
          PrepaidOverview.secondaryList,
          Cypress.env("translationRes").shared.expiryDateTxt
        );
        prepaid.converDate();
        prepaid.numOFDaysDue(Cypress.env("dueDateS2"));
        cy.verifyText(
          PrepaidOverview.primaryButton,
          Cypress.env("translationRes").shared.rechargeTxt
        );
        commonFunction.verifyButtonBGAndTextColor(
          PrepaidOverview.primaryButton,
          Colors.primaryButton,
          Colors.whiteColor
        );
      });
    });
    it(`Scenario 3: When due date is today - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
      });
      cy.intercept(
        UrlConstant.POST_METHOD,
        UrlConstant.fetchAccountOverviewPrepaid,
        {
          body: jsondata.scenario3,
        }
      ).as("fetchAccountOverview");
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.verifyText(
          PrepaidOverview.myBalanceTxt,
          Cypress.env("translationRes").shared.myBalanceTxt
        );
        cy.verifyText(
          PrepaidOverview.balance,
          JSON.parse(window.localStorage.jcaCurrentAccount).currencyCode.concat(
            CommonScreenObjects.priceFormat.format(
              JSON.parse(window.localStorage.jcaCurrentAccount).outstandingBal
            )
          )
        );
        cy.get(PrepaidOverview.circularIcon).should(
          "have.css",
          "background-color",
          Colors.orangePill
        );
        cy.verifyText(
          PrepaidOverview.secondaryList,
          Cypress.env("translationRes").shared.expiresDateTxt
        );
        cy.verifyText(
          PrepaidOverview.dateMonth,
          Cypress.env("translationRes").shared.todayTxt
        );
        cy.verifyText(
          PrepaidOverview.primaryButton,
          Cypress.env("translationRes").shared.rechargeTxt
        );
        commonFunction.verifyButtonBGAndTextColor(
          PrepaidOverview.primaryButton,
          Colors.primaryButton,
          Colors.whiteColor
        );
      });
    });
    it(`Scenario 4: Overdue - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
      });
      cy.intercept(
        UrlConstant.POST_METHOD,
        UrlConstant.fetchAccountOverviewPrepaid,
        {
          body: jsondata.scenario4,
        }
      ).as("fetchAccountOverview");
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.verifyText(
          PrepaidOverview.myBalanceTxt,
          Cypress.env("translationRes").shared.myBalanceTxt
        );
        cy.verifyText(
          PrepaidOverview.balance,
          JSON.parse(window.localStorage.jcaCurrentAccount).currencyCode.concat(
            CommonScreenObjects.priceFormat.format(
              JSON.parse(window.localStorage.jcaCurrentAccount).outstandingBal
            )
          )
        );
        cy.get(PrepaidOverview.circularIcon).should(
          "have.css",
          "background-color",
          Colors.overduePill
        );
        cy.verifyText(
          PrepaidOverview.secondaryList,
          Cypress.env("translationRes").shared.expiredDateTxt
        );
        prepaid.converDate();
        prepaid.numOFDaysDue(Cypress.env("dueDateS4"));
        cy.verifyText(
          PrepaidOverview.primaryButton,
          Cypress.env("translationRes").shared.rechargeTxt
        );
        commonFunction.verifyButtonBGAndTextColor(
          PrepaidOverview.primaryButton,
          Colors.primaryButton,
          Colors.whiteColor
        );
      });
    });
    it(`Scenario 5: Autopay - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
      });
      cy.intercept(
        UrlConstant.POST_METHOD,
        UrlConstant.fetchAccountOverviewPrepaid,
        {
          body: jsondata.scenario5,
        }
      ).as("fetchAccountOverview");
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.verifyText(
          PrepaidOverview.myBalanceTxt,
          Cypress.env("translationRes").shared.myBalanceTxt
        );
        cy.verifyText(
          PrepaidOverview.balance,
          JSON.parse(window.localStorage.jcaCurrentAccount).currencyCode.concat(
            CommonScreenObjects.priceFormat.format(
              JSON.parse(window.localStorage.jcaCurrentAccount).outstandingBal
            )
          )
        );
        cy.get(PrepaidOverview.circularIcon).should(
          "have.css",
          "background-color",
          Colors.autoPay
        );
        cy.verifyText(
          PrepaidOverview.secondaryList,
          Cypress.env("translationRes").shared.autoPayTxt
        );
        prepaid.convertAutoPayDate();
        prepaid.numOFDaysDue(Cypress.env("dueDateS1"));
        cy.verifyText(
          PrepaidOverview.secondaryButton,
          Cypress.env("translationRes").shared.rechargeTxt
        );
        commonFunction.verifyButtonBGAndTextColor(
          PrepaidOverview.secondaryButton,
          Colors.whiteColor,
          Colors.primaryButton
        );
      });
    });
  });
});
