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
  describe(`App - Android - Contact us under support - Menu - ${language}`, () => {
    it(`Contact us screen under support - Menu - ${language}`, async () => {
      allureReporter.addLabel('Menu', `Contact us screen under support - Menu - ${language}`);
      allureReporter.addTestId('SDCARE-1922');
      await commonMethods.login(loginDetails.userName1, loginDetails.password1, `${language}`, true);
      await (await homeScreen.hamburgerMenuBtn).click();
      await (await menuScreen.myaccountsLink).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - Menu page`, Target.window());
      await (await menuScreen.supportChevronBtn).click();
      await driver.eyesCheck(`${language} - Menu page with support menu expanded`, Target.window());
      await (await menuScreen.contactUsLink).click();
      await driver.eyesCheck(`${language} - Contact Us Page`, Target.window());
      await (await menuScreen.contactUsSalesLink).click();
      await driver.eyesCheck(`${language} - page navigates to phone number calling`, Target.window());
    });
  });
})
