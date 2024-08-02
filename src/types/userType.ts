import { PostType } from "./postType";

export type UserType = {
    id: string;
    username: string;
    fullName: string;
    email: string;
    bio: string;
    followers: UserType[];
    following: UserType[];
    posts: PostType[];
    profilePictureUrl: string;
    createdAt: number;
}