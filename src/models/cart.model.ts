import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalDiscountPrice: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    books: {
      type: [
        {
          bookId: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

cartSchema.index({ userId: 1 }, { background: true });

export default model<ICart>('Cart', cartSchema);
