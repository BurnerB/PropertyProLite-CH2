/* eslint-disable camelcase */
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploader = async (file) => {
  const is_image = await cloudinary.v2.uploader.upload(file.tempFilePath);
  if (!is_image) return false;
  return is_image.url;
};

export default uploader;
