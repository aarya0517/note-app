import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://aj:2005@cluster0.rleze3l.mongodb.net/");
        console.log("Connected to mongodd");

    }catch(err){
        console.log(err);

    }
};

export default connectToMongoDB;