/// <reference types="cypress" />

export class LoginPage {
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

  get notificationText() {
    return cy.get("#IKUISDK-notification-text");
  }

  get tokenField() {
    return cy.get("#token-field");
  }

  get googleBtn() {
    return cy.get("#IKUISDK-btn-oidc-google");
  }

  get facebookBtn() {
    return cy.get("#IKUISDK-btn-oidc-facebook");
  }

  get microsoftBtn() {
    return cy.get("#IKUISDK-btn-oidc-microsoft");
  }

  get linkedinBtn() {
    return cy.get("#IKUISDK-btn-oidc-linkedin");
  }

  get slugworthBtn() {
    return cy.get("#IKUISDK-btn-oidc-slugworth");
  }

  get indykiteMeBtn() {
    return cy.get("#IKUISDK-btn-oidc-indykite-me");
  }
}

export default new LoginPage();
