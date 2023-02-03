import { join } from 'path';

import config from './wdio.shared.local.appium.conf';

config.specs = ['apps/clients/care-e2e/src/tests/specs/**/*.spec.ts'];
config.capabilities = [
  {
    platformName: 'iOS',
    maxInstances: 1,
    'appium:deviceName': 'iPhone 13',
    'appium:platformVersion': '15.4',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    'appium:app': join(process.cwd(), 'appPath'),
    'appium:newCommandTimeout': 240,
  },
];
exports.config = config;
