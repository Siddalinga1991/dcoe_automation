import { Target } from '@applitools/eyes-webdriverio'
import LoginScreen from "../../../screenobjects/login.screen";
import { RegisterScreen } from "../../../screenobjects/register.screen";
import allureReporter from '@wdio/allure-reporter';
import { accountDetails } from '../../../fixtures/testDataDetails';
let loginScreen: LoginScreen = new LoginScreen();
let registerScreen: RegisterScreen = new RegisterScreen();
['English', 'Spanish'].forEach((language) => {
    describe(`App - Android - Register form Residential Account(unused account number, unregistered email & valid ssn) - ${language}`, () => {
        it(`Happy Path - Residential Account Register scenario(valid account number, newly generated email & valid ssn) - ${language}`, async () => {
            allureReporter.addLabel("Registration TestCase", `${language} - Registration through Residential Account -Happy Path`);
            allureReporter.addTestId('SDCARE-2522');
            allureReporter.addTestId('SDCARE-2523');
            allureReporter.addTestId("SDCARE-3946");
            allureReporter.addTestId("SDCARE-3949");
            await loginScreen.waitForIsShown(true);
            if (language == 'English') {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await (await loginScreen.createAccountBtn).click();
            await (await registerScreen.residentialAccount).click();
            await (await registerScreen.accountNumberField).click();
            driver.keys(accountDetails.unlinkedAccountNumber);
            await (await registerScreen.hintBtn).click();
            await driver.eyesCheck(`${language} - My register account screen button enabled for mobile account`, Target.window().ignoreRegion(await registerScreen.accountNumberField));
            await (await registerScreen.continueBtn).click();
            await driver.eyesCheck(`${language} - My Ownership page for registering mobile account`, Target.window());
            await (await registerScreen.emailfield).click();
            driver.keys('email');
            await (await registerScreen.ssnField).click();
            driver.keys('89');
            driver.hideKeyboard();
            await driver.eyesCheck(`${language} - SSN number field and Email field error validation`, Target.window());
            await (await registerScreen.emailfield).clearValue();
            await (await registerScreen.emailfield).click();
            driver.keys(accountDetails.unlinkedEmailAddress);
            await (await registerScreen.ssnField).clearValue();
            await (await registerScreen.ssnField).click();
            driver.keys(accountDetails.unlinkedAccountSSN);
            await (await registerScreen.ssnField).click();
            driver.hideKeyboard();
            await driver.eyesCheck(`${language} - My Ownership page continue button enabled`, Target.window());
            await (await registerScreen.ownerShipContinueBtn).click();
            await driver.eyesCheck(`${language} -Register Create password page`, Target.window());
            await (await registerScreen.createPasswordTitle).waitForDisplayed();
            await (await registerScreen.createPasswordField).click();
            driver.keys(accountDetails.passwordForRegistration);
            driver.hideKeyboard();
            await (await registerScreen.createPasswordTitle).click();
            await (await registerScreen.repeatPasswordField).click();
            driver.keys(accountDetails.passwordForRegistration);
            driver.hideKeyboard();
            await (await registerScreen.createPasswordTitle).click();
            await (await registerScreen.termsConditionsLink).click();
            await driver.eyesCheck(`${language} -Register Terms & conditions`, Target.window());
            await (await registerScreen.dialogCloseBtn).click();
            await (await registerScreen.acceptCheckbox).click();
            await driver.eyesCheck(`${language} -After entering details in password page`, Target.window());
            await (await registerScreen.passwordContinueBtn).click();
            await (await registerScreen.successTitle).waitForDisplayed({ timeout: 10000 });
            await driver.eyesCheck(`${language} -Verify your email`, Target.window());
            await (await registerScreen.doneBtn).click();
            await loginScreen.waitForIsShown(true);
        });
    });
});