import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

export interface LoginInfo {
  email: string;
  password: string;
}
const Login = () => {
  const { loading, login } = useLogin();
  const [info, setInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Input
        onChange={handelChange}
        type="email"
        placeholder="Email"
        name="email"
        value={info.email}
        fontSize={14}
      />
      <Input
        onChange={handelChange}
        type="password"
        name="password"
        value={info.password}
        placeholder="Password"
        fontSize={14}
      />

      <Button
        isLoading={loading}
        onClick={async () => login(info)}
        bg={"blue.500"}
        _hover={{ bg: "blue.600" }}
        width={"100%"}
        colorScheme="blue"
        fontSize={14}
        size={"sm"}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
