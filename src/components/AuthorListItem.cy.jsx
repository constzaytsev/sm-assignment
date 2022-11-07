import AuthorListItem from "./AuthorListItem";

const author = {
  name: "author name",
  count: 666,
};

describe("<AuthorListItem>", () => {
  const itemSelector = ".authorListItem";
  const itemSelectorName = ".authorListItemName";
  const itemSelectorCount = ".authorListItemCount";

  it("should render name and count", () => {
    cy.mount(<AuthorListItem author={author} active={true} />);
    cy.get(itemSelectorName).should("have.text", author.name);
    cy.get(itemSelectorCount).should("have.text", author.count);
  });

  it("has `active` class", () => {
    cy.mount(<AuthorListItem author={author} active={true} />);
    cy.get(itemSelector).should("have.class", "active");
  });
});
