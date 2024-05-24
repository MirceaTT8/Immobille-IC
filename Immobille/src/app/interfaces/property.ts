import {User} from "./user";

export interface Property {
  id: string;
  type: string;
  status: string;
  title: string;
  description: string;
  price: string;
  location: string;
  imageUrl: string | null;
  images: { url: string, altText?: string }[];
  user: User["_id"];
}
