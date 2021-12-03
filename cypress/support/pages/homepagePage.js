/// <reference types="cypress" />

export class HomepagePage {
  get startBtn() {
    return cy.get("#start-btn");
  }

  get usernameInput() {
    return cy.get("#IKUISDK-username");
  }

  get passwordInput() {
    return cy.get("#IKUISDK-password");
  }

  get loginBtn() {
    return cy.get("#IKUISDK-btn-login");
  }

  get refreshTokenBtn() {
    return cy.get("#refresh-token-btn");
  }

  get tokenField() {
    return cy.get("#token-field");
  }

  get logoutBtn() {
    return cy.get("#logout-btn");
  }
}

export default new HomepagePage();
