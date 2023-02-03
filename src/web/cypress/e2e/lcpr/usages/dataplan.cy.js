/// <reference types="cypress" />
import { UsagesScreen } from "../../../support/pageObjects/usages";
import { UrlConstant } from "../../../support/urlConstants";
import dayjs from "dayjs";
const Usages = new UsagesScreen();

["Spanish", "English"].forEach((language) => {
  describe(`Verify data usages plan  - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      Usages.interceptFetchAccount("fetchaccount");
      Usages.goToAddAccountPage();
      cy.wait("@fetchaccount");
    });
    it(`Verify toast banner is showing if there is No Usage plan . - ${language}`, () => {
      cy.get(UsagesScreen.usagestab).eq(1).should("be.visible").click();
      cy.get(UsagesScreen.toastbanner).should("be.visible");
      cy.verifyText(
        UsagesScreen.toastbanner,
        Cypress.env("translationRes").pages.myUsage.noUsageInfoTitleTxt.concat(
          Cypress.env("translationRes").pages.myUsage
            .noUsageInfoForPrepaidBodyTxt
        )
      );
    });

    it(`Verify the  Usage content for call sms and data - ${language}`, () => {
      cy.fixture("usages.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.usagesapi, {
          body: data.usages,
        }).as("usages");
      });
      cy.get(UsagesScreen.usagestab).eq(1).should("be.visible").click();
      cy.wait("@usages");

      cy.verifyText(
        UsagesScreen.myusagestext,
        Cypress.env("translationRes").pages.myUsage.titleTxt
      );
      cy.verifyText(
        UsagesScreen.dataText,
        Cypress.env("translationRes").shared.dataTxt
      );
      cy.verifyText(
        UsagesScreen.smstext,
        Cypress.env("translationRes").shared.smsTxt
      );
      cy.verifyText(
        UsagesScreen.smstext,
        Cypress.env("translationRes").shared.smsTxt
      );
      cy.verifyText(
        UsagesScreen.mintutestext,
        Cypress.env("translationRes").shared.callTxt
      );
    });

    it(`Verify the Usage remaining data left of from total data plan  - ${language}`, () => {
      cy.fixture("usages.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.usagesapi, {
          body: data.usages,
        }).as("usages");
        cy.get(UsagesScreen.usagestab).eq(1).should("be.visible").click();
        cy.wait("@usages");
        cy.get(UsagesScreen.packetdata).then((usagesdata) => {
          expect(usagesdata.text().replace(" ", "")).to.equal(
            data.usages.data[0].allowanceUsages[0].summaryFields[0].value.replace(
              " ",
              ""
            )
          );
        });
        cy.verifyText(
          UsagesScreen.leftTo,
          Cypress.env("translationRes").pages.myUsage.compareTxt
        );
        cy.get(UsagesScreen.leftTo)
          .eq(1)
          .then((usagesdata) => {
            expect(usagesdata.text().replace(" ", "")).to.equal(
              data.usages.data[0].allowanceUsages[0].additionalFields[0].value.replace(
                " ",
                ""
              )
            );
          });

        cy.get(UsagesScreen.progrssbar).should("be.visible");
      });
    });

    it(`Verify the icon and expiry date   - ${language}`, () => {
      cy.fixture("usages.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.usagesapi, {
          body: data.usages,
        }).as("usages");
        cy.get(UsagesScreen.usagestab).eq(1).should("be.visible").click();
        cy.wait("@usages");
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
