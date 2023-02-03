"use strict";
import allureReporter from "@wdio/allure-reporter";
import LoginScreen from "../../../screenobjects/login.screen";
import MenuScreen from "../../../screenobjects/menu.screen";

import { loginDetails } from "../../../fixtures/testDataDetails";
import { Target } from "@applitools/eyes-webdriverio";
let loginScreen: LoginScreen = new LoginScreen();
const menuScreen: MenuScreen = new MenuScreen();

["English", "Spanish"].forEach((language) => {

  describe(`App - Android - Second time login - ${language}`, () => {
    it(`Second time login ${language}`, async () => {
        allureReporter.addLabel("Login TestCase",`${language} - should log in at Second time - user successfully`);
      allureReporter.addTestId("SDCARE-4173");
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
      await driver.eyesCheck(`${language}- Logged into Home Page successfully on First time`,Target.window().fully());
      await (await homeScreen.hamburgerMenuBtn).click();
      await driver.eyesCheck(`${language} - Menu Links page`,Target.window().fully());
      await (await menuScreen.logoutBtn).click();
      await loginScreen.waitForLoginButton();
      await driver.eyesCheck(`${language} - Logged out Successfully on first time`,Target.window().fully());
      await (await loginScreen.passwordField).click();
      await(await loginScreen.passwordField).setValue(loginDetails.password5);
      await driver.hideKeyboard();
      await(await loginScreen.logInBtn).click();
      await homeScreen.waitForIsShown(true);
      await homeScreen.waitForPayBillButton();
      await driver.eyesCheck(`${language} - Successful Login for the Second time`,Target.window().fully());
    });
    })
})