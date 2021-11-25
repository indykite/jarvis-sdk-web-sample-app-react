/// <reference types="cypress" />

export class HomepagePage {
  get startBtn() {
    return cy.get("#start-btn");
  }

  get CZBtn() {
    return cy.get("#cz_lan");
  }

  get customUIBtn() {
    return cy.get("#custom");
  }

  get customUIPage() {
    return cy.get(".App > :nth-child(3)");
  }

  get buildInUIPage() {
    return cy.get("#IKUISDK-content-container > :nth-child(1)");
  }

  get passwordText() {
    return cy.get(".App > :nth-child(3) > :nth-child(3)");
  }

  get loginBtn() {
    return cy.get("#IKUISDK-btn-login");
  }
}

export default new HomepagePage();
