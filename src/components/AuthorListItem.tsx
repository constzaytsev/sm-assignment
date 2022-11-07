import type { AppProps } from "../types/types";

type Props = {
  author: AppProps["author"];
  active: boolean;
};

export default function AuthorListItem({ author, active }: Props) {
  return (
    <div className={`authorListItem ${active && "active"}`}>
      <div className="authorListItemName">{author.name}</div>
      <div className="authorListItemCount">{author.count}</div>
    </div>
  );
}
