import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { UserType } from "../../types/userType";
import { db, storage } from "../../config/fire-base";
import { addPost } from "../../store/slices/postsSlice";
import { PostType } from "../../types/postType";
import { addUserPost } from "../../store/slices/userSlice";
const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile as string, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as Error).message,
        status: "error",
      });
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
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
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => (imageRef.current as HTMLInputElement).click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const dispatch = useAppDispatch();
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);
  // const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile: string, caption: string) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);
    const newPost: PostType = {
      caption: caption,
      likes: [],
      comments: [],
      imageURL: null,
      createdAt: Date.now(),
      createdBy: (user as UserType).id,
    };

    try {
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      const userDocRef = doc(collection(db, "users"), (user as UserType).id);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      await updateDoc(userDocRef, {
        posts: [
          { ...newPost, id: postDocRef.id },
          ...((user as UserType).posts as PostType[]),
        ],
      });
      dispatch(addUserPost({ ...newPost, id: postDocRef.id }));
      if ((profile as UserType).id === (user as UserType).id) {
        dispatch(addPost({ ...newPost, id: postDocRef.id }));
      }

      showToast({
        title: "Success",
        message: "Post created successfully",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        message: (error as Error).message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
