/// <reference types="cypress" />
import { UsagesScreen } from "../../../support/pageObjects/usages";
import { UrlConstant } from "../../../support/urlConstants";
import dayjs from "dayjs";
const Usages = new UsagesScreen();

["Spanish", "English"].forEach((language) => {
  describe(` Verify call usages plan- ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      Usages.interceptFetchAccount("fetchaccount");
      Usages.goToAddAccountPage();
      cy.wait("@fetchaccount");
    });
  
  it(`Verify the Usage remaining Mins left of from total Mins  - ${language}`, () => {
    cy.fixture("usages.json").then((data) => {
      cy.intercept(UrlConstant.GET_METHOD, UrlConstant.usagesapi, {
        body: data.usages,
      }).as("usages");
      cy.get(UsagesScreen.usagestab).eq(1).should("be.visible").click();
      cy.wait("@usages");
      cy.get(UsagesScreen.mintutestext).should("be.visible").click();
      cy.get(UsagesScreen.packetdata).then((usagesdata) => {
        console.log(data);

        const remainingmin =
          data.usages.data[2].allowanceUsages[0].summaryFields[0].value.replace(
            /[^a-zA-Z0-9]/g,
            ""
          );
        expect(usagesdata.text().trim()).to.equal(
          remainingmin.trim().replace("MINremaining", "mins")
        );
      });
      cy.verifyText(
        UsagesScreen.leftTo,
        Cypress.env("translationRes").pages.myUsage.compareTxt
      );
      cy.get(UsagesScreen.leftTo)
        .eq(1)
        .then((usagesdata) => {
          const Totalmin =
            data.usages.data[2].allowanceUsages[0].additionalFields[0].value.replace(
              /[^a-zA-Z0-9]/g,
              ""
            );
          expect(usagesdata.text().trim()).to.equal(
            Totalmin.trim().replace("MIN", "mins")
          );
        });
    });
  });

  it(`Verify the icon and expiry date   - ${language}`, () => {
    cy.fixture("usages.json").then((data) => {
      cy.intercept(UrlConstant.GET_METHOD, UrlConstant.usagesapi, {
        body: data.usages,
      }).as("usages");
      cy.get(UsagesScreen.usagestab).eq(1).should("be.visible").click();
      cy.wait("@usages");
      cy.get(UsagesScreen.mintutestext).should("be.visible").click();
      cy.get(UsagesScreen.progrssbar).should("be.visible");
      cy.get(UsagesScreen.icon).should("be.visible");
      const val = data.usages.data[0].allowanceUsages[0].expiry;
      const expirydate = dayjs(val).format("DD MMM");
      const today = new Date().toISOString();
      const currentdays = dayjs(today).format("DD MMM");
      const diffInMs = new Date(expirydate) - new Date(currentdays);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      cy.get(UsagesScreen.expirydate).then((expires) => {
        const expiry = expires.text().replace(/[^a-zA-Z0-9]/g, "");
        expect(expiry).to.equal(
          Cypress.env("translationRes")
            .shared.expiryDateTxt.concat(expirydate)
            .concat(
              Cypress.env("translationRes")
                .shared.prepositionDaysTxt.concat(diffInDays)
                .concat(Cypress.env("translationRes").shared.daysTxt)
            )
            .replace(/[^a-zA-Z0-9]/g, "")
        );
      });
    });
  });
});
});