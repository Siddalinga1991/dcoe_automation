import { defineConfig } from "cypress";
import { CommonFunctions } from "./src/web/cypress/support/commonFunctions";
const commonFunctions = new CommonFunctions();
require("dotenv").config();
export default defineConfig({
  projectId: "qnriyj",
  defaultCommandTimeout: 40000,
  chromeWebSecurity: false,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "LCPR topup Portal ",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    waitForAnimations: false,
    animationDistanceThreshold: 50,
    reportDir: "reports/web/topup",
    overwrite: true,
  },
  env: {
    environment: "SIT",
    market: "LCPR1.5_QA16",
  },
  e2e: {
    fixturesFolder: "src/web/cypress/fixtures",
    supportFile: "src/web/cypress/support/e2e.js",
    specPattern: "src/web/cypress/e2e/**/*.cy.js",
    experimentalSessionAndOrigin: true,
    experimentalRunAllSpecs : true,
    requestTimeout: 70000,
    responseTimeout: 70000,
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: "src/web/cypress/screenshots",

    setupNodeEvents(on, config) {
      const environment = config.env.environment || "DEV";
      const market = config.env.market;
      config.env = require(`./src/web/cypress/config/${environment}.json`)[
        market
      ];
      config.baseUrl = config.env.baseUrl;
      config.env.randomNumber = commonFunctions.randomAlphaNumericStr(
        "NUMERIC",
        10
      );
      config.env.randomName = commonFunctions.randomAlphaNumericStr(
        "ALPHANUMERIC",
        10
      );
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
require("@applitools/eyes-cypress")(module);
