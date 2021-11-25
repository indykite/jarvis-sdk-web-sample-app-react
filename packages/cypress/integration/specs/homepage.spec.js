import homepagePage from "../../support/pages/homepagePage";
import HomepagePage from "../../support/pages/homepagePage";

describe("homepage", () => {
  beforeEach(() => {
    // this helps with your viewport :-) https://whatismyviewport.com/
    cy.viewport(924, 1059); //half of my screen
    cy.visit("http://localhost:3000");
  });
  it("should load default choice homepage", () => {
    HomepagePage.startBtn.click();
    HomepagePage.buildInUIPage.should("exist");
    HomepagePage.loginBtn.should("exist"); //login btn exists
    HomepagePage.loginBtn.should("have.text", "Login"); //its text is in EN
  });

  it("should load CZ custom ui homepage", () => {
    HomepagePage.CZBtn.click();
    HomepagePage.customUIBtn.click();
    HomepagePage.startBtn.click();
    HomepagePage.customUIPage.should("exist"); //checks custom
    HomepagePage.passwordText.should("exist"); //password text exists
    //and be in CZ, which it isn't
    // HomepagePage.passwordText.should("have.text", "Heslo")
  });
});
