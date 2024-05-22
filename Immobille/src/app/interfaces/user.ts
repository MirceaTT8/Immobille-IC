import { Property } from './property'

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  properties: Property[];
  savedAnnouncements: Property[];
}
