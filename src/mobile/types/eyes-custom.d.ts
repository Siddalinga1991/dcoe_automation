import { CheckSettings } from "@applitools/eyes-webdriverio";

declare namespace WebdriverIO {
    // adding command to `browser`
    export interface Browser {
        eyesAnalyzeAllResults(): void;
    }
}