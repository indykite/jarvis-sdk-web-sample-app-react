/// <reference types="cypress" />

export class LoginPage {
  get getStartBtn() {
    return cy.get("#start-btn");
  }

  get getUsernameInput() {
    return cy.get("#IKUISDK-username");
  }

  get getPasswordInput() {
    return cy.get("#IKUISDK-password");
  }

  get getLoginBtn() {
    return cy.get("#IKUISDK-btn-login");
  }

  get getNotificationText() {
    return cy.get("#IKUISDK-notification-text");
  }

  get tokenField() {
    return cy.get("#token-field");
  }
}

export default new LoginPage();
