import StartPage from "../../support/pages/startPage";

describe("homepage check", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should check default load", () => {
    // it checks the existence of the Google btn which should always be there no matter what UI and/or language is default
    StartPage.startBtn.click();
    cy.contains("google").should("exist");
  });

  it("should load build-in UI homepage", () => {
    StartPage.builtInBtn.click();
    StartPage.startBtn.click();
    StartPage.builtInUIPage.should("exist");
  });

  it("should load custom UI homepage", () => {
    StartPage.customUIBtn.click();
    StartPage.startBtn.click();
    StartPage.customUIPage.should("exist");
  });
});
