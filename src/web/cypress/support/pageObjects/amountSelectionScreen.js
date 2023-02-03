import { CommonScreenObjects } from './commonObjects';
export class AmountSelectionScreen extends CommonScreenObjects{
   static amountRadioButton = '[data-cy="lla-radio-button"]';
   static continuePaymentBtn = 'button[data-cy="lla-button"]';
   static customAmount = 'div.input-box input';
   static inlineError = 'div.main-container__form__error-validation';

}