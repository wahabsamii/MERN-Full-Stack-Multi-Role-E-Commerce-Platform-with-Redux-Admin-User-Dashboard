import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email:{ type: String, required: true},
    password: {type: String, required: true},
    role: {type: String,enum:['admin', 'user'], default:'user'},
    address: {type: String, default: "No Added Yet"},
    phone:{type: String, default: '000000000'}
}, );

const User = mongoose.model("User", userSchema);
export default User;