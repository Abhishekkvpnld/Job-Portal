import mongoose from "mongoose";


export const dbConnection = async()=>{
    try {
        await mongoose.connect("",{})
    } catch (error) {
        console.log(error);
    }
}