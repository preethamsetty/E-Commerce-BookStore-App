import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  filePath: string
): Promise<UploadApiResponse> => {
  return cloudinary.uploader.upload(filePath, {
    folder: 'profile_pictures',
    resource_type: 'image',
  });
};

export default cloudinary;

