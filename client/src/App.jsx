import { useState, useEffect } from "react";
import Logo from "./assets/SBOLogo.png";
import axiosInstance from "./lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [records, setRecords] = useState([]);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        now.toLocaleDateString([], {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/api/get-records");
      console.log("Records response:", response.data);
      if (response.data && response.data.data) {
        setRecords(response.data.data);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Failed to fetch records:", error);
      setError("Failed to load records");
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId.trim()) {
      toast.error("Please enter a Student ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Submit attendance record
      const response = await axiosInstance.post("/api/record", {
        studentId: studentId,
      });

      toast.success("Attendance recorded successfully!");
      setStudentId("");

      // Refresh records after successful submission
      await fetchRecords();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to record attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Not recorded";
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timeString) => {
    if (!timeString) return "";
    return new Date(timeString).toLocaleDateString();
  };

  return (
    <div className="h-screen w-full grid grid-cols-[1fr_300px] p-3 gap-3 bg-black">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="rounded-lg p-6 overflow-auto bg-gray-900/50 backdrop-blur-sm shadow-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Attendance Records
        </h2>
        {isLoading ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="border border-gray-800/50 rounded-lg p-4 bg-gray-900/30 relative overflow-hidden"
                >
                  <div className="animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-800/50"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-800/50 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-800/30">
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-gray-800/50 rounded w-1/4"></div>
                        <div className="flex items-center gap-4">
                          <div className="h-3 bg-gray-800/50 rounded w-16"></div>
                          <div className="h-3 bg-gray-800/50 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !records || records.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No records found</p>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {records.map((record, index) => (
                <div
                  key={`record-${index}`}
                  className="group border border-gray-800/50 rounded-lg p-4 bg-gray-900/30 hover:bg-gray-900/40 cursor-pointer relative overflow-hidden transition-all duration-75"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff7701]/0 via-[#ff7701]/0 to-[#ff7701]/0 group-hover:from-[#ff7701]/5 group-hover:via-[#ff7701]/5 group-hover:to-[#ff7701]/0 transition-all duration-75"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={record?.studentId?.profile || ""}
                          alt=""
                          className="w-14 h-14 rounded-full object-cover border border-gray-800/50 group-hover:border-[#ff7701]/50 transition-all duration-75"
                        />
                        <div className="absolute inset-0 rounded-full bg-[#ff7701]/0 group-hover:bg-[#ff7701]/10 transition-all duration-75"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white group-hover:text-[#ff7701] transition-colors duration-75 truncate">
                          {record?.studentId?.firstname || ""}{" "}
                          {record?.studentId?.lastname || ""}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {record?.studentId?.studentId || ""} •{" "}
                          {record?.studentId?.position || ""}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-800/30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 group-hover:text-gray-400 transition-colors duration-75">
                          {formatDate(record?.amTime || record?.pmTime)}
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                !record?.amTime
                                  ? "bg-red-400/50"
                                  : "bg-green-400/50"
                              } group-hover:scale-125 transition-transform duration-75`}
                            ></span>
                            <span className="text-xs text-gray-500">
                              Morning
                            </span>
                            <span
                              className={`${
                                !record?.amTime
                                  ? "text-red-400/70"
                                  : "text-green-400/70"
                              } group-hover:text-opacity-100 transition-colors duration-75`}
                            >
                              {formatTime(record?.amTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                !record?.pmTime
                                  ? "bg-red-400/50"
                                  : "bg-green-400/50"
                              } group-hover:scale-125 transition-transform duration-75`}
                            ></span>
                            <span className="text-xs text-gray-500">
                              Afternoon
                            </span>
                            <span
                              className={`${
                                !record?.pmTime
                                  ? "text-red-400/70"
                                  : "text-green-400/70"
                              } group-hover:text-opacity-100 transition-colors duration-75`}
                            >
                              {formatTime(record?.pmTime)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm shadow-xl border border-gray-800">
        <img src={Logo} alt="SBO Logo" className="w-full mb-4" />
        <h3 className="text-center text-2xl font-bold uppercase mt-3 text-white">
          SBO Attendance System
        </h3>
        <p className="text-center mt-2 text-lg text-gray-300">{date}</p>
        <p className="text-center text-2xl font-medium text-white mb-6">
          {time}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="studentId"
              className="block mb-2 font-medium text-white"
            >
              Student ID:
            </label>
            <input
              id="studentId"
              className="w-full border border-gray-800 rounded-lg px-4 py-3 bg-gray-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              type="password"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={loading}
              placeholder="Enter Student ID"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff7701] hover:bg-[#ff7701]/90 disabled:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg"
          >
            {loading ? "Recording..." : "Record Attendance"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg shadow-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-900/50 border border-green-500 text-green-200 rounded-lg shadow-lg">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
