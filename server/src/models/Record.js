import mongoose from 'mongoose';

const recordSchema = mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true,
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