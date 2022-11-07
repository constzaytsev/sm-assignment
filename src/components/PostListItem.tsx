import type { Post } from "../types/types";

type Props = {
  post: Post;
};

export default function PostListItem({ post }: Props) {
  return (
    <div className="postListItem">
      <div className="postListItemDate">
        {new Intl.DateTimeFormat("fi-FI").format(new Date(post.created_time))}
      </div>
      <div className="postListItemText">{post.message}</div>
    </div>
  );
}
