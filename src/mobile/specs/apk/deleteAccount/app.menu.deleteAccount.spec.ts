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
  describe(`App - Android - Delete Account- Happy Path under support - Menu - ${language}`, () => {
    it(`Delete account happy path under support - Menu - ${language}`, async () => {
      allureReporter.addLabel('Menu', `Delete account happy path screen under support - Menu - ${language}`);
      allureReporter.addTestId('SDCARE-3429');
      await commonMethods.login(loginDetails.userName2, loginDetails.password2, `${language}`, true);
      await (await homeScreen.hamburgerMenuBtn).click();
      await (await menuScreen.myaccountsLink).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - Menu page`, Target.window());
      await (await menuScreen.supportChevronBtn).click();
      await driver.eyesCheck(`${language} - Menu page with support menu expanded`, Target.window());
      await (await menuScreen.deleteAccount).click();
      await (await menuScreen.deleteAccountPageTitle).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - Delete account Page`, Target.window());
      await (await menuScreen.deleteAccountPasswordField).click();
      driver.keys('We@123123');
      driver.hideKeyboard();
      await (await menuScreen.deleteAccountCheckbox).click();
      await driver.eyesCheck(`${language} - Delete account after entering password & checkbox enabled`, Target.window());
      // delete account button is not visible in the app locator.
      driver.touchAction({
        action: 'tap',
        x: 698,
        y: 2915
      });
      await (await menuScreen.deleteAccountTitle).waitForDisplayed({ timeout: 10000 });
      await driver.eyesCheck(`${language} - Account deleted successfully`, Target.window());
      await (await menuScreen.deleteAccountDoneBtn).click();
      await driver.eyesCheck(`${language} - navigates back to login screen`, Target.window());
    });
  });
})
