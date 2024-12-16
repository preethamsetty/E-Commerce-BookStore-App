import { Document } from 'mongoose';

export interface IBook extends Document {
  _id: string | number;
  bookName: string;
  author: string;
  imgUrl: string;
  quantity: number;
  price: number;
  description: string;
  discountPrice: number;
  adminId: string | number; // References the User model
}
