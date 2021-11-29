/// <reference types="cypress" />

import CreateUserPage from "../../support/pages/createUserPage";
import { checkNewUser, homepageURL } from "../../support/helpers/helpers";

describe("create user check", () => {
  beforeEach(() => {
    cy.viewport(924, 1059);
    cy.visit(homepageURL);
    CreateUserPage.startBtn.click();
    CreateUserPage.forgotPasswordBtn.click();
  });

  /** checkNewUser
   * @email {string} your e-mail
   * @password1 {string} your password
   * @password2 {string} password confirmation
   * @alertKeyWord {string} a key word of the alert
   * @correctInput {boolean} is this input valid?
   */

  it("should successfuly add a new user", () => {
    checkNewUser(`${Date.now()}@seznam.cz`, "a password", "a password", "", true);
  });

  it("should throw an existing username alert", () => {
    checkNewUser(
      "martin.minasjan@profiq.com",
      "a password",
      "a password",
      "already exist",
      false,
    );
  });

  it("should throw an invalid email alert", () => {
    checkNewUser(`1234`, "a password", "a password", "valid email", false);
  });

  it("should throw an inconsistent password alert", () => {
    checkNewUser(
      "martin.minasjan@profiq.com",
      "a password",
      "a different password",
      "confirmation failed",
      false,
    );
  });

  it("should show a blank username alert", () => {
    checkNewUser("", "a password", "a different password", "confirmation failed", false);
  });

  it("should show a blank password1 alert", () => {
    checkNewUser(
      "martin.minasjan@profiq.com",
      "a different password",
      "",
      "confirmation failed",
      false,
    );
  });

  it("should show a blank password2 alert", () => {
    checkNewUser("martin.minasjan@profiq.com", "", "a password", "confirmation failed.", false);
  });

  it("should go back to the homepage", () => {
    CreateUserPage.alreadyHaveAccountBtn.click();
    cy.url().should("contain", "/login");
  });
});
