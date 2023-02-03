"use strict";
import allureReporter from "@wdio/allure-reporter";
import LoginScreen from "../../../screenobjects/login.screen";
import MenuScreen from "../../../screenobjects/menu.screen";

import { loginDetails } from "../../../fixtures/testDataDetails";
import { Target } from "@applitools/eyes-webdriverio";
let loginScreen: LoginScreen = new LoginScreen();
const menuScreen: MenuScreen = new MenuScreen();

["English", "Spanish"].forEach((language) => {

  describe(`App - Android - login form - ${language}`, () => {
    it(`should display english login forms in ${language}`, async () => {
      allureReporter.addLabel("Login TestCase",`${language} - should display spanish and english login forms`);
      allureReporter.addTestId("SDCARE-2345");
      await loginScreen.tapOnLanguageButton();
      await loginScreen.waitForIsShown(true);
      await driver.eyesCheck(`${language} Login Screen`,Target.window().fully(true));
    });

    it(`validate error validations on Email,password field & login Button in ${language}`, async () => {
      allureReporter.addLabel("Login TestCase",`${language} - validate error validations on Email,password field & login Button`);
      allureReporter.addTestId("SDCARE-2351");
      allureReporter.addTestId("SDCARE-4178");
      await loginScreen.tapOnLanguageButton();
      await loginScreen.waitForIsShown(true);
      await loginScreen.waitForLoginButton();
      await loginScreen.login({email: "test",password: "test",success: false});
      await driver.eyesCheck(`${language} - error validations on Email & Password field`,Target.window());
    });

    it(`should log in & log out - user successfully in ${language}`, async () => {
      allureReporter.addLabel("Login TestCase",`${language} - should log in & log out - user successfully`);
      allureReporter.addTestId("SDCARE-2345");
      allureReporter.addTestId("SDCARE-4172");
      allureReporter.addTestId("SDCARE-4181");
      await loginScreen.waitForIsShown(true);
      if (language == "English") {
        await loginScreen.tapOnLanguageButton();
        await loginScreen.waitForIsShown(true);
      }
      await loginScreen.waitForLoginButton();
      await driver.eyesCheck(`${language} Login Screen`, Target.window());
      let homeScreen = await loginScreen.login({email: loginDetails.userName5,password: loginDetails.password5,success: true});
      await driver.eyesCheck(`${language} Skeleton loader`, Target.window());
      await homeScreen.waitForIsShown(true);
      await homeScreen.waitForUserInfoName();
      await homeScreen.waitForPayBillButton();
      await homeScreen.waitForBillHistoryButton();
      await homeScreen.handleOutageAlert();
      await driver.eyesCheck(`${language}-Fixed Account Home Page`,Target.window().fully());
      await (await homeScreen.hamburgerMenuBtn).click();
      await driver.eyesCheck(`${language} - Menu Links page`,Target.window().fully());
      await (await menuScreen.logoutBtn).click();
      await loginScreen.waitForLoginButton();
      allureReporter.addTestId("SDCARE-2346");
      await driver.eyesCheck(`${language} - Logged out Successfully`,Target.window().fully());
      await (await loginScreen.closeIconBtn).click();
      await (await loginScreen.eyeIconBtn).click();
      await driver.eyesCheck(`${language} -  Delete Populated email in the Second time login `,Target.window().fully());
    });
  });
});

