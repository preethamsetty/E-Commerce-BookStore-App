import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
  }
);

export default model('Cart', cartSchema);
