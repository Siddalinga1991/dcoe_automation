import AppScreen from "./app.screen";
import HomeScreen from "./home.screen";
import { ChainablePromiseElement } from "webdriverio";
import * as EC from "wdio-wait-for";
import { Eyes } from "@applitools/eyes-webdriverio";

class LoginScreen extends AppScreen {
  constructor() {
    super("com.myliberty.care:id/action_bar_root")};
  get languageBtn() {return $('android=new UiSelector().resourceId("lla-language-switch")')};
  get emailField() {return $('android=new UiSelector().resourceId("lla-enter-email")')};
  get passwordField() {return $('android=new UiSelector().resourceId("lla-enter-password")')};
  get logInBtn() {return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View[5]/android.view.View/android.view.View[2]/android.widget.Button")};
  get cantLoginBtn() {return $('android=new UiSelector().resourceId("lla-cannot-login-text")')};
  get createAccountBtn() {return $('//android.view.View[@content-desc="Create one" or @content-desc="Crea una"]')};
  get tryAgainBtn() {return $('android=new UiSelector().resourceId("lla-error-button")')};
  get termsConditionsBtn() {return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View/android.widget.Button")}
  get chevronToggle() {return $('android=new UiSelector().resourceId("lla-chevron-toggle")')};
  get closeIconBtn() {return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[2]/android.view.View")}
  get eyeIconBtn() {return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View[3]/android.view.View[2]/android.view.View")}
  get errorTitle() {return $('android=new UiSelector().resourceId("lla-error-title")')};
  async waitForLoginButton() {
    await (<any>await this.logInBtn).waitForDisplayed();
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login({ email, password, success}: { email: string; password: string; success: boolean }) {
    await (await this.emailField).click();
    if (!success) {
      await (await this.emailField).clearValue();
    }
    await (await this.emailField).setValue(email);
    await this.passwordField.click();
    if (!success) {
      await (await this.passwordField).clearValue();
    }
    await (await this.passwordField).setValue(password);
    await driver.hideKeyboard();
    if (success) {
      await (await this.logInBtn).click();
    }

    let elementDisplayed = await (await this.termsConditionsBtn).isDisplayed();
    if (elementDisplayed) {
      await(await this.chevronToggle).click();
      await(await this.termsConditionsBtn).click();
    }
    return new HomeScreen();
  }


  async tapOnLanguageButton() {
    await this.languageBtn.click();
  }

  private async tapOnElement(
    targetElement: ChainablePromiseElement<WebdriverIO.Element>
  ) {
    var tapX =
      (await targetElement.getLocation("x")) +
      (await targetElement.getSize("width")) / 2;
    var tapY =
      (await targetElement.getLocation("y")) +
      (await targetElement.getSize("height")) / 2;

    // simple touch action on element
    await browser.touchAction({
      action: "tap",
      x: tapX,
      y: tapY,
    });
  }
}

export default LoginScreen;
