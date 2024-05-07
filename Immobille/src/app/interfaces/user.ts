import { Advertisement } from './advertisement'

export interface User {
  email: string;
  name: string;
  password: string;
  properties: Advertisement[];
}
