import HomepagePage from "../../support/pages/homepagePage";
import { homepageURL } from "../../support/helpers/helpers";

describe("homepage check", () => {
  beforeEach(() => {
    cy.visit(homepageURL);
  });

  it("should check default load", () => {
    // it checks the existence of the Google btn
    // which should always be there no matter what UI and/or language is default
    HomepagePage.startBtn.click();
    cy.contains("google").should("exist");
  });

  it("should load build-in UI homepage", () => {
    HomepagePage.builtInBtn.click();
    HomepagePage.startBtn.click();
    HomepagePage.builtInUIPage.should("exist");
  });

  it("should load custom UI homepage", () => {
    HomepagePage.customUIBtn.click();
    HomepagePage.startBtn.click();
    HomepagePage.customUIPage.should("exist");
  });
});
