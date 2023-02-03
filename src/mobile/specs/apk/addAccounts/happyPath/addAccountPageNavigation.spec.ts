'use strict';
import allureReporter from '@wdio/allure-reporter';
import { Target } from '@applitools/eyes-webdriverio'
import MyAccounts from "../../../../screenobjects/myaccounts.screen";
import HomeScreen from '../../../../screenobjects/home.screen';
import CommonMethods from "../../../../support/commonMethods";
import { loginDetails } from '../../../../fixtures/testDataDetails';
let myaccounts: MyAccounts = new MyAccounts();
let homeScreen: HomeScreen = new HomeScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
    describe(`App - Android - navigate to Add accounts from account overview dropdown-Happy path - ${language}`, () => {
        it(`Linked accounts- navigate to Add accounts from account overview dropdown  happypath scenario - ${language}`, async () => {
            allureReporter.addLabel('Add accounts via account over view', `Linked accounts- navigate to Add accounts from account overview dropdown happypath scenario- ${language}`);
            allureReporter.addTestId('SDCARE-2425');
            allureReporter.addTestId('SDCARE-2423');
            await commonMethods.login(loginDetails.userName2, loginDetails.password2, `${language}`, true);
            await (await homeScreen.accountDropDown).click();
            await commonMethods.waitForElement(homeScreen.servicesTab);
            await driver.eyesCheck(`${language} - Select an account tab`, Target.window());
            driver.touchPerform([
                {
                    action: 'press',
                    options: {
                        x: 1145,
                        y: 2776
                    }
                },
                {
                    action: 'wait',
                    options: {
                        ms: 1000
                    }
                },
                {
                    action: 'moveTo',
                    options: {
                        x: 547,
                        y: 2746
                    }
                },
                {
                    action: 'release',
                    options: {}
                }
            ])
            await driver.eyesCheck(`${language} - Select account after swiping.`, Target.window());
            await (await homeScreen.selectAccount).click();
            await (await myaccounts.hintText).waitForDisplayed({ timeout: 5000 });
            await driver.eyesCheck(`${language} - My accounts page via account selection drop down`, Target.window());
        });
    });
});