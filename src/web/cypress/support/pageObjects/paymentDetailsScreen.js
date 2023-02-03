import { CommonScreenObjects } from "./commonObjects";
export class PaymentDetailsScreen extends CommonScreenObjects {
   static cardHolderName = 'input#cardholder-name';
   static creditCardField = 'input#credit-card-number';
   static creditCardExpiration = 'input#expiration';
   static cvvField = 'input#cvv';
   static cardHolderIframe = '#braintree-hosted-field-cardholderName';
   static creditCareNumberIframe = '#braintree-hosted-field-number';
   static expirationDateIframe = '#braintree-hosted-field-expirationDate';
   static cvvIframe = '#braintree-hosted-field-cvv';
}