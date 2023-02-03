'use strict';
import allureReporter from '@wdio/allure-reporter';
import HomeScreen from "../../../../screenobjects/home.screen"
import { Target } from '@applitools/eyes-webdriverio'
import MenuScreen from "../../../../screenobjects/menu.screen";
import MyAccounts from "../../../../screenobjects/myaccounts.screen";
import CommonMethods from "../../../../support/commonMethods";
import { loginDetails } from '../../../../fixtures/testDataDetails';
let homeScreen: HomeScreen = new HomeScreen();
let menuScreen: MenuScreen = new MenuScreen();
let myaccounts: MyAccounts = new MyAccounts();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - random account number & random SSN link error scenario - ${language}`, () => {
    it(`Linked accounts- random account number & random SSN link scenario - ${language}`, async () => {
      allureReporter.addLabel('Login TestCase', `Linked accounts- random account number & random SSN linked scenario- ${language}`);
      allureReporter.addTestId('SDCARE-3122');
      await commonMethods.login(loginDetails.userName2, loginDetails.password2, `${language}`, true);
      await (await homeScreen.hamburgerMenuBtn).click();
      await (await menuScreen.myaccountsLink).waitForDisplayed({ timeout: 10000 });
      await (await menuScreen.myaccountsLink).click();
      await driver.eyesCheck(`${language} - Showing loader before going to My accounts page`, Target.window());
      await (await myaccounts.pageTitle).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - My accounts page`, Target.window());
      await (await myaccounts.savedAccountsTab).click();
      await driver.eyesCheck(`${language} - Saved accounts page`, Target.window());
      await (await myaccounts.linkedAccountsTab).click();
      await (await myaccounts.addAccountBtn).click();
      await driver.eyesCheck(`${language} - Add accounts page`, Target.window());
      await (await myaccounts.accountNumberField).click();
      driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 16));
      await (await myaccounts.hintBtn).click();
      await commonMethods.waitForButtonEnabled(myaccounts.continueBtn);
      await driver.eyesCheck(`${language} - add account page with button enabled`, Target.window());
      await (await myaccounts.continueBtn).click();
      await driver.eyesCheck(`${language} - Verify your identiy page default ssn field enabled`, Target.window());
      await (await myaccounts.ssnField).click();
      driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 4));
      driver.back();
      await commonMethods.waitForButtonEnabled(myaccounts.identifyContinueBtn);
      await driver.eyesCheck(`${language} - Verify your identiy page button enabled`, Target.window());
      await (await myaccounts.identifyContinueBtn).click();
      await (await myaccounts.errorTitle).waitForDisplayed({ timeout: 15000 });
      await driver.eyesCheck(`${language} - validate the error description - combination error`, Target.window());
      await (await myaccounts.tryAgainBtn).click();
      await (await myaccounts.hintText).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - page should navigate back to add account page`, Target.window());
    });
  });
});