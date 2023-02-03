import { CommonScreenObjects } from "../../../support/pageObjects/commonObjects";
import { Menu } from "../../../support/pageObjects/menu";
import { UrlConstant } from "../../../support/urlConstants";
import { Settings } from "../../../support/pageObjects/settings";
import { Icons } from "../../../support/pageObjects/icons";

const settings = new Settings();

["Spanish", "English"].forEach((language, indexVal) => {
  describe(`Menu Validation - ${Cypress.env(
    "environment"
  )} - ${language}`, () => {
    beforeEach(function () {
      cy.languageSwitcher(language);
      cy.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
    });
    it(`Menu - Prepaid - ${language}`, () => {
      const prepaid = Cypress.env("translationRes").mainMenuList.Prepaid;
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
        cy.get(Menu.logo).should("be.visible");
        cy.get(Menu.deskTopBarMenu).each((val, index) => {
          cy.verifyAttribute(
            Menu.topBarIcons,
            "data-mat-icon-name",
            Icons.topbar[index],
            index
          );
          cy.verifyText(
            Menu.deskTopBarMenu,
            prepaid.top_bar_list[0].menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu).each((val, index) => {
          cy.verifyText(
            Menu.horizontalMenu,
            prepaid.main_menu_list.menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu)
          .contains(prepaid.main_menu_list.menu_list[2].title)
          .click();
        cy.get(Menu.supportOptions).each((val, index) => {
          cy.verifyText(
            Menu.supportOptions,
            prepaid.main_menu_list.menu_list[2].sub_menu[index].title,
            index
          );
        });
        cy.get(Menu.languageSwitcherIcon).should("be.visible");
        cy.verifyText(
          Menu.switcherValue,
          CommonScreenObjects.languages[indexVal]
        );
      });
    });
    it(`Menu - Postpaid - ${language}`, () => {
      const postpaid = Cypress.env("translationRes").mainMenuList.Postpaid;
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
        cy.get(Menu.logo).should("be.visible");
        cy.get(Menu.deskTopBarMenu).each((val, index) => {
          cy.verifyAttribute(
            Menu.topBarIcons,
            "data-mat-icon-name",
            Icons.topbar[index],
            index
          );
          cy.verifyText(
            Menu.deskTopBarMenu,
            postpaid.top_bar_list[0].menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu).each((val, index) => {
          cy.verifyText(
            Menu.horizontalMenu,
            postpaid.main_menu_list.menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu)
          .contains(postpaid.main_menu_list.menu_list[2].title)
          .click();
        cy.get(Menu.supportOptions).each((val, index) => {
          cy.verifyText(
            Menu.supportOptions,
            postpaid.main_menu_list.menu_list[2].sub_menu[index].title,
            index
          );
        });
        cy.get(Menu.languageSwitcherIcon).should("be.visible");
        cy.verifyText(
          Menu.switcherValue,
          CommonScreenObjects.languages[indexVal]
        );
      });
    });
    it(`Menu - Fixed - ${language}`, () => {
      const home = Cypress.env("translationRes").mainMenuList.Home;
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
        cy.get(Menu.logo).should("be.visible");
        cy.get(Menu.deskTopBarMenu).each((val, index) => {
          cy.verifyAttribute(
            Menu.topBarIcons,
            "data-mat-icon-name",
            Icons.topbar[index],
            index
          );
          cy.verifyText(
            Menu.deskTopBarMenu,
            home.top_bar_list[0].menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu).each((val, index) => {
          cy.verifyText(
            Menu.horizontalMenu,
            home.main_menu_list.menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu)
          .contains(home.main_menu_list.menu_list[4].title)
          .click();
        cy.get(Menu.supportOptions).each((val, index) => {
          cy.verifyText(
            Menu.supportOptions,
            home.main_menu_list.menu_list[4].sub_menu[index].title,
            index
          );
        });
        cy.get(Menu.languageSwitcherIcon).should("be.visible");
        cy.verifyText(
          Menu.switcherValue,
          CommonScreenObjects.languages[indexVal]
        );
      });
    });
    it(`Validate menu options when all the services available - ${language}`, () => {
      const postpaid = Cypress.env("translationRes").mainMenuList.Postpaid;
      const home = Cypress.env("translationRes").mainMenuList.Home;
      const prepaid = Cypress.env("translationRes").mainMenuList.Prepaid;
      cy.fixture("fetchAccount.json").then((data) => {
        cy.intercept(UrlConstant.GET_METHOD, UrlConstant.fetchAccounts, {
          body: data.all3Services,
        }).as("fetchAccounts");
      });
      cy.wait("@fetchAccounts").then(() => {
        cy.get(CommonScreenObjects.greetingText).should("be.visible");
        //For Postpaid services
        cy.get(Menu.logo).should("be.visible");
        cy.get(Menu.deskTopBarMenu).each((val, index) => {
          cy.verifyAttribute(
            Menu.topBarIcons,
            "data-mat-icon-name",
            Icons.topbar[index],
            index
          );
          cy.verifyText(
            Menu.deskTopBarMenu,
            postpaid.top_bar_list[0].menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu).each((val, index) => {
          cy.verifyText(
            Menu.horizontalMenu,
            postpaid.main_menu_list.menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu)
          .contains(postpaid.main_menu_list.menu_list[2].title)
          .click();
        cy.get(Menu.supportOptions).each((val, index) => {
          cy.verifyText(
            Menu.supportOptions,
            postpaid.main_menu_list.menu_list[2].sub_menu[index].title,
            index
          );
        });
        cy.verifyText(
          Menu.switcherValue,
          CommonScreenObjects.languages[indexVal]
        );
        //For Fixed services
        settings.accountSelector(
          Settings.serviceSelector,
          Settings.homeSelector,
          3
        );
        cy.get(Menu.homeService).click();
        cy.get(Menu.logo).should("be.visible");
        cy.get(Menu.deskTopBarMenu).each((val, index) => {
          cy.verifyAttribute(
            Menu.topBarIcons,
            "data-mat-icon-name",
            Icons.topbar[index],
            index
          );
          cy.verifyText(
            Menu.deskTopBarMenu,
            home.top_bar_list[0].menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu).each((val, index) => {
          cy.verifyText(
            Menu.horizontalMenu,
            home.main_menu_list.menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu)
          .contains(home.main_menu_list.menu_list[4].title)
          .click();
        cy.get(Menu.supportOptions).each((val, index) => {
          cy.verifyText(
            Menu.supportOptions,
            home.main_menu_list.menu_list[4].sub_menu[index].title,
            index
          );
        });
        cy.get(Menu.languageSwitcherIcon).should("be.visible");
        cy.verifyText(
          Menu.switcherValue,
          CommonScreenObjects.languages[indexVal]
        );
        //For Prepaid Service
        settings.accountSelector(
          Settings.serviceSelector,
          Settings.homeSelector,
          2
        );
        cy.get(Menu.mobileService).contains("TestPrepaid").click();
        cy.get(Menu.logo).should("be.visible");
        cy.get(Menu.deskTopBarMenu).each((val, index) => {
          cy.verifyAttribute(
            Menu.topBarIcons,
            "data-mat-icon-name",
            Icons.topbar[index],
            index
          );
          cy.verifyText(
            Menu.deskTopBarMenu,
            prepaid.top_bar_list[0].menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu).each((val, index) => {
          cy.verifyText(
            Menu.horizontalMenu,
            prepaid.main_menu_list.menu_list[index].title,
            index
          );
        });
        cy.get(Menu.horizontalMenu)
          .contains(prepaid.main_menu_list.menu_list[2].title)
          .click();
        cy.get(Menu.supportOptions).each((val, index) => {
          cy.verifyText(
            Menu.supportOptions,
            prepaid.main_menu_list.menu_list[2].sub_menu[index].title,
            index
          );
        });
        cy.get(Menu.languageSwitcherIcon).should("be.visible");
        cy.verifyText(
          Menu.switcherValue,
          CommonScreenObjects.languages[indexVal]
        );
      });
    });
  });
});
