import { CommonFunctions } from "../support/commonFunctions";

const commonFunctions = new CommonFunctions();
Cypress.env("dueDateS1", commonFunctions.getRandomInt(5, 30));
Cypress.env("dueDateS2", commonFunctions.getRandomInt(1, 5));
Cypress.env("dueDateS4", commonFunctions.getRandomInt(-1, -30));
export const Contextual = {
  scenario1: {
    data: {
      prepaidBalance: 2477.97,
      balanceExpiry: commonFunctions.getDueDate(Cypress.env("dueDateS1")),
      isBalanceLow: false,
      billingAddr: "200 Convention Boulevard-PR-San Juan-US-00907",
      billCategory: "Normal",
      billAutoPayDate: "2023-01-17T10:16:16.000000-04:00",
      serviceNum: "19394109670",
      displayName: "Rayappan R. Prepaid",
    },
    success: true,
    errorMsg: null,
  },
  scenario2: {
    data: {
      prepaidBalance: 2477.97,
      balanceExpiry: commonFunctions.getDueDate(Cypress.env("dueDateS2")),
      isBalanceLow: false,
      billingAddr: "200 Convention Boulevard-PR-San Juan-US-00907",
      billCategory: "Normal",
      billAutoPayDate: "2023-01-17T10:16:16.000000-04:00",
      serviceNum: "19394109670",
      displayName: "Rayappan R. Prepaid",
    },
    success: true,
    errorMsg: null,
  },
  scenario3: {
    data: {
      prepaidBalance: 2477.97,
      balanceExpiry: commonFunctions.getDueDate(0),
      isBalanceLow: false,
      billingAddr: "200 Convention Boulevard-PR-San Juan-US-00907",
      billCategory: "Normal",
      billAutoPayDate: "2023-01-17T10:16:16.000000-04:00",
      serviceNum: "19394109670",
      displayName: "Rayappan R. Prepaid",
    },
    success: true,
    errorMsg: null,
  },
  scenario4: {
    data: {
      prepaidBalance: 2477.97,
      balanceExpiry: commonFunctions.getDueDate(Cypress.env("dueDateS4")),
      isBalanceLow: false,
      billingAddr: "200 Convention Boulevard-PR-San Juan-US-00907",
      billCategory: "Normal",
      billAutoPayDate: "2023-01-17T10:16:16.000000-04:00",
      serviceNum: "19394109670",
      displayName: "Rayappan R. Prepaid",
    },
    success: true,
    errorMsg: null,
  },
  scenario5: {
  data: {
    prepaidBalance: 2477.97,
    balanceExpiry: commonFunctions.getDueDate(Cypress.env("dueDateS1")),
    isBalanceLow: false,
    billingAddr: "200 Convention Boulevard-PR-San Juan-US-00907",
    billCategory: "AUTO PAY",
    billAutoPayDate: commonFunctions.getDueDate(Cypress.env("dueDateS1")),
    serviceNum: "19394109670",
    displayName: "Rayappan R. Prepaid",
  },
  success: true,
  errorMsg: null,
}
};
