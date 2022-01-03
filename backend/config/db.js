import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb is connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
  }
};

export default connectDatabase;
