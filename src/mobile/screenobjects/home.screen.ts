import AppScreen from './app.screen';

class HomeScreen extends AppScreen {
    constructor () {
        super('com.myliberty.care:id/action_bar_root');
    }
    get outageAlert(){ return $('android=new UiSelector().resourceId("lla-outage-information-alert")')}
    get alertCloseBtn() {return $('//android.view.View[@content-desc=""]/android.widget.TextView')};
    get payBillBtn(){return $('android=new UiSelector().resourceId("lla-on-pay-bill-button")')}
    get billHistoryBtn(){return $('android=new UiSelector().resourceId("lla-bill-history-button")')}
    get hamburgerMenuBtn() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View')};
    get accountDropDown(){ return $('android=new UiSelector().resourceId("lla-overview-dropdown")')};
    get rechargeBtn(){ return $('//android.view.View[@content-desc="Recharge" or @content-desc="Recargar"]')};
    get chevronBtn(){return $('android=new UiSelector().resourceId("lla-chevron-icon")')};
    get residentialAccount(){return $('//android.view.View[@content-desc="Cuenta Residencial Residencial u oficina" or @content-desc="Residential Account Residential or office"]')};
    get myActiveTitle(){return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View[1]/android.view.View/android.widget.TextView')};
    get homeServicesBtn(){return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.app.Dialog/android.view.View[2]/android.view.View[3]/android.view.View[1]/android.view.View/android.widget.TabWidget/android.view.View[2]")}
    get mobileServicesBtn(){return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.app.Dialog/android.view.View[2]/android.view.View[3]/android.view.View[1]/android.view.View/android.widget.TabWidget/android.view.View[1]')};
    get prepaidAccountBtn() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.app.Dialog/android.view.View[2]/android.view.View[3]/android.view.View[2]/android.view.View[1]/android.view.View/android.view.View/android.view.View/android.widget.ToggleButton[1]')};
    get fixedAccount(){return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.app.Dialog/android.view.View[2]/android.view.View[3]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.widget.ToggleButton')};
    get servicesTab(){return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.app.Dialog/android.view.View[2]/android.view.View[3]/android.view.View[1]/android.view.View/android.widget.TabWidget/android.view.View[2]')};
    get selectAccount(){return $('//android.view.View[@content-desc="Add an Account" or @content-desc="Agregar Cuenta"]/android.widget.TextView')};
    get autoPayAccount(){ return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.app.Dialog/android.view.View[2]/android.view.View[3]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.widget.ToggleButton[2]')};
    get billHistoryMoreDetailsBtn(){ return $('android=new UiSelector().resourceId("lla-description-button")')}
    get quickAccessHomeBtn(){ return $('//android.view.View[@content-desc="Home" or @content-desc="Inicio"]')}
    get userInfo() {return $('android=new UiSelector().resourceId("lla-user-info-name")')}
    get quickAccessPayBillBtn(){ return $('//android.view.View[@content-desc="Pay Bill" or @content-desc="Pagar"]/android.widget.TextView')};
    get quickAccessBillHistoryBtn(){ return $('//android.view.View[@content-desc="Bill History" or @content-desc="Historial"]/android.widget.TextView')};
    get backButton(){return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View[1]/android.view.View/android.widget.Button')};
    get backBtnSimScreen() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.view.View[1]') }
    get activateSimBtn() { return $('//android.view.View[@content-desc="Activate SIM" or @content-desc="Activar SIM"]') }
  get rechargeThirdParty() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View[9]/android.view.View/android.widget.Button') }
    get phoneNumberField() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.view.View[5]/android.view.View[2]/android.view.View[2]/android.view.View') }
    get selectAccountTitle() { return $('android=new UiSelector().resourceId("lla-select-account-text")') }
    get accountInfo() { return $('android=new UiSelector().resourceId("lla-account-name")') }
    get activateSimPhoneNum() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View[4]/android.view.View[3]/android.view.View/android.widget.EditText')}
    
    
    async switchToPrepaidAccount(){
    await this.waitForUserInfoName()
     let payBillBtnDisplayed = await (await this.payBillBtn).isDisplayed()
      if (payBillBtnDisplayed) {
        await(await this.chevronBtn).click();
        await(await this.mobileServicesBtn).click();
        await(await this.prepaidAccountBtn).click();
        await this.waitForRechargeButton();
        expect(this.rechargeBtn).toBeDisplayed();
      }
      else{
        await this.waitForRechargeButton();
        expect(this.rechargeBtn).toBeDisplayed();
      }
    
  } 
    
    async waitForPayBillButton(){
        await (<any>await this.payBillBtn).waitForDisplayed({timeout: 60000});
    }
    async waitForUserInfoName(){
        await (<any>await this.userInfo).waitForDisplayed({timeout: 60000});
    }

    async waitForRechargeButton(){
        await (<any>await this.rechargeBtn).waitForDisplayed({timeout: 60000});
    }

    async waitForBillHistoryButton(){
        await (<any>await this.billHistoryBtn).waitForDisplayed();
    }
    async handleOutageAlert(){
      let outageAlertDisplayed = await (await this.outageAlert).isDisplayed();
      if (outageAlertDisplayed) {
        await(await this.alertCloseBtn).click();
      }
    }
}

export default HomeScreen;