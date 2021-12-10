/// <reference types="cypress" />

import CreateUserPage from "../../support/pages/createUserPage";
import { checkNewUser } from "../../support/helpers/helpers";

describe("create user check", () => {
  beforeEach(() => {
    cy.visit("/");
    CreateUserPage.startBtn.click();
    CreateUserPage.forgotPasswordBtn.click();
  });

  it("should successfuly add a new user", () => {
    checkNewUser(
      `automation_wonka-test+${Date.now()}@indykite.com`,
      "a password",
      "a password",
      "",
      true,
    );
  });

  it("should throw an existing username alert", () => {
    checkNewUser("wonka-test@indykite.com", "a password", "a password", "already exist", false);
  });

  it("should throw an invalid email alert", () => {
    checkNewUser(`1234`, "a password", "a password", "valid email", false);
  });

  it("should throw an inconsistent password alert", () => {
    checkNewUser(
      "wonka-test@indykite.com",
      "a password",
      "a different password",
      "confirmation failed",
      false,
    );
  });

  it("should show a blank username alert", () => {
    checkNewUser("", "a password", "a password", "username", false);
  });

  it("should show a blank password1 alert", () => {
    checkNewUser(
      "wonka-test@indykite.com",
      "a different password",
      "",
      "confirmation failed",
      false,
    );
  });

  it("should show a blank password2 alert", () => {
    checkNewUser("wonka-test@indykite.com", "", "a password", "confirmation failed.", false);
  });

  it("should go back to the homepage", () => {
    CreateUserPage.alreadyHaveAccountBtn.click();
    cy.url().should("contain", "/login");
  });
});
