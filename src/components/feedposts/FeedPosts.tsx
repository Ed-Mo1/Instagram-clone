import FeedPost from "./FeedPost";
import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { loading, posts } = useGetFeedPosts();
  return (
    <Container>
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <VStack key={index} gap={2} mb={10} alignItems={"flex-start"}>
            <Flex gap={2} alignItems={"center"}>
              <SkeletonCircle size="10" />
              <VStack alignItems={"flex-start"} gap={2}>
                <Skeleton height={"10px"} width={"200px"} />
                <Skeleton height={"10px"} width={"200px"} />
              </VStack>
            </Flex>
            <Skeleton height={"500px"} width={"100%"}></Skeleton>
          </VStack>
        ))
      ) : posts.length ? (
        posts.map((post) => <FeedPost key={post.id} post={post} />)
      ) : (
        <Text fontSize={"2xl"} textAlign={"center"}>
          No posts found
        </Text>
      )}
    </Container>
  );
};

export default FeedPosts;
