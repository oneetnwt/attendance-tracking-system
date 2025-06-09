import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './db/connectDB.js';
import attendanceRoute from './routes/attendanceRoute.js'

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api', attendanceRoute);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
    connectDB();
})