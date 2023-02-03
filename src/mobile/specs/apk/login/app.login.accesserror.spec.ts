'use strict';
import allureReporter from '@wdio/allure-reporter';
import LoginScreen from "../../../screenobjects/login.screen"
import { Target } from '@applitools/eyes-webdriverio'
import CommonMethods from '../../../support/commonMethods';
let loginScreen: LoginScreen = new LoginScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - login form Access Errors - ${language}`, () => {
    it(`To validate the access errors scenarios in ${language}`, async () => {
      allureReporter.addLabel('Login TestCase', `${language} - validate the access errors with wrong password or email id`);
      allureReporter.addTestId('SDCARE-2347');
      allureReporter.addTestId('SDCARE-4174');
      await loginScreen.waitForIsShown(true);
      if (language == 'English') {
        await loginScreen.tapOnLanguageButton();
        await loginScreen.waitForIsShown(true);
      }
      await loginScreen.waitForLoginButton();
      await driver.eyesCheck(` ${language} - Login Screen`, Target.window())
      let homeScreen = await loginScreen.login({ email: commonMethods.randomEmail(), password: commonMethods.randomAlphaNumericStr('ALPHANUMERIC', 8), success: true })
      await (await loginScreen.errorTitle).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - access error page`, Target.window().fully());
      await (await loginScreen.tryAgainBtn).click();
      await loginScreen.waitForIsShown(true);
      await driver.eyesCheck(`${language} - page should be navigated to login`, Target.window().fully());
    });
  });
});