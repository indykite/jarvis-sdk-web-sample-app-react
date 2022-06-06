import StartPage from "../../support/pages/startPage";

describe("homepage check", () => {
  beforeEach(() => {
    cy.visit("/");
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
