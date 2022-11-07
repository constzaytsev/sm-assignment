import PostListItem from "./PostListItem";

const post = {
  id: "post63653841725f8_36423208",
  from_name: "Lashanda Small",
  from_id: "user_12",
  message:
    "triangle eye courtship appetite smash integration speculate essay delicate contrary contrary federation chapter situation effective environmental condition dressing deserve difficult test rough team realize benefit say run",
  type: "status",
  created_time: "2022-10-28T21:07:52+00:00",
};

describe("<PostListItem>", () => {
  const itemSelectorDate = ".postListItemDate";
  const itemSelectorText = ".postListItemText";

  it("should render date and text", () => {
    cy.mount(<PostListItem post={post} />);
    cy.get(itemSelectorDate).should(
      "have.text",
      new Intl.DateTimeFormat("fi-FI").format(new Date(post.created_time))
    );
    cy.get(itemSelectorText).should("have.text", post.message);
  });
});
