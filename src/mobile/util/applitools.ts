import {TestResults, StepInfo } from "@applitools/eyes-webdriverio";

export function formatTestResults(testResults: TestResults) {
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
                return `  ${step.getName()} - ${getStepStatus(step)}`
            })
            .join('\n\t')}`
}

export function getStepStatus(step: StepInfo) {
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