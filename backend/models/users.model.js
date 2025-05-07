import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows this field to be unique while some users may not have it
      },
      facebookId: {
        type: String,
        unique: true,
        sparse: true,
      },

},{timestamps: true})
const User = mongoose.model('User', userSchema);

export default User;