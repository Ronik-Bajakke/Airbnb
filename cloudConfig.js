const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("@fluidjs/multer-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,   // fixed key name
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowed_formats: ["png", "jpg", "jpeg", "webp", "avif"], // fixed spelling
  },
});

module.exports = {
  cloudinary,
  storage,
};
