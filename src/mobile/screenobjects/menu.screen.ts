export default class MenuScreen {
    get logoutBtn(){ return $('//android.view.View[@content-desc="Logout" or @content-desc="Salir"]/android.view.View')};
    get myaccountsLink(){return $('//android.view.View[@content-desc="My Accounts" or @content-desc="Mis Cuentas"]')};
    get supportChevronBtn(){return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.widget.ListView/android.view.View[3]/android.view.View[2]')};
    get settingsBtn(){ return $('//android.view.View[@content-desc="Settings" or @content-desc="Configuración"]/android.widget.TextView')};
    get contactUsLink(){return $('//android.view.View[@content-desc="Centro de contactos" or @content-desc="Contact Center"]/android.widget.TextView')};
    get contactUsSalesLink(){ return $('//android.view.View[@content-desc="Ventas +1 787 355 6565" or @content-desc="Sales +1 787 355 6565"]/android.view.View')};
    get supportChatLink(){ return $('//android.view.View[@content-desc="Chat de soporte" or @content-desc="Support Chat"]/android.widget.TextView')};
    get termsConditionsBtn(){return $('android=new UiSelector().resourceId("lla-open-terms")');};
    get termsConditionsLink (){return $('//android.view.View[@content-desc="Términos y Condiciones" or @content-desc="Terms & Conditions"]/android.widget.TextView')};
    get termsConditionsPage(){return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.view.View[6]')};
    get speedTestLink(){ return $('//android.view.View[@content-desc="Prueba de velocidad" or @content-desc="Speed Test"]/android.widget.TextView')};
    get storeLocator(){ return $('//android.view.View[@content-desc="Localizador de tiendas" or @content-desc="Store Locator"]/android.widget.TextView')};
    get deleteAccount(){ return $('//android.view.View[@content-desc="Borrar mi cuenta digital" or @content-desc="Delete your account"]/android.widget.TextView')};
    get speedTestContinueBtn(){ return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.app.Dialog/android.view.View[2]/android.view.View/android.view.View[4]/android.view.View/android.widget.Button')};
    get storeLocatorpage(){return $('//android.view.View[@content-desc="10km"]/android.widget.TextView[1]')};
    get connectionErrorPage(){ return $('android=new UiSelector().resourceId("global-connection-error")')};
    get deleteAccountPageTitle(){ return $('android=new UiSelector().resourceId("lla-page-name")')};
    get deleteAccountPasswordField(){return $('android=new UiSelector().resourceId("lla-password-input")');};
    get deleteAccountCheckbox(){ return $('android=new UiSelector().resourceId("lla-on-check-box-change")');};
    get deleteAccountFinalPageTitle(){return $('android=new UiSelector().resourceId("lla-error-subtitle")')};
    get deleteAccountTitle(){return $('android=new UiSelector().resourceId("lla-error-title")')};
    get deleteAccountDoneBtn(){return $('android=new UiSelector().resourceId("lla-error-button")')};
    get deleteAccountTryAgainBtn(){ return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View/android.view.View[4]/android.view.View/android.widget.Button')};

}