// middleware/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // for cloudinary stream

const upload = multer({ storage });

export default upload;
