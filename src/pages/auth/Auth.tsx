import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import authImg from "../../../public/auth.png";
import AuthForm from "../../components/AuthForm";
import playstoreImg from "../../../public/playstore.png";
import applestoreImg from "../../../public/microsoft.png";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useRedux";
const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  useLayoutEffect(() => {
    if (user) {
      navigate("/Instagram-clone/", { replace: true });
    }
  }, [user]);
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxWidth={"container.md"}>
        <Flex gap={10} justifyContent={"center"} align={"center"}>
          <Box display={{ base: "none", md: "block" }}>
            <Image src={authImg} maxW={400} alt="photo" />
          </Box>

          <VStack spacing={1} alignItems={"stretch"}>
            <AuthForm />
            <Box textTransform={"capitalize"} my={1} textAlign={"center"}>
              {" "}
              get app
            </Box>
            <Flex wrap={"wrap"} gap={5} justifyContent={"center"}>
              <Image src={playstoreImg} h={10} alt="photo" />
              <Image src={applestoreImg} h={10} alt="photo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Auth;
