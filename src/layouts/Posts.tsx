import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsStore } from "../store/posts";
import PostList from "../components/PostList";
import AuthorList from "../components/AuthorList";

export default function Posts() {
  const [pageNum, setPageNum] = useState(1); // 0 & 1 pages have the same value in API
  const navigate = useNavigate();
  const { fillPosts, removeAllPosts } = usePostsStore((state) => ({
    fillPosts: state.fillPosts,
    removeAllPosts: state.removeAllPosts,
  }));

  useEffect(() => {
    removeAllPosts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fillPosts(pageNum);
    };

    fetchData().catch((error) => {
      if (error instanceof Error) {
        if (error.message === "Login issue") {
          navigate("/login");
        }
      }
    });
  }, [pageNum]);

  return (
    <div className="container">
      <AuthorList />
      <PostList onNextPage={() => setPageNum((page) => page + 1)} />
    </div>
  );
}
