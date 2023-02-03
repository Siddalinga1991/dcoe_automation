import { Target } from '@applitools/eyes-webdriverio'
import LoginScreen from "../../../screenobjects/login.screen";
import { RegainAccessScreen } from "../../../screenobjects/regainAccess.screen";
import allureReporter from '@wdio/allure-reporter';
import { accountDetails } from '../../../fixtures/testDataDetails';
let loginScreen: LoginScreen = new LoginScreen();
let regainScreen: RegainAccessScreen = new RegainAccessScreen();
['English', 'Spanish'].forEach((language) => {
    describe(`App - Android -  Reset password form for registered email - ${language}`, () => {
        it(`Happy Path - reset Password scenario - ${language}`, async () => {
            allureReporter.addTestId('SDCARE-2565');
            allureReporter.addTestId('SDCARE-2567');
            await loginScreen.waitForIsShown(true);
            if (language == 'English') {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await loginScreen.cantLoginBtn.click();
            await driver.eyesCheck(`${language} - regain access page`, Target.window())
            await (await $('//android.view.View[@content-desc="Reset Password" or @content-desc="Reestablecer contraseña"]/android.view.View')).click();
            await driver.eyesCheck(`${language} - reset password page`, Target.window());
            await (await regainScreen.emailIdField).click();
            driver.keys('test');
            await $$('//android.view.View')[0].click();
            await driver.eyesCheck(`${language} - Email field error validation`, Target.window());
            await (await $$('android=new UiSelector().resourceId("lla-enter-email")'))[0].clearValue();
            await (await regainScreen.emailIdField).click();
            driver.keys(accountDetails.registeredEmail1);
            driver.hideKeyboard();
            await regainScreen.waitForButtonEnabled(regainScreen.sendEmailBtn);
            await driver.eyesCheck(`${language} - Email screen button enabled`, Target.window());
            await (await regainScreen.sendEmailBtn).click();
            await regainScreen.waitForButtonEnabled(regainScreen.doneBtn);
            await driver.eyesCheck(`${language} - Email Successfully sent`, Target.window());
            await (await regainScreen.resendLink).click();
            allureReporter.addTestId('SDCARE-2567');
            await (await regainScreen.dialogCloseBtn).waitForDisplayed({ timeout: 10000 });
            await driver.eyesCheck(`${language} - resend Email Successfully sent`, Target.window());
            await (await regainScreen.dialogCloseBtn).click();
            await (await regainScreen.doneBtn).click();
            await loginScreen.waitForIsShown(true);
            await driver.eyesCheck(`${language} - Moved From Email screen to login screen`, Target.window());
        });
    });
});