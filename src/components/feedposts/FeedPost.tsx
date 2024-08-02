import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import { PostType } from "../../types/postType";
import useGetUserProfileById from "../../hooks/useGetUser";
import { UserType } from "../../types/userType";
const FeedPost = ({ post }: { post: PostType }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  if (!userProfile) return;
  return (
    <>
      <PostHeader userProfile={userProfile as UserType}  createdAt={post.createdAt}/>
      <Box my={2}>
        <Image
          borderRadius={10}
          src={post.imageURL as string}
          alt="photo"
          w="100%"
        />
      </Box>
      <PostFooter
        isProfilePage={false}
        post={post}
        creatorProfile={userProfile as UserType}
      />
    </>
  );
};

export default FeedPost;
