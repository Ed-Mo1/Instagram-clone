import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { timeAgo } from "../../utils/timeAgo";
import { useAppSelector } from "../../hooks/useRedux";
import { PostType } from "../../types/postType";
import { timeAgo } from "../../utils/timeFun";

const Caption = ({ post }: { post: PostType }) => {
  const { profile } = useAppSelector((state) => state.profile);

  return (
    <Flex gap={4}>
      <Link to={`/Instagram-clone/${profile?.username}`}>
        <Avatar src={profile?.profilePictureUrl} size={"sm"} />
      </Link>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Link to={`/Instagram-clone/${profile?.username}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {profile?.username}
            </Text>
          </Link>
          <Text fontSize={14}>{post.caption}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {timeAgo(post?.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Caption;
