export interface PostType {
  caption: string;
  likes: string[];
  id?: string;
  comments: any[];
  createdAt: number;
  imageURL: string | null;
  createdBy: string;
}
