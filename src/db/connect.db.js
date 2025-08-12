import mongoose from "mongoose";

const dbConnect = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTED PROPERLY");
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED: ", error);
  }
};

export default dbConnect;
