import React, { useState } from "react";
import { LoginInfo } from "./Login";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { LuEye } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import useSignupWithEmailAndPassword from "../../hooks/useSignupWithEmailAndPassword";

interface SignupInfo extends LoginInfo {
  confirmPassword: string;
  username: string;
  fullName: string;
}
const Signup = () => {

  const { loading, signup } = useSignupWithEmailAndPassword();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [info, setInfo] = React.useState<SignupInfo>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
  });

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Input
        onChange={handelChange}
        type="text"
        placeholder="User name"
        name="username"
        value={info.username}
        size={"sm"}
        fontSize={14}
      />
      <Input
        onChange={handelChange}
        type="text"
        placeholder="Full name"
        name="fullName"
        value={info.fullName}
        size={"sm"}
        fontSize={14}
      />
      <Input
        onChange={handelChange}
        type="email"
        placeholder="Email"
        name="email"
        value={info.email}
        size={"sm"}
        fontSize={14}
      />
      <Input
        onChange={handelChange}
        type="password"
        name="password"
        value={info.password}
        placeholder="Password"
        size={"sm"}
        fontSize={14}
      />
      <InputGroup>
        <Input
          onChange={handelChange}
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={info.confirmPassword}
          placeholder="Confirm Password"
          size={"sm"}
          fontSize={14}
        />
        <InputRightElement h={"full"}>
          <Button
            fontSize={"18px"}
            padding={0}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            variant={"ghost"}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            color={"gray.500"}
          >
            {showPassword ? <LuEye /> : <FaEyeSlash />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        onClick={async () => {
          try {
            await signup(info);
          } catch (err) {
            console.log(err);
          }
        }}
        isLoading={loading}
        width={"100%"}
        colorScheme="blue"
        fontSize={14}
        size={"sm"}
      >
        Sign up
      </Button>
    </>
  );
};

export default Signup;
