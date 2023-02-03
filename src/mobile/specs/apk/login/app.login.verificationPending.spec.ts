'use strict';
import allureReporter from '@wdio/allure-reporter';
import LoginScreen from "../../../screenobjects/login.screen"
import { Target } from '@applitools/eyes-webdriverio'
import { loginDetails } from '../../../fixtures/testDataDetails';
let loginScreen: LoginScreen = new LoginScreen();
['English', 'Spanish'].forEach((language)=> {
describe(`App - Android - login form Verification pending - ${language}`, () => {
  it(`To validate the Verification pending scenarios in ${language}`, async () => {
    allureReporter.addLabel('Login TestCase', `${language} - validate the Verification pending scenarios after login`);
    allureReporter.addTestId('SDCARE-2347');
    allureReporter.addTestId("SDCARE-4175");
    await loginScreen.waitForIsShown(true);
   if(language == 'English'){
    await loginScreen.tapOnLanguageButton();
    await loginScreen.waitForIsShown(true);
   }
    await loginScreen.waitForLoginButton();
   await driver.eyesCheck(` ${language} - Login Screen`, Target.window())
    let homeScreen = await loginScreen.login({ email: loginDetails.unlinkedEmailAddress, password: loginDetails.password6, success: true })
    await (await loginScreen.errorTitle).waitForDisplayed({timeout:10000});
   await driver.eyesCheck(`${language} - Verification pending error screen`, Target.window().fully());
    await( await loginScreen.tryAgainBtn).click();
    await loginScreen.waitForIsShown(true);
   await driver.eyesCheck(`${language} - page should be navigated to login`, Target.window().fully());
  });
});
});