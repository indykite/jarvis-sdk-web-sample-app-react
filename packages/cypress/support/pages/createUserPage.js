/// <reference types="cypress" />

export class CreateUserPage {
  get startBtn() {
    return cy.get("#start-btn");
  }

  get forgotPasswordBtn() {
    return cy.get("#IKUISDK-btn-to-registration > a");
  }

  get usernameInput() {
    return cy.get("#IKUISDK-username");
  }

  get passwordInput() {
    return cy.get("#IKUISDK-password");
  }

  get confirmPasswordInput() {
    return cy.get("#IKUISDK-confirm-password");
  }

  get registerBtn() {
    return cy.get("#IKUISDK-btn-register");
  }

  get notificationText() {
    return cy.get("#IKUISDK-notification-text");
  }

  get alreadyHaveAccountBtn() {
    return cy.get("a");
  }
}

export default new CreateUserPage();
