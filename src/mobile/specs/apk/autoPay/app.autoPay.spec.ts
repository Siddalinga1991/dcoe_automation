'use strict';
import allureReporter from '@wdio/allure-reporter';
import HomeScreen from "../../../screenobjects/home.screen"
import { Target } from '@applitools/eyes-webdriverio'
import MenuScreen from "../../../screenobjects/menu.screen";
import MyAccounts from "../../../screenobjects/myaccounts.screen";
import CommonMethods from "../../../support/commonMethods";
import { loginDetails } from '../../../fixtures/testDataDetails';
let homeScreen: HomeScreen = new HomeScreen();
let menuScreen: MenuScreen = new MenuScreen();
let myaccounts: MyAccounts = new MyAccounts();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - Autopay banner verification in Account Overview - ${language}`, () => {
    it(`Autopay banner verification in Account Overview - ${language}`, async () => {
      allureReporter.addLabel('Autopay', `Autopay banner verification in Account Overview - ${language}`);
      allureReporter.addTestId('SDCARE-2778');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.accountDropDown).click();
      await commonMethods.waitForElement(homeScreen.servicesTab);
      await driver.eyesCheck(`${language} - Select an account tab`, Target.window());
      await (await homeScreen.autoPayAccount).click();
      await homeScreen.waitForPayBillButton();
      await driver.eyesCheck(`${language} - Autopay banner verification in account overview page`, Target.window());
    });

    it(`Autopay banner verification in Account Details page - ${language}`, async () => {
      allureReporter.addLabel('Autopay', `Autopay banner verification in Account Details Page - ${language}`);
      allureReporter.addTestId('SDCARE-2779');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.hamburgerMenuBtn).click();
      await (await menuScreen.myaccountsLink).waitForDisplayed({ timeout: 10000 });
      await (await menuScreen.myaccountsLink).click();
      await driver.eyesCheck(`${language} - Page loader to my accounts page`, Target.window());
      await (await myaccounts.pageTitle).waitForDisplayed({ timeout: 10000 });
      await (await myaccounts.autoPayAccountLink).click();
      await driver.eyesCheck(`${language} - Autopay banner verification in account details page`, Target.window());
    });

    it(`Autopay banner verification in Bill history page - ${language}`, async () => {
      allureReporter.addLabel('Autopay', `Autopay banner verification in Bill History page - ${language}`);
      allureReporter.addTestId('SDCARE-2780');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.accountDropDown).click();
      await commonMethods.waitForElement(homeScreen.servicesTab);
      await driver.eyesCheck(`${language} - Select an account tab`, Target.window());
      await (await homeScreen.autoPayAccount).click();
      await homeScreen.waitForBillHistoryButton();
      await (await homeScreen.billHistoryBtn).click();
      await (await homeScreen.billHistoryMoreDetailsBtn).waitForDisplayed({ timeout: 10000 });
      await (await homeScreen.billHistoryMoreDetailsBtn).click();
      await driver.eyesCheck(`${language} - Autopay banner verification in Bill history page`, Target.window());
    });
  });
})
