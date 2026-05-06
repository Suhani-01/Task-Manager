import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import dotenv from 'dotenv';

dotenv.config();  // To Load variables from .env file into process.env

const PORT = process.env.PORT || 5000;

// Initialize DB connection before starting server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});