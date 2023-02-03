'use strict';
import allureReporter from '@wdio/allure-reporter';
import LoginScreen from "../../../screenobjects/login.screen"
import { Target } from '@applitools/eyes-webdriverio'
import { loginDetails } from '../../../fixtures/testDataDetails';
import CommonMethods from '../../../support/commonMethods';
import HomeScreen from '../../../screenobjects/home.screen';
import HistoryScreen from '../../../screenobjects/history.screen';
let loginScreen: LoginScreen = new LoginScreen();
const homeScreen: HomeScreen = new HomeScreen();
let historyScreen: HistoryScreen = new HistoryScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - Bill history- Past bill screen to download pdf- ${language}`, () => {
    it(`Bill history past bill screen & pdf download ${language}`, async () => {
      allureReporter.addLabel('Bill history TestCase', `${language} - past bill screen`);
      allureReporter.addTestId('SDCARE-3065');
      await loginScreen.waitForIsShown(true);
      await loginScreen.waitForLoginButton();
      await commonMethods.login(loginDetails.userName5, loginDetails.password5, `${language}`, true);
      await (await homeScreen.billHistoryBtn).click();
      await commonMethods.verifyIsDisplayed(historyScreen.pastBillsTab);
      await (await historyScreen.pastBillsTab).click();
      await (await historyScreen.selectFirstMonth).click();
      await (await historyScreen.moreDetailsBtn).waitForDisplayed({ timeout: 15000 });
      await commonMethods.verifyIsDisplayed(historyScreen.billAmount);
      await (await historyScreen.moreDetailsBtn).click();
      await commonMethods.verifyIsDisplayed(historyScreen.billAmount);
      await (await historyScreen.pastBillsPdfDownload).click();
    });
  });
});