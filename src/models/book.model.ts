import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const bookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    bookImage: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    admin_user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
  },
  {
    timestamps: true,
  }
);

export default model<IBook>('Book', bookSchema);
