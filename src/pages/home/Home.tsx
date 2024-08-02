import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/feedposts/FeedPosts";
import SuggestedUsers from "../../components/suggestedUsers/SuggestedUsers";
// import SuggestedUsers from "../../components/suggestedUsers/SuggestedUsers";

const Home = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={{ md: 5, lg: 10 }} justifyContent={"center"}>
        {/* feed posts */}
        <Box flex={{ md: 3, lg: 2 }} py={10}>
          <FeedPosts />
        </Box>
        {/* suggestions */}
        <Box
          flex={3}
          position={"sticky"}
          top={0}
          mr={{ lg: 20 }}
          maxW={"300px"}
          h={"fit-content"}
          display={{ base: "none", md: "block" }}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
