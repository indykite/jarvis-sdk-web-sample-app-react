/// <reference types="cypress" />

import CreateUserPage from "../../support/pages/createUserPage";
import { checkNewUser } from "../../support/helpers/helpers";

describe("login", () => {
  beforeEach(() => {
    cy.viewport(924, 1059); //half of my screen
    cy.visit("http://localhost:3000");
    CreateUserPage.startBtn.click();
    CreateUserPage.forgotPasswordBtn.click();
  });

  it("should throw an existing username alert", () => {
    checkNewUser(
      "martin.minasjan@profiq.com",
      "a password",
      "a password",
      "martin.minasjan@profiq.com already exist",
    );
  });

  it("should throw an inconsistent password alert", () => {
    checkNewUser(
      "martin.minasjan@profiq.com",
      "a password",
      "a different password",
      "Password confirmation failed.",
    );
  });

  it("should show a blank username alert", () => {
    checkNewUser("", "a password", "a different password", "Password confirmation failed.");
  });

  it("should show a blank password1 alert", () => {
    checkNewUser(
      "martin.minasjan@profiq.com",
      "a different password",
      "",
      "Password confirmation failed.",
    );
  });

  it("should show a blank password2 alert", () => {
    checkNewUser("martin.minasjan@profiq.com", "", "a password", "Password confirmation failed.");
  });

  it("should go back to the homepage", () => {
    CreateUserPage.alreadyHaveAccountBtn.click();
    cy.url().should("eq", "http://localhost:3000/login");
  });
});
