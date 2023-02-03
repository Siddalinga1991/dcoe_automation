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
  describe(`App - Android - Bill history- Current bill screen to download pdf- ${language}`, () => {
    it(`Bill history Current bill screen & pdf download ${language}`, async () => {
      allureReporter.addLabel('Bill history TestCase', `${language} - Current bill screen`);
      allureReporter.addTestId('SDCARE-3065');
      await loginScreen.waitForIsShown(true);
      await loginScreen.waitForLoginButton();
      await commonMethods.login(loginDetails.userName5, loginDetails.password5, `${language}`, true);
      await commonMethods.waitForElementToDisplay(homeScreen.quickAccessHomeBtn);
      await commonMethods.verifyIsDisplayed(homeScreen.quickAccessHomeBtn);
      await (await homeScreen.billHistoryBtn).click();
      await commonMethods.waitForElementToDisplay(historyScreen.moreDetailsBtn);
      await commonMethods.verifyIsDisplayed(historyScreen.serviceNumber);
      await (await historyScreen.moreDetailsBtn).click();
      await commonMethods.waitForElementToDisplay(historyScreen.billAmount);
      await commonMethods.verifyIsDisplayed(historyScreen.billAmount);
      driver.touchPerform([
        {
          action: 'press',
          options: {
            x: 600,
            y: 1500
          }
        },
        {
          action: 'wait',
          options: {
            ms: 1000
          }
        },
        {
          action: 'moveTo',
          options: {
            x: 600,
            y: 300
          }
        },
        {
          action: 'release',
          options: {}
        }
      ])
      await (await historyScreen.checkBillPdf).waitForDisplayed({ timeout: 15000 });
      await commonMethods.verifyIsDisplayed(historyScreen.checkBillPdf);
      await (await historyScreen.checkBillPdf).click();
    });
  });
});