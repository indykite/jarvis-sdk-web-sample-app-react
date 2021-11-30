/// <reference types="cypress" />

import CreateUserPage from "../../support/pages/createUserPage";
import ForgottenPasswordPage from "../pages/forgottenPasswordPage";
import LoginPage from "../pages/loginPage.js";

export const homepageURL = "http://localhost:3000";

/** checkNewUser
 * @email {string} your e-mail
 * @password1 {string} your password
 * @password2 {string} password confirmation
 * @alertKeyWord {string} a key word of the alert
 * @correctInput {boolean} is this input valid?
 */

export function checkNewUser(email, password1, password2, alertKeyWord, correctInput) {
  email && CreateUserPage.usernameInput.type(email);
  password1 && CreateUserPage.passwordInput.type(password1);
  password2 && CreateUserPage.confirmPasswordInput.type(password2);
  CreateUserPage.registerBtn.click();

  if (correctInput) {
    checkToken();
  } else {
    CreateUserPage.notificationText.should("exist");
    alertKeyWord && CreateUserPage.notificationText.should("contain", alertKeyWord);
    alertKeyWord && CreateUserPage.notificationText.should("have.css", "color", "rgb(255, 0, 0)"); // rgb(255,0,0) is the red color
  }
}

/** checkForgottenPasswordInput
 * @email {string} your e-mail
 * @alertKeyWord {string} a key word of the alert
 */

export function checkForgottenPasswordInput(email, alertKeyWord) {
  email && ForgottenPasswordPage.resetPasswordEmail.type(email);
  ForgottenPasswordPage.resetPasswordEmailBtn.click();
  ForgottenPasswordPage.notificationText.should("exist");
  alertKeyWord && ForgottenPasswordPage.notificationText.should("contain", alertKeyWord);
  // non blank input, the alert is green, otherwise the alert is red
  const notificationColor = email ? "rgb(182, 251, 145)" : "rgb(255, 0, 0)";
  alertKeyWord &&
    ForgottenPasswordPage.notificationText.should("have.css", "color", notificationColor);
}

/** checkLogin
 * @email {string} your e-mail
 * @password {string} your password
 * @correctlyLogged {boolean} will this configuration log you in?
 * In case we do not log in properly:
 * @alertKeyWord {string} a key word of the alert
 * @secondKeyWord {string} an optional second key word
 */

export function checkLogin(email, password, correctlyLogged, alertKeyWord, secondKeyWord) {
  email && LoginPage.usernameInput.type(email);
  password && LoginPage.passwordInput.type(password);
  LoginPage.loginBtn.click();
  correctlyLogged ? checkToken() : checkLoginAlerts(alertKeyWord, secondKeyWord);
}

function checkLoginAlerts(alertKeyWord, secondKeyWord) {
  LoginPage.notificationText.should("exist");
  alertKeyWord && LoginPage.notificationText.should("have.css", "color", "rgb(255, 0, 0)"); // rgb(255,0,0) is the red color
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
