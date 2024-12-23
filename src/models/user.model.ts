import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: '',
    },
    role:{
      type:String,
      enum: ['user', 'admin'], 
    },
    profilePicture: {
      type: String, 
      default: ''
    },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>('User', userSchema);
