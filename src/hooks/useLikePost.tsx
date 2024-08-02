import { useState } from "react";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { PostType } from "../types/postType";
import { db } from "../config/fire-base";
import { addLike, removeLike } from "../store/slices/postsSlice";

const useLikePost = (post: PostType) => {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [likes, setLikes] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(post?.likes.includes(user?.id as string));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!user)
      return showToast({
        title: "Error",
        message: "Please login to like post",
        status: "error",
      });
    setIsUpdating(true);

    try {
      const postRef = doc(db, "posts", post.id as string);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.id) : arrayUnion(user.id),
      });

      setIsLiked(!isLiked);
      dispatch(
        !isLiked
          ? addLike({ postId: post.id as string, userId: user?.id })
          : removeLike({ postId: post.id as string, userId: user?.id })
      );
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as Error).message,
        status: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
