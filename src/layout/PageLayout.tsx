import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/fire-base";
const PageLayout = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <PageLayoutSpinner />;
  return (
    <Flex>
      {user && (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      )}
      <Box flex={1}>
        {!user && <Navbar />}
        <Outlet />
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Flex>
  );
};
