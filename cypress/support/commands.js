Cypress.Commands.add("getGifs", () => {

  cy.intercept(
    "GET",
    "https://api.giphy.com/v1/gifs/search*",
    { fixture: "gifs.json" }
  ).as("fetchGifs");

  cy.wait("@fetchGifs").its("response.body")
    .then(({ data }) => {
      cy.get("[data-test-id='gif-card']")
        .should("have.length", data.length);

      data.forEach(({ title }) => {
        cy.contains("[data-test-id='gif-card']", title);
      });
    });

});