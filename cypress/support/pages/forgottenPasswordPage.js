/// <reference types="cypress" />

export class ForgottenPasswordPage {
  get startBtn() {
    return cy.get("#start-btn");
  }

  get forgotPasswordBtn() {
    return cy.get("#IKUISDK-btn-to-forgot-password > a");
  }

  get resetPasswordEmail() {
    return cy.get("#IKUISDK-reset-password-email");
  }

  get resetPasswordEmailBtn() {
    return cy.get("#IKUISDK-reset-password-email-btn");
  }

  get notificationText() {
    return cy.get("#IKUISDK-notification-text");
  }

  get backToLoginBtn() {
    return cy.get("#IKUISDK-btn-to-login > a");
  }
}

export default new ForgottenPasswordPage();
