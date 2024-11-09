import multer from "multer";

// Set up storage in memory (or change to disk storage if you prefer)
const storage = multer.memoryStorage();

// Configure multer to handle both resume and profile photo fields
const upload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },  // Handle 'resume' field
  { name: "profilePhoto", maxCount: 1 }  // Handle 'profilePhoto' field
]);

export default upload;
