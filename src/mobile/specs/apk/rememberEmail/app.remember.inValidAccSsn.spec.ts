import { Target } from '@applitools/eyes-webdriverio'
import LoginScreen from "../../../screenobjects/login.screen";
import { RegainAccessScreen } from "../../../screenobjects/regainAccess.screen";
import allureReporter from '@wdio/allure-reporter';
import CommonMethods from '../../../support/commonMethods';
let loginScreen: LoginScreen = new LoginScreen();
let regainScreen: RegainAccessScreen = new RegainAccessScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
    describe(`App - Android -  remember email for invalid account number & inValid SSN - ${language}`, () => {
        it(`Happy Path - Remember email scenario error validation - ${language}`, async () => {
            allureReporter.addTestId('SDCARE-2573');
            await loginScreen.waitForIsShown(true);
            if (language == 'English') {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await loginScreen.cantLoginBtn.click();
            await driver.eyesCheck(`${language} - regain access page`, Target.window())
            await (await regainScreen.rememberEmail).click();
            await driver.eyesCheck(`${language} - Remember email page`, Target.window());
            await (await regainScreen.accountNumberField).click();
            //     driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 5));
            //     driver.hideKeyboard();
            //   await driver.eyesCheck(`${language} - Account number field error validation`, Target.window());
            // await (await regainScreen.accountNumberField).click();
            // await (await regainScreen.accountNumberField).clearValue();
            driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 16));
            driver.hideKeyboard();
            //     await(await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View[5]/android.view.View[1]')).click();
            //   await driver.eyesCheck(`${language} - Account number field validation with 16 valid numbers`, Target.window());
            await (await regainScreen.ssnField).click();
            // driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 2));
            //     driver.hideKeyboard();
            //   await driver.eyesCheck(`${language} - SSN field error validation`, Target.window());
            // await( await regainScreen.ssnField).click();
            // await( await regainScreen.ssnField).clearValue();
            driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 4));
            driver.hideKeyboard();
            await driver.eyesCheck(`${language} - SSN field validation with invalid numbers`, Target.window());
            await regainScreen.waitForButtonEnabled(regainScreen.validateBtn);
            await driver.eyesCheck(`${language} - rememeber email validate button enabled`, Target.window());
            await (await regainScreen.validateBtn).click();
            await (await regainScreen.errorTitle).waitForDisplayed({ timeout: 20000 });
            await driver.eyesCheck(`${language} - remember email combination error screen `, Target.window());
            await (await regainScreen.tryAgainEmailBtn).click();
            await loginScreen.waitForIsShown(true);
            await driver.eyesCheck(`${language} - Page should go to remember email screen`, Target.window());
        })

        it(`email field & ssn field inline error validations - ${language}`, async () => {
            await loginScreen.waitForIsShown(true);
            if (language == 'English') {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await loginScreen.cantLoginBtn.click();
            await (await regainScreen.rememberEmail).click();
            await (await regainScreen.accountNumberField).click();
            driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 5));
            driver.hideKeyboard();
            await (await regainScreen.ssnField).click();
            driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 2));
            driver.hideKeyboard();
            await driver.eyesCheck(`${language} - Account number & SSN field error validation`, Target.window());
        })
    });
});