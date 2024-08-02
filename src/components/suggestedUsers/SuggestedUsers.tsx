import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import SuggestedUserHeader from "./SuggestedUserHeader";
import SuggestedUser from "./SuggestedUser";
import useSuggestedUsers from "../../hooks/useSuggestedUsers";

const SuggestedUsers = () => {
  const { loading, suggestedUsers } = useSuggestedUsers();
  return (
    <VStack gap={4} py={8} px={6}>
      <SuggestedUserHeader />
      <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Button
          p={0}
          bg={"transparent"}
          _hover={{ bg: "transparent", color: "gray.400" }}
          color={"blue.500"}
        >
          See all
        </Button>
      </Flex>
      <VStack gap={4} w={"full"}>
        {loading
          ? "Loading..."
          : suggestedUsers?.map((user) => (
              <SuggestedUser key={user.username} user={user} />
            ))}
      </VStack>
    </VStack>
  );
};

export default SuggestedUsers;
