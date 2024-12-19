import { Document } from 'mongoose';

export interface IWishList extends Document {
  userId: string; 
  books: {
    bookId: string; 
    title: string;
    author: string;
    price: number;
  }[]; 
}
