const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // ✅ Capitalized

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({  // ✅ Class name correct
  cloudinary: cloudinary,
  params: {
    folder: "Wanderlust_DEV",
    allowed_formats: ["jpeg", "png", "jpg","avif"], // ✅ underscore
  },
});

module.exports = { cloudinary, storage };
