import mongoose from "mongoose"

const connectToDatabase = async () => {
    const response = await mongoose.connect(process.env.MONGO_URI) 
    return response;
}

export default connectToDatabase;