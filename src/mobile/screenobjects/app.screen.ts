export default class AppScreen {
    private selector: string;

    constructor (selector: string) {
        var idSelector = `new UiSelector().resourceId("${selector}")`
        this.selector = idSelector;
    }

    /**
     * Wait for the login screen to be visible
     *
     * @param {boolean} isShown
     */
    async waitForIsShown (isShown = true): Promise<boolean | void> {
        return await (<any>$(`android=${this.selector}`)).waitForDisplayed({
            reverse: !isShown,
        });
    }
}
