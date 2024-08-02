import {
  Container,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileTabs from "../../components/profile/ProfileTabs";
import { Link as RouterLink, useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { UserType } from "../../types/userType";
import { useAppSelector } from "../../hooks/useRedux";
import ProfilePosts from "../../components/profile/ProfilePsots";
const Profile = () => {
  const { username } = useParams();
  const { loading } = useProfile(username as string);
  const { profile } = useAppSelector((state) => state.profile);

  if (!loading && !profile) return <UserNotFound />;
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
        pl={{ base: 4, md: 10 }}
      >
        {!loading && profile && (
          <ProfileHeader currentUser={profile as UserType} />
        )}
        {loading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={4}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        py={10}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        <ProfileTabs />
        <ProfilePosts/>
      </Flex>
    </Container>
  );
};

export default Profile;

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};
