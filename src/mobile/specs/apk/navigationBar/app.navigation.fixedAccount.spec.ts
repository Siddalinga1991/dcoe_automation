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
    describe(`App - Android - Navigation Bar  - Fixed account - ${language}`, () => {
        it(`Navigation bar  validation - Fixed Account - ${language}`, async () => {
            allureReporter.addLabel('Navigation bar validation', ` - Fixed account - ${language}`);
            allureReporter.addTestId('SDCARE-3838');
            await commonMethods.login(loginDetails.userName5, loginDetails.password5, `${language}`, true);
            await homeScreen.handleOutageAlert();
            await homeScreen.waitForPayBillButton();
            await commonMethods.verifyIsDisplayed(homeScreen.quickAccessPayBillBtn);
            await (await homeScreen.quickAccessPayBillBtn).click();
            await (await homeScreen.selectAccountTitle).waitForDisplayed({ timeout: 60000 });
            await commonMethods.verifyIsDisplayed(homeScreen.selectAccountTitle);
            await (await homeScreen.backButton).click();
            await homeScreen.waitForBillHistoryButton();
            await commonMethods.verifyIsDisplayed(homeScreen.quickAccessBillHistoryBtn);
            await (await homeScreen.quickAccessBillHistoryBtn).click();
            await (await homeScreen.accountInfo).waitForDisplayed({ timeout: 60000 });
            await commonMethods.verifyIsDisplayed(homeScreen.accountInfo);
            await (await homeScreen.backButton).click();
            await homeScreen.waitForBillHistoryButton();
            await commonMethods.verifyIsDisplayed(homeScreen.billHistoryBtn);
            
        });
    });
})