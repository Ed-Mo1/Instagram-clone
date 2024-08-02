import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeFun";
import useFollowUser from "../../hooks/useFollowUser";
import { UserType } from "../../types/userType";
import { Link } from "react-router-dom";
const PostHeader = ({
  userProfile,
  createdAt,
}: {
  userProfile: UserType;
  createdAt: number;
}) => {
  const { isFollowing, loading, followUser } = useFollowUser(userProfile);

  return (
    <Flex alignItems={"center"} my={2} justifyContent={"space-between"}>
      <Flex gap={2} alignItems={"center"}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar src={userProfile?.profilePictureUrl} size={"sm"} />
        </Link>
        <Flex
          fontSize={12}
          alignItems={"center"}
          fontWeight={"bold"}
          gap={{ base: 1, md: 2 }}
        >
          <Link to={`/${userProfile?.username}`}>
            <Text>{userProfile?.username}</Text>
          </Link>
          <Text fontSize={{ base: "11px", md: "12px" }} color={"gray.500"}>
            {timeAgo(createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Button
        fontSize={12}
        fontWeight={"bold"}
        background={"transparent"}
        _hover={{ color: "white" }}
        color={"blue.500"}
        isLoading={loading}
        onClick={() => followUser(userProfile)}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </Flex>
  );
};

export default PostHeader;
