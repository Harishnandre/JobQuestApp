import multer from "multer";

// Set up storage in memory (or change to disk storage if you prefer)
const storage = multer.memoryStorage();

// Configure multer to handle both resume and profile photo fields
const singleUpload = multer({ storage }).fields([
  { name: "resume" },  // Handle 'resume' field
  { name: "profilePhoto" }  // Handle 'profilePhoto' field
]);

export default singleUpload;
