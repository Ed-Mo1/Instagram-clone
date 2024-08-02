import { Avatar, Flex, Link, Button } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useRedux";
import useLogout from "../../hooks/useLogout";
import { Link as RouterLink } from "react-router-dom";
const SuggestedUserHeader = () => {
  const { signoutUser, loading } = useLogout();
  const { user } = useAppSelector((state) => state.user);
  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Link as={RouterLink} to={`/Instagram-clone/${user?.username}`}>
          <Avatar src={user?.profilePictureUrl} size={"sm"} />
        </Link>
        <Link
          as={RouterLink}
          to={`/Instagram-clone/${user?.username}`}
          fontSize={12}
          fontWeight={"bold"}
        >
          {user?.username}
        </Link>
      </Flex>
      <Button
        fontSize={14}
        color={"blue.500"}
        fontWeight={"medium"}
        bg={"transparent"}
        _hover={{ bg: "transparent", color: "white" }}
        onClick={signoutUser}
        isLoading={loading}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedUserHeader;
