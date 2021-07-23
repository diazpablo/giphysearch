const testTextToSearch = "the office";

describe("user searches via input", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("input#search").type(testTextToSearch, { delay: 0 });
    cy.intercept("GET", "https://api.giphy.com/v1/gifs/search*",
      { fixture: "gifs.json" }
    ).as("fetchGifs");
  });

  it("loading appear and dissappear on searching", () => {
    cy.get("[data-test-id='loading']").should("exist");
    cy.get("[data-test-id='loading']").should("not.exist");
  });

  it("user can search gifs via input", () => {
    cy.wait("@fetchGifs").its("response.body")
      .then(({ data }) => {
        cy.get("[data-test-id='gif-card']")
          .should("have.length", data.length);

        data.forEach(({ title }) => {
          cy.contains("[data-test-id='gif-card']", title);
        });
      });
  });

  it("is able to change page and pageSize", () => {
    cy.get("[data-test-id='next-page']").click();
    cy.location("search").should("contain", "page=2");

    cy.get("[data-test-id='prev-page']").click();
    cy.location("search").should("contain", "page=1");

    cy.get("select").select("25");
    cy.location("search").should("contain", "pageSize=25");
  });

});
