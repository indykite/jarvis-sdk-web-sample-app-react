/// <reference types="cypress" />
import HomepagePage from "../../support/pages/homepagePage";

describe("login check", () => {
  beforeEach(() => {
    cy.visit("/");
    HomepagePage.startBtn.click();
    HomepagePage.usernameInput.type("wonka-cypress@indykite.com");
    HomepagePage.passwordInput.type("password123");
    HomepagePage.loginBtn.click();
  });

  it("should check refresh token ", () => {
    HomepagePage.refreshTokenBtn.click();
    HomepagePage.tokenField.should("exist");
  });

  it("should logout", () => {
    HomepagePage.logoutBtn.click();
    cy.url().should("contain", "/login");
  });
});
