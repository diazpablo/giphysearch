import { DEFAULT_PAGINATION } from "../../src/components/PaginatedGifs";

const testTextToSearch = "the office";

describe("user interaction", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("have correct page title", () => {
    cy.contains("Giphy Search").should("exist");
  });

  it("default pagination appears on url on init", () => {
    cy.location("search")
      .should("contain", `page=${DEFAULT_PAGINATION.page}`)
      .should("contain", `pageSize=${DEFAULT_PAGINATION.pageSize}`);
  });

  it("should show error with api error", () => {
    cy.get("input#search").type(testTextToSearch, { delay: 0 });
    cy.get("[data-test-id='loading']").should("exist");

    cy.intercept("GET", "https://api.giphy.com/v1/gifs/search*", { forceNetworkError: true });

    cy.get("[data-test-id='loading']").should("not.exist");
    cy.contains("There was a problem").should("exist");
  });
});
