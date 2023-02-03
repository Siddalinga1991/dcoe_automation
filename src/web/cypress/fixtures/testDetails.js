import { CommonFunctions } from "../support/commonFunctions";
const dayjs = require("dayjs");
let commonFunctions = new CommonFunctions();
export const phoneNumberDetails = {
  active: "7874014561",
  cancel: "7874014554",
  suspended: "7874014557",
  shortNumber: commonFunctions.randomAlphaNumericStr("NUMERIC", 5),
  simactivationPhoneNumber: "7872398034",
  last4Digits: "1234",
};
export const creditCardDetails = {
  cardNumber: "4111111111111111",
  expirationDate: dayjs().format("MM/YY"),
  cvv: "201",
};

export const revoveryEmailWithMobile = {
  mobileNumber: "7874032331",
  mobilePin: '1234',
  accountNumber:'8211990010042364',
  ssnNumber: '0013',
  invalidEmail:'Random123@mailinator.com',
  validEmail:'happypath@mailinator.com',
  passwordUsed : 'We@123'
};
