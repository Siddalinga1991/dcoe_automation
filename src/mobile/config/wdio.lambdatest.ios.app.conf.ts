exports.config = {
    user: process.env.LT_USERNAME || "sathishkumar.a",
    key:process.env.LT_ACCESS_KEY ||"ZCjoIKN01Z90C87sGcbzt0ADikzHoDoja6U2JTrqIy2AaHZHEn",

    updateJob: false,
    specs: ["./src/mobile/specs/apk/login/app.login.spec.ts"], //path of your test script
    exclude: [],

    commonCapabilities: {
        build: "LCPR WebdriverIO IOS cases",
        name: "LCPR IOS cases",
        isRealMobile: true,
        app: "lt://APP10160571881668678428901699",
        autoGrantPermissions: true,
    },

    capabilities: [
        {
            deviceName: "iPhone 14 Pro",
            platformVersion: "15",
            platformName: "iOS",
        },
        {
            deviceName: "iPhone 13 Pro",
            platformVersion: "15",
            platformName: "iOS",
        },
    ],

    logLevel: "info",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    baseUrl: "",
    waitforTimeout: 20000,
    connectionRetryTimeout: 240000,
    connectionRetryCount: 3,
    path: "/wd/hub",
    hostname: "mobile-hub.lambdatest.com",
    port: 80,

    framework: "mocha",
    mochaOpts: {
        ui: "bdd",
        timeout: 20000,
    },
};

exports.config.capabilities.forEach(function (caps: { [x: string]: any; }) {
    for (var i in exports.config.commonCapabilities)
        caps[i] = caps[i] || exports.config.commonCapabilities[i];
});