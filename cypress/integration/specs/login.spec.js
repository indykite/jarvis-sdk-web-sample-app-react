/// <reference types="cypress" />
import LoginPage from "../../support/pages/loginPage.js";
import { checkLogin } from "../../support/helpers/helpers";

describe("login check", () => {
  beforeEach(() => {
    cy.visit("/");
    LoginPage.startBtn.click();
  });

  it("should correctly log in", () => {
    checkLogin("wonka-test@indykite.com", "letmein", true, "");
  });

  it("should throw a wrong password alert", () => {
    checkLogin("wonka-test@indykite.com", "doNOTletmein", false, "username", "password");
  });

  it("should show a blank input alert", () => {
    checkLogin("", "", false, "non blank");
  });

  it("should show a blank password alert", () => {
    checkLogin("martíenk", "", false, "non blank", "password");
  });

  it("should show a blank username alert", () => {
    checkLogin("", "letmein?", false, "non blank", "username");
  });

  //check if buttons to third parties sites are on the page
  it("should check if a Google button with exists", () => {
    LoginPage.googleBtn.should("exist");
    LoginPage.googleBtn.should("have.text", "google");
  });

  it("should check if a Facebook button exists", () => {
    LoginPage.facebookBtn.should("exist");
    LoginPage.facebookBtn.should("have.text", "facebook");
  });

  it("should check if a Microsoft button exists", () => {
    LoginPage.microsoftBtn.should("exist");
    LoginPage.microsoftBtn.should("have.text", "microsoft");
  });

  it("should check if a LinkedIn button exists", () => {
    LoginPage.linkedinBtn.should("exist");
    LoginPage.linkedinBtn.should("have.text", "linkedin");
  });

  it("should check if a Slugworth button exists", () => {
    LoginPage.slugworthBtn.should("exist");
    LoginPage.slugworthBtn.should("have.text", "slugworth");
  });

  it("should check if an Indykite.me button exists", () => {
    LoginPage.indykiteMeBtn.should("exist");
    LoginPage.indykiteMeBtn.should("have.text", "indykite.me");
  });

  /* The code below can be used if to want to test logging in through a third party website. However
  1/ it is not cross browser compatible - you need to use Chrome
  2/ for it to work, you need to turn off Chromes web security model : add { "chromeWebSecurity": false } to cypress.json 
  */

  // it("should check if you can open a Facebook log-in", () => {
  //   LoginPage.facebookBtn.click();
  //   cy.url().should("contain", "facebook");
  // });

  // it("should check if you can open a Linked in log-in", () => {
  //   LoginPage.linkedinBtn.click();
  //   cy.url().should("contain", "linkedin");
  // });

  // it("should check if you can open an Indikyte.Me log-in", () => {
  //   LoginPage.indykiteMeBtn.click();
  //   cy.url().should("contain", "indykite");
  // });

  // it("should check if you can open a Google log-in", () => {
  //   LoginPage.googleBtn.click();
  //   // for some reason cypress opens the Google sign in page, but stays on localhost
  //   // if you run this test more times, it will stop working
  //   cy.contains("google").should("exist");
  // });

  // it("should check if you can open a Slugworth in log-in", () => {
  //   //this one fails - the sluggworth link does not work
  //   LoginPage.slugworthBtn.click();
  //   cy.url().should("contain", "slugworth");
  // });

  // as far as I know the Microsoft link can not be tested, because microsoft takes over cypress
  // when we click on its link, as you can see below
  // it.only("should check if you can open a Microsoft log-in", () => {
  //   LoginPage.microsoftBtn.click();
  //   cy.url().should("contain", "microsoft");
  // });
});
