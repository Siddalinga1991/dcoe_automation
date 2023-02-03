import { config } from "./wdio.shared.conf";
import {
  Eyes,
  TestResults,
  TestResultsSummary,
  TestResultsSummaryPlain,
  StepInfo,
  Configuration,
} from "@applitools/eyes-webdriverio";
const { EyesService } = require("@applitools/eyes-webdriverio5-service");
import { randomUUID } from "crypto";
import { formatTestResults } from "../util/applitools";

config.services = (config.services ? config.services : []).concat([
  [
    "appium",
    {
      command: "appium",
      args: {
        relaxedSecurity: true,
        address: "localhost",
        log: "./appium.log",
        port: 4723,
      },
    },
  ],
]);
class AbortableEyesService extends EyesService {
  /**
   * Overridden from inherited EyesService, to allow for aborting eyes tests in error scenarios.
   *
   * Due to this override, it is recommended to explicitly call eyesGetAllTestResults()
   * or getEyes().close() in "afterTest" or "after" hook to ensure that Eyes tests sessions
   * are closed.
   */
  async afterTest() {
    console.log("AbortableEyesService - afterTest");
    this._eyes.getConfiguration().setScrollRootElement(null);
  }
  async after() {}
}

//Use derived AbortableEyesService class, so we can abort without race condition
config.services = (config.services ? config.services : []).concat([
  [
    AbortableEyesService,
    {
      // viewportSize: { width: 1200, height: 800 },
      matchLevel: "Strict",
      matchTimeout: 0,
      //dontCloseBatches: true,
      batch: {
        name: "LCPR-V1.5 - Android",
        notifyOnCompletion: true,
        id: randomUUID(),
      },
      // ...
    },
  ],
]);

config.before = async function (capabilities, specs, browser) {
  browser.addCommand("eyesAnalyzeAllResults", async () => {
    let eyes: Eyes = await driver.getEyes();
    let summary = await eyes.runner.getAllTestResults(false);
    let nonPassingCount: number = 0;
    let isEyesAborted: boolean = false;
    for (const testResultContainer of summary) {
      const testResults = testResultContainer.getTestResults();
      console.log(formatTestResults(testResults));
      if (!testResults.isPassed()) {
        nonPassingCount += 1;
      }
    }
  });
  afterEach(async function () {
    console.log("test afterEach rootHook");
    console.log(this.currentTest);
    let eyes: Eyes = await driver.getEyes();
    let eyesTestResults: TestResults;
    if (this.currentTest && this.currentTest.isFailed()) {
      eyesTestResults = await eyes.abort();
    } else {
      eyesTestResults = await eyes.close(false);
      console.log(formatTestResults(eyesTestResults));
    }
  });
};

config.beforeTest = async function (test, context) {
  await driver.launchApp();
  let eyes: Eyes = await driver.getEyes();
  let eyesConfiguration: Configuration = eyes.getConfiguration();
  await eyesConfiguration.setApiKey(
  process.env.APPLITOOLS_API_KEY ? process.env.APPLITOOLS_API_KEY : "klQtn102pgtH10785tYPjkqRNSMH106c09nwcaD0glH7PDeOg110"
  );
  await eyes.setConfiguration(eyesConfiguration);
};

config.afterTest = async function (
  test,
  context,
  { error, result, duration, passed, retries }
) {
  await driver.closeApp();
};

config.after = async function () {
  await driver.eyesAnalyzeAllResults();
};
config.port = 4723;
export default config;
