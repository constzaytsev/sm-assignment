export type Post = {
  id: string;
  created_time: string;
  from_id: string;
  from_name: string;
  message: string;
  type: string;
};

export type Author = {
  id: Post["from_id"];
  name: Post["from_name"];
  count: number;
};

export type AppProps = {
  post: Post;
  posts: Post[];
  author: Author;
  authors: Author[];
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
