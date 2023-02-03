'use strict';
import allureReporter from '@wdio/allure-reporter';
import HomeScreen from "../../../screenobjects/home.screen"
import { Target } from '@applitools/eyes-webdriverio'
import CommonMethods from "../../../support/commonMethods";
import { loginDetails } from '../../../fixtures/testDataDetails';
let homeScreen: HomeScreen = new HomeScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - Quick access links in Account Overview - ${language}`, () => {
    it(`Quick access links in Account Overview page - ${language}`, async () => {
      allureReporter.addLabel('Account Overview', `Quick access links in Account Overview - ${language}`);
      allureReporter.addTestId('SDCARE-3075');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.quickAccessPayBillBtn).click();
      await driver.eyesCheck(`${language} - Quick acess paybill bil screen loader `, Target.window());
      await driver.eyesCheck(`${language} - Quick acess paybill bil page`, Target.window());
      await (await homeScreen.backButton).click();
      await driver.eyesCheck(`${language} - back to account overview page`, Target.window());
      await (await homeScreen.quickAccessBillHistoryBtn).click();
      await driver.eyesCheck(`${language} - Quick access - bill history page`, Target.window());
    });


  });
})
