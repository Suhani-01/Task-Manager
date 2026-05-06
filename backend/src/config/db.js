import mongoose from 'mongoose';
/**
 * Establishes connection to MongoDB using URI from environment variables.
 */
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ DB Error:', error.message);
        process.exit(1); // Exits process (stops server) on failure to prevent running without a database.
    }
};