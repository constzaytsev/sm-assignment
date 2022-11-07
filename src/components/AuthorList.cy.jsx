import { usePostsStore } from "../store/posts";
import AuthorList from "./AuthorList";

import { posts } from "../fakes/posts";

usePostsStore.setState({ posts });

describe("<AuthorList>", () => {
  it("should have correct number of elements", () => {
    cy.mount(<AuthorList />);
    cy.get(".authorListItems").find(".authorListItem").should("have.length", 4);
  });

  it("search works", () => {
    cy.mount(<AuthorList />);
    cy.get("input").type("Macie");
    cy.get(".authorListItem").should("have.length", 1);
    cy.get(".authorListItemName").should("have.text", "Macie Mckamey");
  });
});
