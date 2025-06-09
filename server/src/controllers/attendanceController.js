import Record from "../models/Record.js";
import User from "../models/User.js";

export const getRecords = async (req, res) => {
    try {
        const records = await Record.find();
        res.status(200).json({ records })
    } catch (error) {
        console.log("Error: Error in getRecords controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const addRecord = async (req, res) => {
    try {
        const { student, date, amTime, pmTime } = req.body;

        const newRecord = new Record({
            student,
            date,
            amTime,
            pmTime
        });

        await newRecord.save();
        res.status(200).json({ message: "Record saved successfully", newRecord });
    } catch (error) {
        console.log("Error: Error in addRecord controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateRecord = async (req, res) => {
    try {
        const { student, date, amTime, pmTime } = req.body;

        const updated = await Record.findOneAndUpdate(
            { student, date },
            { amTime, pmTime },
            { new: true }
        );

        res.status(200).json({ message: "Record updated successfully", updated });
    } catch (error) {
        console.log("Error: Error in updateRecord controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkRecord = async (req, res) => {
    try {
        const { student, date, amTime, pmTime } = req.body;

        if (!student || !date) return res.status(400).json({ message: "Student and Date field is required" })

        const existRecord = User.findOne({ student });

        if (existRecord) {
            return updateRecord(req, res);
        } else {
            return addRecord(req, res)
        }
    } catch (error) {
        console.log("Error: Error in checkRecord controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}