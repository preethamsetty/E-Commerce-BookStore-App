import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token:string;
  role: 'user' | 'admin';
}

