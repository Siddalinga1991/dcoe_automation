import { Target } from '@applitools/eyes-webdriverio'
import LoginScreen from "../../../screenobjects/login.screen";
import { RegainAccessScreen } from "../../../screenobjects/regainAccess.screen";
import allureReporter from '@wdio/allure-reporter';
import { accountDetails } from '../../../fixtures/testDataDetails';
let loginScreen: LoginScreen = new LoginScreen();
let regainScreen: RegainAccessScreen = new RegainAccessScreen();
['English', 'Spanish'].forEach((language) => {
  describe(`App - Android -  remember email for valid account number & Valid SSN - ${language}`, () => {
    it(`Happy Path - Remember email scenario - ${language}`, async () => {
      allureReporter.addTestId('SDCARE-2574');
      allureReporter.addTestId('SDCARE-2572');
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
      driver.keys(accountDetails.validAccountNumber1);
      driver.hideKeyboard();
      //     await(await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View[5]/android.view.View[1]')).click();
      //   await driver.eyesCheck(`${language} - Account number field validation with 16 valid numbers`, Target.window());
      await (await regainScreen.ssnField).click();
      // driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 2));
      //     driver.hideKeyboard();
      //   await driver.eyesCheck(`${language} - SSN field error validation`, Target.window());
      // await( await regainScreen.ssnField).click();
      // await( await regainScreen.ssnField).clearValue();
      driver.keys(accountDetails.validSSN1);
      driver.hideKeyboard();
      await driver.eyesCheck(`${language} - SSN field validation with valid numbers`, Target.window());
      await regainScreen.waitForButtonEnabled(regainScreen.validateBtn);
      await driver.eyesCheck(`${language} - rememeber email validate button enabled`, Target.window());
      await (await regainScreen.validateBtn).click();
      await (await regainScreen.rememberEmailPopup).waitForDisplayed({ timeout: 20000 });
      await driver.eyesCheck(`${language} - remember email successfully shows the email`, Target.window());
      await (await regainScreen.goToLoginBtn).click();
      await loginScreen.waitForIsShown(true);
      await driver.eyesCheck(`${language} - Moved From Remember email screen to login screen`, Target.window());
    })



  });
});