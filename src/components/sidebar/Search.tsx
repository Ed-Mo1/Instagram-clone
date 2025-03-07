import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useEffect, useRef, useState } from "react";
import SuggestedUser from "../suggestedUsers/SuggestedUser";
const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef<HTMLInputElement>(null);
  const { getUser, loading, user, setUser } = useSearchUser();

  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    setIsSearched(false);
    setUser(null);
  }, []);
  const handleSearchUser = (e: React.FormEvent<HTMLFormElement>): void => {
    setIsSearched(false);
    setUser(null);
    e.preventDefault();
    setIsSearched(true);
    getUser((searchRef.current as HTMLInputElement).value);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="asaprogrammer" ref={searchRef} />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={loading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser onClose={onClose} user={user} />}

            {!user && isSearched && (
              <Box textAlign={"center"}>No user found</Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
