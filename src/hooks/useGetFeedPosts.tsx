import { useEffect, useState } from "react";
import { useAppSelector } from "./useRedux";
import { useAppDispatch } from "./useRedux";
import { setPosts } from "../store/slices/postsSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/fire-base";
import { PostType } from "../types/postType";
import useShowToast from "./useShowToast";
const useGetFeedPosts = () => {
  const showToast = useShowToast();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const getPosts = async (): Promise<void> => {
    try {
      const q = query(
        collection(db, "posts"),
        where("createdBy", "!=", user?.id)
      );
      const postsDocRef = await getDocs(q);

      if (!postsDocRef.empty) {
        const postsData = postsDocRef.docs
          .map((doc) => ({ ...doc.data() as PostType, id: doc.id }))
          .sort((a, b) => b.createdAt - a.createdAt);

        dispatch(setPosts(postsData as PostType[]));
      } else {
        dispatch(setPosts([]));
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as Error).message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return { loading, posts };
};

export default useGetFeedPosts;
