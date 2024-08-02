import { useEffect, useState } from "react";
import { PostType } from "../types/postType";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { UserType } from "../types/userType";
import { db } from "../config/fire-base";
import { collection, getDocs, query, where } from "firebase/firestore";
import { setPosts } from "../store/slices/postsSlice";

const useGetProfilePosts = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const [loading, setLoading] = useState<boolean>(false);
  const { posts } = useAppSelector((state) => state.posts);

  const getPosts = async (): Promise<void> => {
    const userDoc = query(
      collection(db, "posts"),
      where("createdBy", "==", (profile as UserType)?.id)
    );
    setLoading(true);
    try {
      const docSnap = await getDocs(userDoc);
      if (!docSnap.empty) {
        dispatch(
          setPosts(
            docSnap.docs.map(
              (doc) => ({ ...(doc.data() as PostType), id: doc.id } as PostType)
            )
          )
        );
      }
      else {
        dispatch(setPosts([]));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [profile?.posts]);
  return { loading, posts };
};

export default useGetProfilePosts;
