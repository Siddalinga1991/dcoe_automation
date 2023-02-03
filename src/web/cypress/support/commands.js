/// <reference types="cypress" />
import { LoginScreen } from "./pageObjects/loginScreen";
import { HomeScreen } from "./pageObjects/homeScreen";
import { ServiceRoute } from "./serviceRoute";
import { CommonFunctions } from "./commonFunctions";

const commonFunctions = new CommonFunctions();
let serviceRoute = new ServiceRoute();
beforeEach(() => {
  serviceRoute.loadInterceptApiCalls();
  const stub = cy.stub().as("winOpen");
  cy.on("window:before:load", (win) => {
    cy.stub(win, "open").callsFake(stub);
    win.__location = {
      assign: cy.stub().as("assign"),
    };
  });
   cy.visit(Cypress.env("baseUrl"), {
    failOnStatusCode: false,
  });

  if (!Cypress.env("market").includes("TOPUP")) {
    cy.url().should("include", "/login");
    cy.wait("@Marketconfigration").then((res) => {
      Cypress.env("MarketConfig", res.response.body.data.configuration);
    });
  } else {
    cy.url().should("include", Cypress.env("baseUrl"));
    cy.wait("@marketTranslations")
    cy.get(HomeScreen.phoneNumberField).should("be.visible");
  }
});

Cypress.Commands.add("interceptCall", (httpmethod, apiurl, aliasName) => {
  cy.intercept({
    method: httpmethod,
    url: apiurl,
  }).as(aliasName);
});
Cypress.Commands.add("randomCardRadioClick", (elementClick) => {
  const buttonRadioCount = Cypress.$(elementClick).length;
  cy.get(elementClick)
    .eq(Cypress._.random(0, buttonRadioCount - 1))
    .click({ force: true });
});
Cypress.Commands.add("EyesCheck", (message, lanuage) => {
  cy.eyesCheckWindow({
    tag: `${message} ${lanuage}`,
    target: "window",
    fully: true,
  });
});
Cypress.Commands.add("login", (email, password) => {
  cy.get(LoginScreen.emailInput).should("be.visible")
  cy.get(LoginScreen.emailInput).type(email);
  cy.get(LoginScreen.passwordInput).should("be.visible").type(password);
  cy.get(LoginScreen.loginButton).click();
});
Cypress.Commands.add("errorlogin", (email, password) => {
  cy.get(LoginScreen.emailInput).should("be.visible").type(email);
  cy.get(LoginScreen.passwordInput).type(password);
  cy.get(LoginScreen.loginButton).should("be.enabled").click();
});
Cypress.Commands.add(
  "findElementInFrame",
  (element, iframeID = "#braintree-hosted-field-cardholderName") => {
    return cy.iframe(iframeID).find(element);
  }
);
Cypress.Commands.add("toggleButton", (input) => {
  cy.get('.llac-btn-groups button[type="button"]').each((element) => {
    const value = element.text().trim();
    if (value != "SSN") {
      cy.get(element).click();
      commonFunctions.enterInputField(input);
    }
  });
});
Cypress.Commands.add("languageSwitcher", (language) => {
  cy.get(LoginScreen.languageSwitch).should("be.visible");
  if (language == "English") {
    cy.wait("@enMarketTranslations").then((res) => {
      cy.get(LoginScreen.languageSwitch).click();
      Cypress.env("translationRes", res.response.body.data.en);
      Cypress.env('language', 'en');
    });
  } else {
    cy.wait("@esMarketTranslations").then((res) => {
      Cypress.env("translationRes", res.response.body.data.es);
      Cypress.env('language', 'es');
    });
  }
});
Cypress.Commands.add("verifyText", (locator, text, index=0) => {
  cy.get(locator)
    .eq(index)
    .invoke("text")
    .then((txt) => {
      expect(txt.trim()).to.equal(text.trim());
    });
});
Cypress.Commands.add("verifyIsVisible", (locator, index = 0) => {
  cy.get(locator).eq(index).should("be.visible");
});

Cypress.Commands.add(
  'verifyAttribute',
  (element, attribute, value, index = 0) => {
    cy.get(element, { timeout: 60000 })
      .eq(index)
      .should(($getAttr) => {
        expect($getAttr.attr(attribute)).to.be.contain(value);
      });
  }
);

