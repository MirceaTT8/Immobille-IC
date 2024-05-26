import { Property } from './property'

export interface User {
  _id?: any;
  id?: any;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  properties: Property[];
  savedAnnouncements: Property[];
}
