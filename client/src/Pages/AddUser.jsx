import { useState } from "react";
import Input from "../components/Input";

import Logo from "../assets/SBOLogo.png";
import axiosInstance from "../lib/axiosInstance";

function AddUser() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    profile: "",
    studentId: "",
    firstname: "",
    lastname: "",
    position: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setForm((prev) => ({ ...prev, profile: base64Image }));
    };
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/admin/add-user", form);
      setSuccess("User added successfully!");
      // Reset form
      setForm({
        profile: "",
        studentId: "",
        firstname: "",
        lastname: "",
        position: "",
      });
      setSelectedImg(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={selectedImg || Logo}
        alt=""
        className="w-32 h-32 rounded-full object-cover border-4 aspect-square"
      />
      <label
        htmlFor="profileUpload"
        className="p-[0.25em_0.5em] my-3 rounded border-1 hover:bg-white hover:text-[var(--dark-background)] text-sm transition-colors cursor-pointer"
      >
        Upload Profile
      </label>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="file"
          id="profileUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <Input
          label="Student ID:"
          type="number"
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
        />
        <Input
          label="First Name:"
          type="text"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
        />
        <Input
          label="Last Name:"
          type="text"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
        />
        <Input
          label="Position:"
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
        />

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-900/50 border border-green-500 text-green-200 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--primary-color)] w-full p-[0.25em_0.5em] rounded hover:bg-amber-500 transition-colors mt-2 disabled:bg-gray-400"
        >
          {loading ? "Adding User..." : "Add User"}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
