import { useState, useCallback } from "react";
import { usePostsStore, selectPosts } from "../store/posts";
import PostListItem from "./PostListItem";
import Input from "./Input";
import IntersectionObsrvr from "../components/IntersectionObsrvr";
import debounce from "../utils/debounce";
import "./PostList.css";

type Props = {
  onNextPage: () => void;
};

export default function PostList({ onNextPage }: Props) {
  const [searchString, setSearchString] = useState("");
  const allPosts = usePostsStore((state) => state.posts);
  const selectedPosts = usePostsStore(
    useCallback((state) => selectPosts(state, searchString), [searchString])
  );
  const setDateSortDesc = usePostsStore((state) => state.setDateSortDesc);

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchString((event.target as HTMLInputElement).value);
  };

  return (
    <div className="postList">
      <div className="postListHeader">
        <button onClick={() => setDateSortDesc(true)}>&uarr;</button>
        <button onClick={() => setDateSortDesc(false)}>&darr;</button>
        <Input
          onChange={debounce(handleChange, 20)}
          type="text"
          placeholder="Search text"
        />
      </div>
      <div className="postListItems">
        {selectedPosts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
        {!selectedPosts.length && searchString && (
          <div className="message">No results</div>
        )}
      </div>

      {!!(selectedPosts.length && allPosts.length === selectedPosts.length) && (
        <IntersectionObsrvr onEnter={onNextPage} />
      )}
    </div>
  );
}
