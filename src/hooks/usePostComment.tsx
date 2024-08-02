import { useState } from "react";
import useShowToast from "./useShowToast";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { db } from "../config/fire-base";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { addComment } from "../store/slices/postsSlice";
import { PostType } from "../types/postType";

const usePostComment = () => {
  const dispatch = useAppDispatch();
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const showToast = useShowToast();
  const { user } = useAppSelector((state) => state.user);

  const postComment = async (postId: string, comment: string) => {
    if (isCommenting) return;

    if (!user) throw new Error("Please login to comment");
    const postDocRef = doc(db, "posts", postId);
    const post = (await getDoc(postDocRef)).data() as PostType;
    const newComment = {
      comment,
      createdBy: user.id,
      createdAt: Date.now(),
      postId,
      id: Date.now(),
    };

    
    try {
      await updateDoc(postDocRef, {
        comments: [...post.comments, newComment],
      });

      dispatch(addComment({ id: postId, comment: newComment }));
      showToast({
        title: "Success",
        message: "Comment added successfully",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as Error).message,
        status: "error",
      });
    } finally {
      setIsCommenting(false);
    }
  };
  return { postComment, isCommenting };
};

export default usePostComment;
