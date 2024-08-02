import { Avatar, Flex, Text, VStack, Button, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserType } from "../../types/userType";
import useFollowUser from "../../hooks/useFollowUser";

const SuggestedUser = ({ user }: { user: UserType }) => {
  const { followUser, isFollowing, loading } = useFollowUser(user);
  const [numFollowers, setNumFollowers] = useState<number>(
    user?.followers.length
  );
  const calcFollowers = () => {
    if (!isFollowing) {
      setNumFollowers((prev) => prev + 1);
    } else {
      setNumFollowers((prev) => prev - 1);
    }
  };

  useEffect(() => {
    return () => {
      calcFollowers();
    };
  }, [isFollowing]);

  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Link as={RouterLink} to={`/${user?.username}`}>
          <Avatar size={"md"} src={user?.profilePictureUrl} />
        </Link>
        <VStack alignItems={"flex-start"} gap={1}>
          <Link
            as={RouterLink}
            to={`/${user?.username}`}
            fontWeight={"bold"}
            fontSize={12}
          >
            {user?.username}
          </Link>
          <Text color={"gray.500"} fontSize={11}>
            {numFollowers} Followers
          </Text>
        </VStack>
      </Flex>
      <Button
        p={0}
        fontSize={13}
        isLoading={loading}
        fontWeight={"medium"}
        onClick={() => {
          followUser(user);
        }}
        bg={"transparent"}
        _hover={{ bg: "transparent", color: "white" }}
        color={"blue.500"}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
