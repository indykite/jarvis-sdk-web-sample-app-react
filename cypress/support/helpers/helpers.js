/// <reference types="cypress" />

import CreateUserPage from "../../support/pages/createUserPage";
import ForgottenPasswordPage from "../pages/forgottenPasswordPage";
import LoginPage from "../pages/loginPage.js";

export const homepageURL = "http://localhost:3000";

export function checkNewUser(email, password1, password2, alertKeyWord, correctInput) {
  email && CreateUserPage.usernameInput.type(email);
  password1 && CreateUserPage.passwordInput.type(password1);
  password2 && CreateUserPage.confirmPasswordInput.type(password2);
  CreateUserPage.registerBtn.click();

  if (!correctInput) {
    CreateUserPage.notificationText.should("exist");
    alertKeyWord && CreateUserPage.notificationText.should("contain", alertKeyWord);
    // rgb(255,0,0) is the red color
    alertKeyWord && CreateUserPage.notificationText.should("have.css", "color", "rgb(255, 0, 0)");
  } else {
    checkToken();
  }
}

export function checkForgottenPasswordInput(email, alertKeyWord) {
  email && ForgottenPasswordPage.resetPasswordEmail.type(email);
  ForgottenPasswordPage.resetPasswordEmailBtn.click();
  ForgottenPasswordPage.notificationText.should("exist");
  alertKeyWord && ForgottenPasswordPage.notificationText.should("contain", alertKeyWord);
  // non blank input, the alert is green
  // otherwise the alert is red
  if (email) {
    alertKeyWord &&
      ForgottenPasswordPage.notificationText.should("have.css", "color", "rgb(182, 251, 145)");
  } else {
    alertKeyWord &&
      ForgottenPasswordPage.notificationText.should("have.css", "color", "rgb(255, 0, 0)");
  }
}

export function checkLogin(email, password, correctlyLogged, alertKeyWord, secondKeyWord) {
  email && LoginPage.usernameInput.type(email);
  password && LoginPage.passwordInput.type(password);
  LoginPage.loginBtn.click();
  if (correctlyLogged) {
    checkToken();
  } else {
    checkLoginAlerts(alertKeyWord, secondKeyWord);
  }
}

function checkLoginAlerts(alertKeyWord, secondKeyWord) {
  LoginPage.notificationText.should("exist");
  // rgb(255,0,0) is the red color
  alertKeyWord && LoginPage.notificationText.should("have.css", "color", "rgb(255, 0, 0)");
  // checks one or two keywords
  if (secondKeyWord) {
    alertKeyWord &&
      LoginPage.notificationText.should("contain", alertKeyWord).and("contain", secondKeyWord);
  } else {
    alertKeyWord && LoginPage.notificationText.should("contain", alertKeyWord);
  }
}

function checkToken() {
  cy.url().should("contain", "/authenticated");
  LoginPage.tokenField.should("exist");
}
