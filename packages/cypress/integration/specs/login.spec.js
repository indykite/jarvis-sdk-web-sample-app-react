/// <reference types="cypress" />
import LoginPage from "../../support/pages/loginPage.js";
import { checkLogin } from "../../support/helpers/helpers";

describe("login", () => {
  beforeEach(() => {
    // this helps with your viewport :-) https://whatismyviewport.com/
    cy.viewport(924, 1059); //half of my screen
    cy.visit("http://localhost:3000");
    LoginPage.getStartBtn.click();
  });

  it("should correctly log in", () => {
    checkLogin(
      "martin.minasjan@profiq.com",
      "letmein",
      true,
      "http://localhost:3000/authenticated",
      "",
    );
  });

  it("should throw a wrong password alert", () => {
    checkLogin(
      "martin.minasjan@profiq.com",
      "doNOTletmein",
      false,
      "",
      "unknown username or password",
    );
  });

  it("should show a blank input alert", () => {
    checkLogin("", "", false, "", "'username' must be a non blank string");
  });

  it("should show a blank password alert", () => {
    checkLogin("martíenk", "", false, "", "'password' must be a non blank string");
  });

  it("should show a blank username alert", () => {
    checkLogin("", "letmein?", false, "", "'username' must be a non blank string");
  });
});
