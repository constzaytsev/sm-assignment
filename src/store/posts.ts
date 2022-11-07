import create from "zustand";
import type { Author, Post } from "../types/types";
import { useApi } from "../utils/api";

export interface PostState {
  posts: Post[];
  dateSortDesc: boolean;
  activeAuthorId: Author["id"] | null;
  fillPosts: (pageNum: number) => void;
  setDateSortDesc: (payload: boolean) => void;
  removeAllPosts: () => void;
}

const api = useApi();

export const usePostsStore = create<PostState>((set, get) => ({
  posts: [],
  dateSortDesc: true,
  activeAuthorId: null,
  fillPosts: async (pageNum) => {
    const data = await api.fetchPostsByPage(pageNum);
    set({ posts: [...get().posts, ...data] });
  },
  removeAllPosts: () => set({ posts: [] }),
  setDateSortDesc: (payload) => set({ dateSortDesc: payload }),
}));

export const selectPosts = (
  state: PostState,
  searchString: string = ""
): Post[] =>
  state.posts
    .filter((post) =>
      state.activeAuthorId ? post.from_id === state.activeAuthorId : true
    )
    .filter((post) =>
      post.message.toUpperCase().includes(searchString.toUpperCase())
    )
    .sort((a, b) => {
      if (state.dateSortDesc) {
        return (
          new Date(b.created_time).getTime() -
          new Date(a.created_time).getTime()
        );
      } else {
        return (
          new Date(a.created_time).getTime() -
          new Date(b.created_time).getTime()
        );
      }
    });

export const selectAuthors = (
  state: PostState,
  searchString: string = ""
): Author[] =>
  state.posts
    .filter((post) =>
      post.from_name.toUpperCase().includes(searchString.toUpperCase())
    )
    .reduce((authors, post) => {
      if (!authors.includes(post.from_id)) authors.push(post.from_id);
      return authors;
    }, [] as Post["from_id"][])
    .map((id) => ({
      id,
      name:
        state.posts.find((post) => post.from_id === id && post.from_name)
          ?.from_name || "",
      count: state.posts.filter((post) => post.from_id === id).length,
    }))
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
