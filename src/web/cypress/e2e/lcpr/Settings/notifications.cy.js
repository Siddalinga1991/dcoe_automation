import { Settings } from "../../../support/pageObjects/settings";
import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { UrlConstant } from "../../../support/urlConstants";

["Spanish", "English"].forEach((language) => {
  describe(`Notification Page Validation - ${Cypress.env(
    "environment"
  )} - - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
    });
    it(`Notification Page Validation for current account - ${language}`, () => {
      cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts).as(
        "fetchAccounts"
      );
      cy.wait("@fetchAccounts").then((res) => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
        cy.get(Settings.settingOptions).eq(0).click();
        if (res.response.body.data.currentAccount.accountType == "Home") {
          cy.get(Settings.toastBanner)
            .should("be.visible")
            .then(() => {
              cy.get(Settings.breadcrumb).should("be.visible");
              cy.verifyText(
                Settings.toastBannerDescription,
                Cypress.env("translationRes").pages.flashNotificationPage
                  .alertTitle
              );
              cy.get(Settings.notificationTitle).each((val, index) => {
                cy.verifyText(
                  Settings.notificationTitle,
                  Cypress.env("translationRes").flashNotifications.home[index]
                    .titleTxt,
                  index
                );
                cy.verifyText(
                  Settings.notificationSubtitle,
                  Cypress.env("translationRes").flashNotifications.home[index]
                    .subTitleTxt,
                  index
                );
                cy.get(Settings.chatButtonIcon).eq(index).should("be.visible");
                cy.get(Settings.toggleButton).eq(index).should("be.visible");
              });
            });
        } else if (
          res.response.body.data.currentAccount.accountType == "Prepaid"
        ) {
          cy.get(Settings.breadcrumb).should("be.visible");
          cy.get(Settings.notificationTitle).each((val, index) => {
            cy.verifyText(
              Settings.notificationTitle,
              Cypress.env("translationRes").flashNotifications.prepaid[index]
                .titleTxt,
              index
            );
            cy.verifyText(
              Settings.notificationSubtitle,
              Cypress.env("translationRes").flashNotifications.prepaid[index]
                .subTitleTxt,
              index
            );
          });
          cy.verifyText(
            Settings.supportChatLabel,
            Cypress.env("translationRes").flashNotifications.prepaid[5].titleTxt
          );
          cy.verifyText(
            Settings.supportChatButton,
            Cypress.env("translationRes").shared.supportChatTxt
          );
        } else {
          cy.get(Settings.breadcrumb).should("be.visible");
          cy.get(Settings.notificationTitle).each((val, index) => {
            cy.verifyText(
              Settings.notificationTitle,
              Cypress.env("translationRes").flashNotifications.postpaid[index]
                .titleTxt,
              index
            );
            cy.verifyText(
              Settings.notificationSubtitle,
              Cypress.env("translationRes").flashNotifications.postpaid[index]
                .subTitleTxt,
              index
            );
          });
          cy.verifyText(
            Settings.supportChatLabel,
            Cypress.env("translationRes").flashNotifications.postpaid[5]
              .titleTxt
          );
          cy.verifyText(
            Settings.supportChatButton,
            Cypress.env("translationRes").shared.supportChatTxt
          );
        }
      });
    });
    it(`Notification Page Validation for Prepaid Services - ${language}`, () => {
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.prepaid,
        }).as("fetchAccounts");
      });
      cy.fixture("fetchAccountOverview.json").then((data) => {
        cy.intercept(
          UrlConstant.POST_METHOD,
          UrlConstant.fetchAccountOverviewPrepaid,
          {
            body: data.prepaid,
          }
        ).as("fetchAccountOverview");
      });
      cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
      cy.get(CommonScreenObjects.greetingText).should("be.visible");
          cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
          cy.get(Settings.settingOptions).eq(0).click();
          cy.get(Settings.breadcrumb).should("be.visible");
          cy.get(Settings.notificationTitle).each((val, index) => {
            cy.verifyText(
              Settings.notificationTitle,
              Cypress.env("translationRes").flashNotifications.prepaid[index]
                .titleTxt,
              index
            );
            cy.verifyText(
              Settings.notificationSubtitle,
              Cypress.env("translationRes").flashNotifications.prepaid[index]
                .subTitleTxt,
              index
            );
          });
          cy.verifyText(
            Settings.supportChatLabel,
            Cypress.env("translationRes").flashNotifications.prepaid[5].titleTxt
          );
          cy.verifyText(
            Settings.supportChatButton,
            Cypress.env("translationRes").shared.supportChatTxt
          );
        });
      });
      it(`Notification Page Validation for Postpaid Services - ${language}`, () => {
        cy.fixture("fetchAccount.json").then((data) => {
          cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
            body: data.postpaid,
          }).as("fetchAccounts");
        });
        cy.fixture("fetchAccountOverview.json").then((data) => {
          cy.intercept(
            UrlConstant.POST_METHOD,
            UrlConstant.fetchAccountOverview,
            {
              body: data.postpaid,
            }
          ).as("fetchAccountOverview");
        });
        cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
            cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
            cy.get(Settings.settingOptions).eq(0).click();
            cy.get(Settings.breadcrumb).should("be.visible");
            cy.get(Settings.notificationTitle).each((val, index) => {
              cy.verifyText(
                Settings.notificationTitle,
                Cypress.env("translationRes").flashNotifications.postpaid[index]
                  .titleTxt,
                index
              );
              cy.verifyText(
                Settings.notificationSubtitle,
                Cypress.env("translationRes").flashNotifications.postpaid[index]
                  .subTitleTxt,
                index
              );
            });
            cy.verifyText(
              Settings.supportChatLabel,
              Cypress.env("translationRes").flashNotifications.postpaid[5].titleTxt
            );
            cy.verifyText(
              Settings.supportChatButton,
              Cypress.env("translationRes").shared.supportChatTxt
            );
          });
        });
        it(`Notification Page Validation for Fixed Services - ${language}`, () => {
          cy.fixture("fetchAccount.json").then((data) => {
            cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
              body: data.fixed,
            }).as("fetchAccounts");
          });
          cy.fixture("fetchAccountOverview.json").then((data) => {
            cy.intercept(
              UrlConstant.POST_METHOD,
              UrlConstant.fetchAccountOverview,
              {
                body: data.fixed,
              }
            ).as("fetchAccountOverview");
          });
          cy.wait(["@fetchAccounts", "@fetchAccountOverview"]).then(() => {
          cy.get(CommonScreenObjects.greetingText).should("be.visible");
              cy.get(CommonScreenObjects.topBarMenu).eq(1).click();
              cy.get(Settings.settingOptions).eq(0).click();
              cy.get(Settings.toastBanner)
              .should("be.visible")
              .then(() => {
                cy.get(Settings.breadcrumb).should("be.visible");
                cy.verifyText(
                  Settings.toastBannerDescription,
                  Cypress.env("translationRes").pages.flashNotificationPage
                    .alertTitle
                );
                cy.get(Settings.notificationTitle).each((val, index) => {
                  cy.verifyText(
                    Settings.notificationTitle,
                    Cypress.env("translationRes").flashNotifications.home[index]
                      .titleTxt,
                    index
                  );
                  cy.verifyText(
                    Settings.notificationSubtitle,
                    Cypress.env("translationRes").flashNotifications.home[index]
                      .subTitleTxt,
                    index
                  );
                  cy.get(Settings.chatButtonIcon).eq(index).should("be.visible");
                  cy.get(Settings.toggleButton).eq(index).should("be.visible");
                });
              });
            });
          });
    });
  });
