import {User} from "./user";

export interface Property {
  _id?: any;
  id?: any;
  type: string;
  status: string;
  title: string;
  cif: string;
  description: string;
  price: string;
  location: string;
  imageUrl: string | null;
  images: { url: string, altText?: string }[];
  user: User["_id"];
  userId?: string;

}
