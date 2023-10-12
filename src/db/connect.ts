import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default connectDB;
