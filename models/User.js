import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    name: { 
        type: String,
        trim: true
    },
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {type: String},
    coverpic: {type: String},
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    });

// Remove duplicate index declarations since unique: true already creates indexes

 
export default mongoose.models.User || model("User", UserSchema);