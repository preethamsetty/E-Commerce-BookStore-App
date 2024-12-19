import { Schema, model } from 'mongoose';
import { IWishList } from '../interfaces/wishlist.interface';

const wishListSchema = new Schema(
  {
    userId: {
      type:String,
      required: true,
      ref: 'User',
    },
    books: {
      type: [
        {
          bookId: {
            type: String,
            ref: 'Book', 
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          author: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [], 
    },
  },
  {
    timestamps: true, 
  }
);

export default model<IWishList>('WishList', wishListSchema);
