import { v2 as cloudinary } from "cloudinary";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_SECURE,
  CLOUDINARY_API_KEY_SUB,
  CLOUDINARY_API_SECRET_SUB,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME ? CLOUDINARY_CLOUD_NAME : "david",
  api_key: CLOUDINARY_API_KEY ? CLOUDINARY_API_KEY : CLOUDINARY_API_KEY_SUB,
  api_secret: CLOUDINARY_API_SECRET
    ? CLOUDINARY_API_SECRET
    : CLOUDINARY_API_SECRET_SUB,
  secure: CLOUDINARY_SECURE ? CLOUDINARY_SECURE === "true" : true,
});

export default cloudinary;
