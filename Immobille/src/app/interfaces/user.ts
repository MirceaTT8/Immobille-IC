import { Property } from './property'
import { Review} from "./review";

export interface User {
  _id?: any;
  id?: any;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  properties: Property[];
  savedAnnouncements: Property[];
  reviews: Review[];
}
