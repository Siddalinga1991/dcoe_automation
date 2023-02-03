import { Target } from '@applitools/eyes-webdriverio'
import LoginScreen from "../../../screenobjects/login.screen";
import { RegisterScreen } from "../../../screenobjects/register.screen";
import { CommonMethods } from '../../../support/commonMethods'
import allureReporter from '@wdio/allure-reporter';
import { accountDetails } from '../../../fixtures/testDataDetails';
let loginScreen: LoginScreen = new LoginScreen();
let registerScreen: RegisterScreen = new RegisterScreen();
let commonMethods: CommonMethods = new CommonMethods();
['English', 'Spanish'].forEach((language) => {
    describe(`App - Android - Redidential Account Register form (valid account number, registered email & invalid ssn) - ${language}`, () => {
        it(`Unhappy Path - Residential Account Register scenario(valid account number, registered email & invalid ssn) - ${language}`, async () => {
            allureReporter.addLabel("Registration TestCase", `${language} - Registration through Residential Account -Unhappy Path Registered email`);
            allureReporter.addTestId('SDCARE-2522');
            allureReporter.addTestId('SDCARE-2523');
            allureReporter.addTestId('SDCARE-2528');
            await loginScreen.waitForIsShown(true);
            if (language == 'English') {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await (await loginScreen.createAccountBtn).click();
            await (await registerScreen.residentialAccount).click();
            await (await registerScreen.accountNumberField).click();
            driver.keys(accountDetails.validAccountNumber1);
            await (await registerScreen.hintBtn).click();
            await driver.eyesCheck(`${language} - My register account screen button enabled`, Target.window().ignoreRegion(await registerScreen.accountNumberField));
            await (await registerScreen.continueBtn).click();
            await driver.eyesCheck(`${language} - My Ownership page`, Target.window());
            await (await registerScreen.emailfield).click();
            driver.keys(accountDetails.registeredEmail4);
            await (await registerScreen.ssnField).click();
            driver.keys(commonMethods.randomAlphaNumericStr('NUMERIC', 4));
            await (await registerScreen.ssnField).click();
            driver.hideKeyboard();
            await driver.eyesCheck(`${language} - My Ownership page continue button enabled`, Target.window());
            await (await registerScreen.ownerShipContinueBtn).click();
            await driver.eyesCheck(`${language} -Register Create password page`, Target.window());
            await (await registerScreen.createPasswordTitle).waitForDisplayed();
            await (await registerScreen.createPasswordField).click();
            driver.keys('We@123');
            driver.hideKeyboard();
            await (await registerScreen.createPasswordTitle).click();
            await (await registerScreen.repeatPasswordField).click();
            driver.keys('We@123');
            driver.hideKeyboard();
            await (await registerScreen.createPasswordTitle).click();
            await (await registerScreen.termsConditionsLink).click();
            await driver.eyesCheck(`${language} -Register Terms & conditions`, Target.window());
            await (await registerScreen.dialogCloseBtn).click();
            await (await registerScreen.acceptCheckbox).click();
            await driver.eyesCheck(`${language} -After entering details in password page`, Target.window());
            await (await registerScreen.passwordContinueBtn).click();
            await (await registerScreen.errorTitle).waitForDisplayed({ timeout: 10000 });
            await driver.eyesCheck(`${language} - Email is already Registered error validation`, Target.window());
            await (await registerScreen.tryAgainBtn).click();
            await driver.eyesCheck(`${language} - Navigate back to My account page`, Target.window());
        });
    });
});