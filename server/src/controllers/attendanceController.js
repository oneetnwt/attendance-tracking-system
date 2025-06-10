import Record from "../models/Record.js";
import User from "../models/User.js";

export const getRecords = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999
    );

    const records = await Record.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("studentId", "studentId firstname lastname position profile");

    if (!records || records.length === 0) {
      return res.status(200).json({
        message: "No attendance records found for today",
        data: [],
      });
    }

    res.status(200).json({
      message: "Today's attendance records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error in getRecords controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addRecord = async (req, res) => {
  try {
    const { studentId, date, amTime, pmTime } = req.body;

    // Validate required fields
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const user = await User.findOne({ studentId });

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newRecord = new Record({
      studentId: user._id, // Use the ObjectId from the user document
      date: date || new Date(),
      amTime,
      pmTime,
    });

    await newRecord.save();

    console.log("New record created:", newRecord);
    res.status(201).json({
      message: "Record saved successfully",
      record: newRecord,
    });
  } catch (error) {
    console.error("Error in addRecord controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { studentId, amTime, pmTime } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const user = await User.findOne({ studentId });

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Create date range for today
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999
    );

    const updateData = {};
    if (amTime !== undefined) updateData.amTime = amTime;
    if (pmTime !== undefined) updateData.pmTime = pmTime;

    const updated = await Record.findOneAndUpdate(
      {
        studentId: user._id,
        date: { $gte: startOfDay, $lte: endOfDay },
      },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No record found to update for today" });
    }

    console.log("Record updated:", updated);
    res.status(200).json({
      message: "Record updated successfully",
      record: updated,
    });
  } catch (error) {
    console.error("Error in updateRecord controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkRecord = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID is required",
      });
    }

    const now = new Date();
    const isAM = now.getHours() < 12;

    // Find the user first
    const user = await User.findOne({ studentId });

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Use provided date or default to today
    const recordDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(
      recordDate.getFullYear(),
      recordDate.getMonth(),
      recordDate.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDay = new Date(
      recordDate.getFullYear(),
      recordDate.getMonth(),
      recordDate.getDate(),
      23,
      59,
      59,
      999
    );

    // Check if record exists for the specified date
    const existingRecord = await Record.findOne({
      studentId: user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    // Prepare the time data
    const timeData = {
      studentId,
      date: recordDate,
      ...(isAM ? { amTime: now } : { pmTime: now }),
    };

    if (existingRecord) {
      // Check if the time slot is already recorded
      if (isAM && existingRecord.amTime) {
        return res.status(400).json({
          message: "AM Time In has already been recorded for this date",
        });
      }

      if (!isAM && existingRecord.pmTime) {
        return res.status(400).json({
          message: "PM Time In has already been recorded for this date",
        });
      }

      // Update existing record
      req.body = { ...req.body, ...timeData };
      return updateRecord(req, res);
    } else {
      // Create new record
      req.body = { ...req.body, ...timeData };
      return addRecord(req, res);
    }
  } catch (error) {
    console.error("Error in checkRecord controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentRecords = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const user = await User.findOne({ studentId });

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Build date filter
    const dateFilter = { studentId: user._id };

    if (startDate || endDate) {
      dateFilter.date = {};
      if (startDate) dateFilter.date.$gte = new Date(startDate);
      if (endDate) dateFilter.date.$lte = new Date(endDate);
    }

    const records = await Record.find(dateFilter)
      .sort({ date: -1 })
      .populate("studentId", "studentId name");

    res.status(200).json({ records });
  } catch (error) {
    console.error("Error in getStudentRecords controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
