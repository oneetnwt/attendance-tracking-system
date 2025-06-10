import mongoose from 'mongoose';

const recordSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    amTime: {
        type: Date
    },
    pmTime: {
        type: Date
    }
});

const Record = mongoose.model("Record", recordSchema);

export default Record