import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sky2sea';
  
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000 // 3 sec timeout to detect if local mongo server is present
    });
    console.log(`[Database] Connected to MongoDB at ${mongoURI}`);
  } catch (err) {
    console.warn(`[Database] MongoDB connection to ${mongoURI} failed (${err.message}). Using resilient in-memory storage mode.`);
    // Enable fallback mode if MongoDB server is offline
    global.USE_IN_MEMORY_DB = true;
  }
};
