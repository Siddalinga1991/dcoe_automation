exports.config = {
    user: process.env.LT_USERNAME || "sathishkumar.a",
    key: process.env.LT_ACCESS_KEY || "ZCjoIKN01Z90C87sGcbzt0ADikzHoDoja6U2JTrqIy2AaHZHEn",

    updateJob: false,
    specs: ["./src/mobile/specs/apk/login/app.login.accesserror.spec.ts"], //path of your test script
    exclude: [],
    commonCapabilities: {
        build: "LCPR WebdriverIO Android cases",
        name: "LCPR Android cases",
        isRealMobile: true,
        app: "LCPRApp_Apk",
        autoGrantPermissions: true,
    },
    capabilities: [
        {
            platformName: "Android",
            deviceName: "Galaxy S22 Ultra 5G",
            platformVersion: "13",
        },
        {
          platformName: "Android",
          deviceName: "OnePlus 10 Pro",
          platformVersion: "12",
        },
    ],

    logLevel: "info",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    baseUrl: "",
    waitforTimeout: 60000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    path: "/wd/hub",
    // hostname: "mobile-hub.lambdatest.com",
    hostname: "mobile-hub.lambdatest.com",
    port: 80,

    framework: "mocha",
    mochaOpts: {
        ui: "bdd",
        timeout: 100000,
    },
};
exports.config.capabilities.forEach(function (caps: { [x: string]: any; }) {
    for (var i in exports.config.commonCapabilities)
        caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
