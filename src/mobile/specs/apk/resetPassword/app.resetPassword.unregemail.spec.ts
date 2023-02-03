import { Target } from '@applitools/eyes-webdriverio'
import LoginScreen from "../../../screenobjects/login.screen";
import { RegainAccessScreen } from "../../../screenobjects/regainAccess.screen";
import allureReporter from '@wdio/allure-reporter';
import CommonMethods from '../../../support/commonMethods';
let loginScreen: LoginScreen = new LoginScreen();
let regainScreen: RegainAccessScreen = new RegainAccessScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
    describe(`App - Android -  Reset password form for unregistered email - ${language}`, () => {
        it(`UnHappy Path - reset Password scenario with unregistered email - ${language}`, async () => {
            await loginScreen.waitForIsShown(true);
            if (language == 'English') {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await loginScreen.cantLoginBtn.click();
            await driver.eyesCheck(`${language} - regain access page`, Target.window())
            await (await $('//android.view.View[@content-desc="Reset Password" or @content-desc="Reestablecer contraseña"]/android.view.View')).click();
            await (await regainScreen.emailIdField).click();
            driver.keys(commonMethods.randomEmail());
            await $$('//android.view.View')[0].click();
            await regainScreen.waitForButtonEnabled(regainScreen.sendEmailBtn);
            await driver.eyesCheck(`${language} - Email screen button enabled`, Target.window());
            await (await regainScreen.sendEmailBtn).click();
            await regainScreen.waitForButtonEnabled(regainScreen.tryAgainBtn);
            await driver.eyesCheck(`${language} - Reset password error validation screen`, Target.window().fully());
            await (await regainScreen.tryAgainBtn).click();
            await (await regainScreen.emailIdField).waitForDisplayed({ timeout: 10000 });
            await driver.eyesCheck(`${language} - Moved From error message screen to email entry screen`, Target.window());
        });
    });
});