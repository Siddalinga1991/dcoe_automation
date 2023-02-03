import {  EyesRunner, ClassicRunner, TestResults, StepInfo } from '@applitools/eyes-webdriverio'
import { CommonScreenObjects } from '../screenobjects/common.screen';
import LoginScreen from '../screenobjects/login.screen';
import { StringOrElement } from 'wdio-wait-for/lib/src/utils/element.types';
import * as EC from 'wdio-wait-for';
let runner: EyesRunner = new ClassicRunner();
let loginScreen: LoginScreen = new LoginScreen();

export class CommonMethods {
    async formatTestResults(testResults: TestResults) {
        return `
      Test name                 : ${testResults.getName()}
      Test status               : ${testResults.getStatus()}
      URL to results            : ${testResults.getUrl()}
      Total number of steps     : ${testResults.getSteps()}
      Number of matching steps  : ${testResults.getMatches()}
      Number of visual diffs    : ${testResults.getMismatches()}
      Number of missing steps   : ${testResults.getMissing()}
      Display size              : ${testResults.getHostDisplaySize().toString()}
      Steps                     :
      ${testResults
                .getStepsInfo()
                .map(step => {
                    return `  ${step.getName()} - ${this.getStepStatus(step)}`
                })
                .join('\n\t')}`
    }

    async getStepStatus(step: StepInfo) {
        if (step.getIsDifferent()) {
            return 'Diff'
        } else if (!step.getHasBaselineImage()) {
            return 'New'
        } else if (!step.getHasCurrentImage()) {
            return 'Missing'
        } else {
            return 'Passed'
        }
    }
   
    async consolidateTestResults() {
        let summary = await runner.getAllTestResults(false);
        for (const testResultContainer of summary) {
            const testResults = testResultContainer.getTestResults()
            console.log(this.formatTestResults(testResults))
        }
    }
    randomAlphaNumericStr(format = 'ALPHANUMERIC', length = 10) {
        let result = '';
        const characters = Reflect.get(CommonScreenObjects, format + 'CHARACTERS');
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
    randomEmail() {
        return this.randomAlphaNumericStr().concat('@test.com');
    }
    async verifyIsDisplayed(element: StringOrElement) {
        await expect(<any>element).toBeDisplayed();
    }
    async waitForElement(element: StringOrElement) {
        await browser.waitUntil(EC.elementToBeSelected(element), { timeout: 10000 });
    }
    async waitForButtonEnabled(element: StringOrElement) {
        await browser.waitUntil(EC.elementToBeEnabled(element), { timeout: 10000 });
    }
    async waitForElementToDisplay(element: StringOrElement) {
        await (<any>await element).waitForDisplayed({ timeout: 60000 });
    }
    async login(loginEmailId:string, loginPassword:string,language:string, happyorUnhappy:boolean){
        await loginScreen.waitForIsShown(true);
       if(language == "English"){
        await loginScreen.tapOnLanguageButton();
        await loginScreen.waitForIsShown(true);
       }
        await loginScreen.waitForLoginButton();
        let homeScreen = await loginScreen.login({ email: loginEmailId, password: loginPassword, success: happyorUnhappy })
        await homeScreen.waitForIsShown(true);
        await homeScreen.waitForUserInfoName();
    }
}

export default CommonMethods;