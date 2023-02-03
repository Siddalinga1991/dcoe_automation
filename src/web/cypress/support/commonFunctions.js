import { CommonScreenObjects } from "./pageObjects/commonObjects";
export class CommonFunctions {
  randomAlphaNumericStr(format = "ALPHANUMERIC", length = 12) {
    let result = "";
    const characters = Reflect.get(CommonScreenObjects, format + "CHARACTERS");
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  randomnumberFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
  getRandomInt(min, max) {
    return Cypress._.random(min, max);
  }
  getRandom(length) {
    let result = " ";
    const charactersLength = CommonScreenObjects.ALPHACHARACTERS.length;
    for (let i = 0; i < length; i++) {
      result += CommonScreenObjects.ALPHACHARACTERS.charAt(
        Math.floor(Cypress._.random(0.1, 1.0) * charactersLength)
      );
    }
    return result;
  }

  getRandomNumber(length) {
    let result = " ";
    const charactersLength = CommonScreenObjects.NUMERICCHARACTERS.length;
    for (let i = 0; i < length; i++) {
      result += CommonScreenObjects.NUMERICCHARACTERS.charAt(
        Math.floor(Cypress._.random(0.1, 1.0) * charactersLength)
      );
    }
    return result;
  }

  getAlphaNumericSpecial(length) {
    let result = " ";
    const charactersLength =
      CommonScreenObjects.ALPHANUMERICSPECIALCHARACTERS.length;
    for (let i = 0; i < length; i++) {
      result += CommonScreenObjects.ALPHANUMERICSPECIALCHARACTERS.charAt(
        Math.floor(Cypress._.random(0.1, 1.0) * charactersLength)
      );
    }
    return result;
  }
  getRandomViewPortsByCount(count = 2) {
    const randomViewPorts = [];
    for (let i = 0; i < count; i++) {
      const randomInt = this.getRandomInt(0, 1, this.getViewport().length);
      const randomViewPort = this.getViewport()[randomInt];
      randomViewPorts.push(randomViewPort);
    }
    return randomViewPorts;
  }
  getViewport() {
    return ["iphone-8", "macbook-15"];
  }
  enterInputField(input) {
    switch (input) {
      case "accountNumber":
        Cypress.env("accountNum", this.getRandomNumber(16));
        cy.get(CommonScreenObjects.numberInput).type(Cypress.env("accountNum"));
        break;
      case "ssnNumber":
        Cypress.env("ssnNum", this.getRandomNumber(4));
        cy.get(CommonScreenObjects.numberInput).type(Cypress.env("ssnNum"));
        break;
      case "phoneNumber":
        Cypress.env("phoneNum", this.getRandomNumber(10));
        cy.get(CommonScreenObjects.numberInput).type(this.getRandomNumber(10));
        break;
      case "pinNumber":
        Cypress.env("pinNum", this.getRandomNumber(4));
        cy.get(CommonScreenObjects.numberInput).type(Cypress.env("pinNum"));
        break;
      case "simNumber":
        cy.get(CommonScreenObjects.numberInput).type(this.getRandomNumber(4));
        break;
      case "randomNum":
        cy.get(CommonScreenObjects.numberInput).clear().type(this.getRandomNumber(3));
        break;
    }
  }
  replaceBRtags(text) {
    return text.replace(/<br ?\/?>/g, "");
  }
  replaceUTags(text) {
    return text.replace(/<(\/*)u[^>]*>/g, "");
  }
  replaceATags(text) {
    return text.replace(/<(\/*)a[^>]*>/g, "");
  }
  getDueDate(numOfDays) {
    const date = new Date(new Date().setDate(new Date().getDate() + numOfDays));
    return date.toISOString();
  }
  verifyButtonBGAndTextColor(
    locator,
    bgColor,
    textColor
  ) {
    cy.get(locator)
      .should('have.css', 'background-color', bgColor)
      .should('have.css', 'color', textColor);
  }
}
