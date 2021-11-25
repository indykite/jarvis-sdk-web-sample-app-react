/// <reference types="cypress" />

import CreateUserPage from "../../support/pages/createUserPage";
import ForgottenPasswordPage from "../pages/forgottenPasswordPage";
import LoginPage from "../pages/loginPage.js";

export function checkNewUser(email, password1, password2, alertText) {
  email && CreateUserPage.usernameInput.type(email);
  password1 && CreateUserPage.passwordInput.type(password1);
  password2 && CreateUserPage.confirmPasswordInput.type(password2);
  CreateUserPage.registerBtn.click();
  CreateUserPage.notificationText.should("exist");
  alertText && CreateUserPage.notificationText.should("have.text", alertText);
}

export function checkForgottenPasswordInput(email, alertText) {
  email && ForgottenPasswordPage.resetPasswordEmail.type(email);
  ForgottenPasswordPage.resetPasswordEmailBtn.click();
  ForgottenPasswordPage.notificationText.should("exist");
  alertText && ForgottenPasswordPage.notificationText.should("have.text", alertText);
}

export function checkLogin(email, password, correctlyLogged, URL, alertText) {
  email && LoginPage.getUsernameInput.type(email);
  password && LoginPage.getPasswordInput.type(password);
  LoginPage.getLoginBtn.click();
  if (correctlyLogged) {
    cy.url().should("eq", URL);
    LoginPage.tokenField.should("exist");
  } else {
    LoginPage.getNotificationText.should("exist");
    alertText && LoginPage.getNotificationText.should("have.text", alertText);
  }
}
