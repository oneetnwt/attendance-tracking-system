import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User