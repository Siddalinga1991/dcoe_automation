export class UrlConstant{
   static POST_METHOD = 'POST';
   static GET_METHOD = 'GET';
   static UPDATE_METHOD = 'UPDATE';
   static validateNumber = '**/api/care/topup/validate-number?publicIdentifier=**';
   static marketTransaltions = '**/api/care/cms/market-translation?language=**';
   static fetchTaxes = '**/api/care/topup/fetch-taxes';
   static topUpPayment = '**/api/care/topup/payment';
   static simActivate = '**/api/care/sim-activation/activate';
   static login = '**/api/care/userinfo/login'
   static linkAccount = '**/api/care/userinfo/link-accounts';
   static enMarketTranslation = '**/api/care/cms/market-translation?language=en';
   static esMarketTranslation = '**/api/care/cms/market-translation?language=es';
   static marketconfigration = '**/api/care/cms/market-configuration';
   static fetchAccounts = '**api/care/accounts/fetch-accounts';
   static fetchAccountOverviewPrepaid = '**api/care/accounts/fetch-accountoverview-prepaid';
   static fetchAccountOverview = '**api/care/accounts/fetch-accountoverview';
   static subscription = '**api/care/subscription/all';
    static usagesapi = '**/api/care/usage/summary/liberty?publicIdentifier=19394109670&accountType=Prepaid';
}