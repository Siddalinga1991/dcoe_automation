'use strict';
import allureReporter from '@wdio/allure-reporter';
import LoginScreen from "../../../screenobjects/login.screen"
import { Target } from '@applitools/eyes-webdriverio'
import CommonMethods from '../../../support/commonMethods';
import { loginDetails } from '../../../fixtures/testDataDetails';
let loginScreen: LoginScreen = new LoginScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - login form 3 attempts login Errors - ${language}`, () => {
    it(`To validate the 3 attempts login errors scenarios in ${language}`, async () => {
      allureReporter.addLabel('Login TestCase', `${language} - validate the 3 attempts login errors with wrong password or registered email id`);
      allureReporter.addTestId('SDCARE-2347');
      allureReporter.addTestId("SDCARE-4180");
      await loginScreen.waitForIsShown(true);
      if (language == 'English') {
        await loginScreen.tapOnLanguageButton();
        await loginScreen.waitForIsShown(true);
      }
      await loginScreen.waitForLoginButton();
      for (let i = 0; i < 3; i++) {
        let homeScreen = await loginScreen.login({ email: loginDetails.userName3, password: commonMethods.randomAlphaNumericStr('ALPHANUMERIC', 8), success: true })
        await (await loginScreen.tryAgainBtn).waitForDisplayed({ timeout: 10000 });
        if (i == 2) {
          await driver.eyesCheck(`${language} - 3 attempts login access error`, Target.window().fully());
        }
        await (await loginScreen.tryAgainBtn).click();
        await loginScreen.waitForIsShown(true);
        await (await loginScreen.emailField).clearValue();
      }
      await driver.eyesCheck(`${language} - page should be navigated to login`, Target.window().fully());
    });
  });
});