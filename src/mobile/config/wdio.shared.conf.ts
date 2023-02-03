const allure = require('allure-commandline');
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
import {Eyes, Target, BatchInfo, EyesRunner, ClassicRunner, Configuration} from '@applitools/eyes-webdriverio'
let runner:EyesRunner = new ClassicRunner();
let eyes:Eyes;
let batch:BatchInfo;
export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: [],
  capabilities: [],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 45000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [[TimelineService]],
  framework: 'mocha',
  reporters: [
    'spec',['allure', {
      outputDir: 'reports/mobile/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      issueLinkTemplate: "https://lla-io.atlassian.net/browse/{}",
      tmsLinkTemplate: "https://lla-io.atlassian.net/browse/{}",
  }],
  ['timeline', { outputDir: './reports/mobile/timelineReport' }]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * 60 * 1000, // 3min
  },
  afterTest: async function (_step:any, _scenario: any, { error, passed }: any) {
    if (error || passed) {
      await browser.takeScreenshot();
    }
    
  },
};
