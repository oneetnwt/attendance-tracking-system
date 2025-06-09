import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: true
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
    qrCode: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User