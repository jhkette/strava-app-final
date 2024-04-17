beforeEach(() => {
  cy.visit("http://159.65.83.17");
});

// nb these tests run against a local site -
// it logins in to strava via the site 
// then navigates around sites
// checking for elements
it("should be able to login", () => { 

  // go to login button
  cy.get(".p-8.opacity-70.rounded-md.bg-blue-100 > button")
    .contains("Authorise")
    .click();
  cy.origin("https://www.strava.com", () => { // login in to strava
    cy.get("#email").click().type("jkette01@student.bbk.ac.uk", { delay: 100 });
    cy.get("#password").click().type("test1234", { delay: 100 });
    cy.get("#login-button").click();
  });
  cy.url().should("include", "159.65.83.17");
  cy.get("h1").should(($h1) => {
    // make sure the first contains some text content
    expect($h1.first()).to.contain("Calender");
  });

  cy.get("nav").contains("Cycling").click();
  cy.url().should("include", "/cycling");
  cy.get('.min-h-screen')
  .find('canvas')
 

  cy.get("nav").contains("Running").click();
  cy.get('.min-h-screen')
  .find('canvas')
  cy.url().should("include", "/running");
});
