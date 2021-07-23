const testTextToSearch = "the office";
const testTextToSearchURLEncoded = encodeURIComponent(testTextToSearch).replace(/%20/g, "+");
const testPage = 2;
const testPageSize = 5;

describe("user sharing link interaction", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.giphy.com/v1/gifs/search*",
      { fixture: "gifs.json" }
    ).as("fetchGifs");
    cy.visit(`http://localhost:3000?page=${testPage}&pageSize=${testPageSize}&search=${testTextToSearchURLEncoded}`);
  });

  it("have correct page title", () => {
    cy.contains("Giphy Search").should("exist");
  });

  it("user can go directy to gifs via url params", () => {
     cy.get("[data-test-id='loading']").should("exist");

    cy.wait("@fetchGifs").its("response.body")
      .then(({ data }) => {
        cy.get("[data-test-id='gif-card']")
          .should("have.length", data.length);

        data.forEach(({ title }) => {
          cy.contains("[data-test-id='gif-card']", title);
        });
      });

    cy.get("[data-test-id='loading']").should("not.exist");

    cy.get("select").should("have.value", `${testPageSize}`);
    cy.get("[data-test-id='page']").should("contain.text", `${testPage}/`);
    cy.get("input#search").should("have.value", testTextToSearch);
  });

});