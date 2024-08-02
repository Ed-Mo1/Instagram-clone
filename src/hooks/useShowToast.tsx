import { useToast } from "@chakra-ui/react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = ({
    title,
    message,
    status,
  }: {
    title: string;
    message?: string;
    status: "info" | "warning" | "success" | "error" | "loading";
  }): void => {
    toast({
      title,
      description: message,
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  return showToast;
};

export default useShowToast;
