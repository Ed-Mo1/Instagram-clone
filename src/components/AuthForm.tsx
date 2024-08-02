import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import instaLogo from "../../public/logo.png";
import { useState } from "react";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import GoogleAuth from "../pages/auth/GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const changeIsLogin = (): void => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <Box border={"1px solid gray"} my={4} padding={5} borderRadius={5}>
        <VStack spacing={4}>
          <Image src={instaLogo} alt="logo" cursor={"pointer"} />
          {isLogin ? <Login /> : <Signup />}

          <Flex
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
            mt={4}
            w={"100%"}
          >
            <Box h={"1px"} flex={2} bg={"gray.300"} />
            <Text fontSize={14}>OR</Text>
            <Box h={"1px"} flex={2} bg={"gray.300"} />
          </Flex>
          <GoogleAuth />
        </VStack>
      </Box>
      <Box border={"1px solid gray"} padding={5} borderRadius={5}>
        <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
          <Box fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            color={"blue.500"}
            cursor={"pointer"}
            onClick={changeIsLogin}
            fontSize={14}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
