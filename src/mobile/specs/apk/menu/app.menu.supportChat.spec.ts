'use strict';
import allureReporter from '@wdio/allure-reporter';
import HomeScreen from "../../../screenobjects/home.screen"
import { Target } from '@applitools/eyes-webdriverio'
import MenuScreen from "../../../screenobjects/menu.screen";
import CommonMethods from "../../../support/commonMethods";
import { loginDetails } from '../../../fixtures/testDataDetails';
let homeScreen: HomeScreen = new HomeScreen();
let menuScreen: MenuScreen = new MenuScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android - Support chat under support - Menu - ${language}`, () => {
    it(`Support chat screen under support - Menu - ${language}`, async () => {
      allureReporter.addLabel('Menu', `Support chat screen under support - Menu - ${language}`);
      allureReporter.addTestId('SDCARE-3074');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.hamburgerMenuBtn).click();
      await (await menuScreen.myaccountsLink).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - Menu page`, Target.window());
      await (await menuScreen.supportChevronBtn).click();
      await driver.eyesCheck(`${language} - Menu page with support menu expanded`, Target.window());
      await (await menuScreen.supportChatLink).click();
      await driver.eyesCheck(`${language} - Support chat - whatsapp page`, Target.window());
    });
  });
})
