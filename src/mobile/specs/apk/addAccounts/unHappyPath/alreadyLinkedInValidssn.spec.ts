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
  describe(`App - Android - Already linked account & InValid SSN link error scenario - ${language}`, () => {
    it(`Linked accounts- already linked accounts & inValid SSN link scenario-${language}`, async () => {
      allureReporter.addLabel('Login TestCase', `Linked accounts- already linked accounts & inValid SSN link  scenario- ${language}`);
      allureReporter.addTestId('SDCARE-3120');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.hamburgerMenuBtn).click();
      await (await menuScreen.myaccountsLink).waitForDisplayed({ timeout: 10000 });
      await (await menuScreen.myaccountsLink).click();
      await (await myaccounts.pageTitle).waitForDisplayed({ timeout: 10000 });
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
      driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 2));
      driver.back();
      allureReporter.addTestId('SDCARE-2464');
      await driver.eyesCheck(`${language} - Verify your identiy page default ssn field enabled`, Target.window());
      await (await myaccounts.ssnField).click();
      await (await myaccounts.ssnField).clearValue();
      driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 4));
      driver.back();
      await (await myaccounts.identifyContinueBtn).waitForEnabled({ timeout: 10000 });
      await driver.eyesCheck(`${language} - Verify your identiy page button enabled`, Target.window());
      await (await myaccounts.identifyContinueBtn).click();
      await (await myaccounts.errorTitle).waitForDisplayed({ timeout: 15000 });
      await driver.eyesCheck(`${language} - validate the error description - Already linked to other user error`, Target.window());
      await (await myaccounts.tryAgainBtn).click();
      await (await myaccounts.hintText).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - page should navigate back to add account page`, Target.window());
    });
  });
});