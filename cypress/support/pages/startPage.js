/// <reference types="cypress" />

export class HomepagePage {
  get startBtn() {
    return cy.get("#start-btn");
  }

  get customUIBtn() {
    return cy.get("#custom");
  }

  get builtInBtn() {
    return cy.get("#built-in");
  }

  get customUIPage() {
    return cy.get(".App > :nth-child(3)");
  }

  get builtInUIPage() {
    return cy.get("#IKUISDK-content-container > :nth-child(1)");
  }
}

export default new HomepagePage();
