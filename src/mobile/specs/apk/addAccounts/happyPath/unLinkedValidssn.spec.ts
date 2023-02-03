'use strict';
import allureReporter from '@wdio/allure-reporter';
import HomeScreen from "../../../../screenobjects/home.screen"
import { Target } from '@applitools/eyes-webdriverio'
import MenuScreen from "../../../../screenobjects/menu.screen";
import MyAccounts from "../../../../screenobjects/myaccounts.screen";
import CommonMethods from "../../../../support/commonMethods";
import { loginDetails, accountDetails } from '../../../../fixtures/testDataDetails';
let homeScreen: HomeScreen = new HomeScreen();
let menuScreen: MenuScreen = new MenuScreen();
let myaccounts: MyAccounts = new MyAccounts();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - Unlinked active account & Valid SSN associated to it -Happy path - ${language}`, () => {
    it(`Linked accounts- Unlinked active account & Valid SSN associated link  happypath scenario - ${language}`, async () => {
      allureReporter.addLabel('LinkedAccounts', `Linked accounts- Unlinked active account & Valid SSN associated happypath scenario - ${language}`);
      allureReporter.addTestId('SDCARE-3119');
      allureReporter.addTestId('SDCARE-2483');
      allureReporter.addTestId('SDCARE-2466');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.hamburgerMenuBtn).click();
      await commonMethods.waitForElement(menuScreen.myaccountsLink);
      await (await menuScreen.myaccountsLink).click();
      await commonMethods.waitForElement(myaccounts.pageTitle);
      await browser.setTimeout({ 'implicit': 10000 });
      await driver.eyesCheck(`${language} - My accounts page`, Target.window());
      await (await myaccounts.addAccountBtn).click();
      await driver.eyesCheck(`${language} - Add accounts page`, Target.window());
      await (await myaccounts.accountNumberField).click();
      driver.keys(accountDetails.validAccountNumber1);
      await (await myaccounts.hintBtn).click();
      await commonMethods.waitForButtonEnabled(myaccounts.continueBtn);
      await driver.eyesCheck(`${language} - add account page with button enabled`, Target.window());
      await (await myaccounts.continueBtn).click();
      await driver.eyesCheck(`${language} - Verify your identiy page default ssn field enabled`, Target.window());
      await (await myaccounts.ssnField).click();
      driver.keys(accountDetails.validSSN1);
      driver.back();
      await commonMethods.waitForButtonEnabled(myaccounts.identifyContinueBtn);
      await driver.eyesCheck(`${language} - Verify your identiy page button enabled`, Target.window());
      await (await myaccounts.identifyContinueBtn).click();
      await commonMethods.waitForElement(myaccounts.linkedAccountNumber);
      await driver.eyesCheck(`${language} - validate the linked account sucessfully`, Target.window());

    });
  });
})
