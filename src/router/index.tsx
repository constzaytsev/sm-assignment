import { createBrowserRouter } from "react-router-dom";
import { usePostsStore } from "../store/posts";
import Login from "../layouts/Login";
import Posts from "../layouts/Posts";
import Error from "../layouts/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
    loader: () => {
      usePostsStore.setState({ activeAuthorId: null });
    },
  },
  {
    path: "/author/:id",
    element: <Posts />,
    loader: (request) => {
      usePostsStore.setState({ activeAuthorId: request.params.id || null });
    },
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export { router };
