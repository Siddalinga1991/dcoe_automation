import { join } from 'path';

import config from './wdio.shared.local.appium.conf';

config.specs = ['src/mobile/specs/apk/**/*.spec.ts'];
config.suites = {
  login: [
    'src/mobile/specs/apk/login/app.login.english.spec.ts',
    'src/mobile/specs/apk/login/app.login.spanish.spec.ts'
  ],
  resetPassword: [
    'src/mobile/specs/apk/resetPassword/app.resetPassword.english.spec.ts',
    'src/mobile/specs/apk/resetPassword/app.resetPassword.spanish.spec.ts',
    'src/mobile/specs/apk/resetPassword/app.resetPassword.unregemail.english.spec.ts',
    'src/mobile/specs/apk/resetPassword/app.resetPassword.unregemail.spanish.spec.ts'
  ],
  register: [
    'src/mobile/specs/apk/register/app.register.mobileAccountHappyPath.spec.ts',
    'src/mobile/specs/apk/register/app.register.mobileAccountUnhappy.spec.ts',
    'src/mobile/specs/apk/register/app.register.invalidEmailResidential.spec.ts',
    'src/mobile/specs/apk/register/app.register.randomaccountResidential.spec.ts',
    'src/mobile/specs/apk/register/app.register.regEmailResidential.spec.ts',
    'src/mobile/specs/apk/register/app.register.residentialAccountHappy.spec.ts'
  ]
}
config.capabilities = [
  {
    platformName: 'Android',
    maxInstances: 1,
    'appium:deviceName': 'one-plus-emulated',
    'appium:platformVersion': '12.0',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:app': join(
      process.cwd(),
      './src/mobile/app/android/2022-11-15-1449.apk'
    ),
    'appium:newCommandTimeout': 24000,
  },
];
exports.config = config;
