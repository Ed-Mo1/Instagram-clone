import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/postType";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  } as { posts: PostType[] },
  reducers: {
    addPost: (state, action: PayloadAction<PostType>) => {
      state.posts = [action.payload, ...state.posts];
    },
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },

    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    addComment: (
      state,
      action: PayloadAction<{ id: string; comment: any }>
    ) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            comments: [...post.comments, action.payload.comment],
          };
        }
        return post;
      });
    },
    addLike: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            likes: [...post.likes, action.payload.userId],
          };
        }
        return post;
      });
    },
    removeLike: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            likes: post.likes.filter((like) => like !== action.payload.userId),
          };
        }
        return post;
      });
    },
  },
});

export const {
  addPost,
  setPosts,
  deletePost,
  addComment,
  addLike,
  removeLike,
} = postsSlice.actions;

export default postsSlice.reducer;
