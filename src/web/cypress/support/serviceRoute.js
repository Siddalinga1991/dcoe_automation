import { UrlConstant } from "./urlConstants";
const urlconstant = new UrlConstant();
export class ServiceRoute {
    loadInterceptApiCalls(){
        cy.interceptCall(UrlConstant.GET_METHOD, UrlConstant.validateNumber, 'validateNumber');
        cy.interceptCall(UrlConstant.GET_METHOD, UrlConstant.marketTransaltions, 'marketTranslations');
        cy.interceptCall(UrlConstant.POST_METHOD, UrlConstant.fetchTaxes, 'fetchTaxes');
        cy.interceptCall(UrlConstant.POST_METHOD, UrlConstant.topUpPayment, 'payment');
        cy.interceptCall(UrlConstant.POST_METHOD, UrlConstant.simActivate, 'activate');
        cy.interceptCall(UrlConstant.GET_METHOD, UrlConstant.enMarketTranslation, 'enMarketTranslations');
        cy.interceptCall(UrlConstant.GET_METHOD, UrlConstant.esMarketTranslation, 'esMarketTranslations');
        cy.interceptCall(UrlConstant.GET_METHOD, UrlConstant.marketconfigration, 'Marketconfigration');
    }
}