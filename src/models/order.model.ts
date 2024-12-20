import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const orderSchema = new Schema(
    {
        userId: {
        type: String,
        required: true,
        },

        cart: {
            type: {
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
            }
        }   
    },
    {
        timestamps: true,
    }
);

export default model<IOrder>('Order', orderSchema);
