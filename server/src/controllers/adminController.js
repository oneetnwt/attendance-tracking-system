import cloudinary from "../api/cloudinary.js";
import User from "../models/User.js";

export const addUser = async (req, res) => {
    try {
        const { studentId, firstname, lastname, position, profile } = req.body;

        if (!studentId || !firstname || !lastname || !position || !profile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (studentId.length != 10) {
            return res.status(400).json({ message: "Student ID must be exact 10 numbers" });
        }

        let uploadResponse;
        try {
            uploadResponse = await cloudinary.uploader.upload(profile);
        } catch (cloudinaryError) {
            console.error("Cloudinary Error:", cloudinaryError);
            return res.status(500).json({ message: "Failed to upload profile image" });
        }

        const existingUser = await User.findOne({ studentId })

        if (existingUser) return res.status(400).json({ message: "User already exists" })

        const newUser = new User({
            studentId,
            firstname,
            lastname,
            position,
            profile: uploadResponse.secure_url
        })

        await newUser.save();
        res.status(200).json({ message: "User created successfully", newUser })
    } catch (error) {
        console.log("Error: Error in addUser controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}