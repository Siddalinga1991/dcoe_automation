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
    describe(`App - Android - Navigation Bar  - Prepaid account - ${language}`, () => {
        it(`Navigation bar validation - Prepaid Account - ${language}`, async () => {
            allureReporter.addLabel('Navigation bar validation', ` - Prepaid account - ${language}`);
            allureReporter.addTestId('SDCARE-3838');
            await commonMethods.login(loginDetails.userName5, loginDetails.password5, `${language}`, true);
            await homeScreen.handleOutageAlert();
            await homeScreen.switchToPrepaidAccount();
            await commonMethods.waitForElementToDisplay(homeScreen.quickAccessHomeBtn);
            await commonMethods.verifyIsDisplayed(homeScreen.quickAccessHomeBtn);
            await (await homeScreen.rechargeBtn).click();
            await commonMethods.waitForElementToDisplay(homeScreen.rechargeThirdParty);
            await commonMethods.verifyIsDisplayed(homeScreen.rechargeThirdParty);
            await (await homeScreen.backButton).click();
            await homeScreen.waitForUserInfoName();
            await commonMethods.verifyIsDisplayed(homeScreen.activateSimBtn);
            await (await homeScreen.activateSimBtn).click();
            await commonMethods.waitForElementToDisplay(homeScreen.activateSimPhoneNum);
            await commonMethods.verifyIsDisplayed(homeScreen.activateSimPhoneNum);
            await (await homeScreen.backButton).click();
            await homeScreen.waitForUserInfoName();
            await commonMethods.verifyIsDisplayed(homeScreen.activateSimBtn);
        });
    });
})