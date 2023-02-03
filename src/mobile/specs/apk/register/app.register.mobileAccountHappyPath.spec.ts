import { Target } from "@applitools/eyes-webdriverio";
import LoginScreen from "../../../screenobjects/login.screen";
import { RegisterScreen } from "../../../screenobjects/register.screen";
import allureReporter from "@wdio/allure-reporter";
import { accountDetails } from "../../../fixtures/testDataDetails";
let loginScreen: LoginScreen = new LoginScreen();
let registerScreen: RegisterScreen = new RegisterScreen();
["English","Spanish"].forEach((language) => {
    describe(`App - Android - Register form Mobile Account (newly registered email , valid mobile number & valid pin) - ${language}`, () => {
        it(`Happy Path - Mobile Account Register scenario(valid account number, newly generated email & valid pin) - ${language}`, async () => {
            allureReporter.addLabel(
                "Registration TestCase",
                `${language} - Registration through mobile number- Happy Path`
            );
            allureReporter.addTestId("SDCARE-3957");
            await loginScreen.waitForIsShown(true);
            if (language == "English") {
                await loginScreen.tapOnLanguageButton();
                await loginScreen.waitForIsShown(true);
            }
            await (await loginScreen.createAccountBtn).click();
            await (await registerScreen.mobileAccount).click();
            await (await registerScreen.mobileNumberField).click();
            await (await registerScreen.mobileNumberField).setValue('12345');
            await (await registerScreen.emailfield).click();
            await (await registerScreen.emailfield).setValue("email");
            driver.hideKeyboard();
            await driver.eyesCheck(`${language} - Phone number field and Email field error validation`, Target.window());
            await (await registerScreen.mobileNumberField).clearValue();
            await (await registerScreen.mobileNumberField).click();
            driver.keys(accountDetails.registeredMobileNo);
            await (await registerScreen.emailfield).clearValue();
            await (await registerScreen.emailfield).click();
            driver.keys(accountDetails.registeredEmail4);
            await (await registerScreen.createAccountTitle).click();
            await driver.eyesCheck(`${language} - My register account screen continue button enabled for mobile account`, Target.window());
            await (await registerScreen.ownerShipContinueBtn).click();
            await (await registerScreen.findPinBtn).click();
            await driver.eyesCheck(`${language} - Find PIN number screen `, Target.window());
            await (await registerScreen.enterPinBtn).click();
            await (await registerScreen.pinNumberField).click();
            driver.keys('12');
            await driver.hideKeyboard();
            await driver.eyesCheck(`${language} - PIN number Field error validation `, Target.window());
            await (await registerScreen.pinNumberField).clearValue();
            await (await registerScreen.pinNumberField).click();
            driver.keys(accountDetails.pinNumber);
            await (await registerScreen.createAccountTitle).click();
            await driver.eyesCheck(`${language} - My register account PIN number screen `, Target.window());
            await (await registerScreen.pinNumberContinueBtn).click();
            await driver.eyesCheck(`${language} -Register Create password page`, Target.window());
            await (await registerScreen.createPasswordTitle).waitForDisplayed();
            await (await registerScreen.createPasswordField).click();
            driver.keys('test');
            driver.hideKeyboard();
            await (await registerScreen.repeatPasswordField).click();
            driver.keys("testPASSWORD");
            await (await registerScreen.createPasswordTitle).click();
            await driver.eyesCheck(`${language} -Password Field error validation`, Target.window());
            await (await registerScreen.createPasswordField).clearValue();
            await (await registerScreen.createPasswordField).click();
            driver.keys(accountDetails.passwordForRegistration);
            driver.hideKeyboard();
            await (await registerScreen.repeatPasswordField).clearValue();
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


