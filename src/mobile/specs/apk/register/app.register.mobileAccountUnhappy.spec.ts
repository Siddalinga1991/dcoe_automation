import { Target } from "@applitools/eyes-webdriverio";
import LoginScreen from "../../../screenobjects/login.screen";
import { RegisterScreen } from "../../../screenobjects/register.screen";
import allureReporter from "@wdio/allure-reporter";
import { accountDetails } from "../../../fixtures/testDataDetails";
import { CommonMethods } from '../../../support/commonMethods';

let loginScreen: LoginScreen = new LoginScreen();
let registerScreen: RegisterScreen = new RegisterScreen();
let commonMethods: CommonMethods = new CommonMethods();
["English", "Spanish"].forEach((language) => {
    describe(`App - Android - Register form Mobile Account Unhappy Path (random email , invalid mobile number & invalid pin) - ${language}`, () => {
        it(`Unhappy Path - Mobile Account Invalid Phone number scenario(invalid mobile number, random email & invalid pin) - ${language}`, async () => {
            allureReporter.addLabel(
                "Registration TestCase",
                `${language} - Registration through mobile number - UnhappyPath Random credential`
            );
            await loginScreen.waitForIsShown(true);
            if (language == "English") {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await (await loginScreen.createAccountBtn).click();
            await (await registerScreen.mobileAccount).click();
            await (await registerScreen.mobileNumberField).click();
            driver.keys(accountDetails.unlinkedMobileNumber);
            await (await registerScreen.emailfield).click();
            driver.keys(commonMethods.randomEmail());
            await (await registerScreen.createAccountTitle).click();
            await driver.eyesCheck(`${language} - My register account screen continue button enabled for mobile account`, Target.window());
            await (await registerScreen.ownerShipContinueBtn).click();
            await (await registerScreen.pinNumberField).click();
            driver.keys(accountDetails.validSSN2);
            await (await registerScreen.createAccountTitle).click();
            await driver.eyesCheck(`${language} - My register account PIN number screen `, Target.window());
            await (await registerScreen.pinNumberContinueBtn).click();
            await driver.eyesCheck(`${language} -Register Create password page`, Target.window());
            await (await registerScreen.createPasswordTitle).waitForDisplayed();
            await (await registerScreen.createPasswordField).click();
            driver.keys(accountDetails.passwordForRegistration);
            driver.hideKeyboard();
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
            await (await registerScreen.errorTitle).waitForDisplayed({ timeout: 10000 });
            await driver.eyesCheck(`${language} -Phone number or Pin are not valid Error Message validation`, Target.window());
            await (await registerScreen.tryAgainBtn).click();
            await loginScreen.waitForIsShown(true);
            await driver.eyesCheck(`${language} - Navigate back to My account page`, Target.window());
        });
    

    it(`Unhappy Path - Mobile Account Registered Email scenario( registered email,invalid mobile number& invalid pin) - ${language}`, async () => {
        allureReporter.addLabel(
            "Registration TestCase",
            `${language} - Registration through mobile number - Unhappy registered email`
        );
        await loginScreen.waitForIsShown(true);
        if (language == "English") {
            await loginScreen.tapOnLanguageButton();
            await loginScreen.waitForIsShown(true);
        }
        await (await loginScreen.createAccountBtn).click();
        await (await registerScreen.mobileAccount).click();
        await (await registerScreen.mobileNumberField).click();
        driver.keys(accountDetails.unlinkedMobileNumber);
        await (await registerScreen.emailfield).click();
        driver.keys(accountDetails.registeredEmail4);
        await (await registerScreen.createAccountTitle).click();
        await driver.eyesCheck(`${language} - My register account screen continue button enabled for mobile account`, Target.window());
        await (await registerScreen.ownerShipContinueBtn).click();
        await (await registerScreen.pinNumberField).click();
        driver.keys(accountDetails.validSSN2);
        await (await registerScreen.createAccountTitle).click();
        await driver.eyesCheck(`${language} - My register account PIN number screen `, Target.window());
        await (await registerScreen.pinNumberContinueBtn).click();
        await driver.eyesCheck(`${language} -Register Create password page`, Target.window());
        await (await registerScreen.createPasswordTitle).waitForDisplayed();
        await (await registerScreen.createPasswordField).click();
        driver.keys(accountDetails.passwordForRegistration);
        driver.hideKeyboard();
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
        await (await registerScreen.errorTitle).waitForDisplayed({ timeout: 10000 });
        await driver.eyesCheck(`${language} -Email Already registered error message validation`, Target.window());
        await (await registerScreen.tryAgainBtn).click();
        await loginScreen.waitForIsShown(true);
        await driver.eyesCheck(`${language} - Navigate back to My account page`, Target.window());
    });
});

});

