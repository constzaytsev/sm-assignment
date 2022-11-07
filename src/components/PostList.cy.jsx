import { usePostsStore } from "../store/posts";
import PostList from "./PostList";

import { posts } from "../fakes/posts";

usePostsStore.setState({ posts });

describe("<PostList>", () => {
  it("should call next page", () => {
    const onNextPageSpy = cy.spy().as("onNextPageSpy");
    cy.mount(<PostList onNextPage={onNextPageSpy} />);
    cy.scrollTo("bottom");
    cy.get("@onNextPageSpy").should("have.been.called");
  });

  it("should NOT call next page", () => {
    const onNextPageSpy = cy.spy().as("onNextPageSpy");
    cy.mount(<PostList onNextPage={onNextPageSpy} />);
    cy.get("input").type("not existing text");
    cy.get("@onNextPageSpy").should("have.not.been.called");
  });

  it("should sord desc", () => {
    cy.mount(<PostList onNextPage={() => {}} />);
    cy.get(".postListItemDate").eq(0).should("have.text", "29.11.2022");
    cy.get(".postListItemDate").eq(1).should("have.text", "29.10.2022");
    cy.get(".postListItemDate").eq(2).should("have.text", "29.10.2022");
    cy.get(".postListItemDate").eq(3).should("have.text", "20.10.2022");
  });

  it("should sord asc", () => {
    cy.mount(<PostList onNextPage={() => {}} />);
    cy.get("button").eq(1).click();
    cy.get(".postListItemDate").eq(3).should("have.text", "29.11.2022");
    cy.get(".postListItemDate").eq(2).should("have.text", "29.10.2022");
    cy.get(".postListItemDate").eq(1).should("have.text", "29.10.2022");
    cy.get(".postListItemDate").eq(0).should("have.text", "20.10.2022");
  });
});
