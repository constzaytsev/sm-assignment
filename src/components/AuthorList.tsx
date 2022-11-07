import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePostsStore, selectAuthors } from "../store/posts";
import AuthorListItem from "./AuthorListItem";
import Input from "./Input";
import debounce from "../utils/debounce";
import "./AuthorList.css";

export default function AuthorList() {
  const [authorSearchName, setAuthorSearchName] = useState("");
  const activeAuthorId = usePostsStore((state) => state.activeAuthorId);
  const authors = usePostsStore(
    useCallback(
      (state) => selectAuthors(state, authorSearchName),
      [authorSearchName]
    )
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    if (event.target instanceof HTMLInputElement) {
      setAuthorSearchName(event.target.value);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeAuthorId]);

  return (
    <div>
      <div className="authorList">
        <div className="authorListSearch">
          <Input
            onChange={debounce(handleChange, 20)}
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="authorListItems">
          {authors.map((author) => (
            <Link to={`/author/${author.id}`} key={author.id}>
              <AuthorListItem
                active={author.id === activeAuthorId}
                author={author}
              />
            </Link>
          ))}
          {!authors.length && authorSearchName && (
            <div className="message">No results</div>
          )}
        </div>
      </div>
    </div>
  );
}
