import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ➜ 解決 CORS 問題
import cookieParser from "cookie-parser";
import hotelsApiRoute from "./ApiRoutes/hotels.js";
import roomsApiRoute from "./ApiRoutes/rooms.js";
import usersApiRoute from "./ApiRoutes/users.js";
import authApiRoute from "./ApiRoutes/auth.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB", error);
        process.exit(1); // 立即終止程式，避免 API 啟動但資料庫無法使用
    }
};

// 監聽 MongoDB 連線狀態
mongoose.connection.on("connected", () => console.log("MongoDB connected!"));
mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected!"));

// 讓 Express 處理 JSON 資料
app.use(express.json());
app.use(cors()); // 允許跨域請求
app.use(cookieParser());
// API 路由
app.use("/api/v1/hotels", hotelsApiRoute);
app.use("/api/v1/rooms", roomsApiRoute);
app.use("/api/v1/users", usersApiRoute);
app.use("/api/v1/auth", authApiRoute);

// 錯誤處理中間件（修正 req, res 順序）
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "中間 ApiRoute 出錯";
    return res.status(errorStatus).json({
        status: errorStatus,
        message: errorMessage,
    });
});

// 先連接 MongoDB，然後啟動 Express 伺服器
const port = 5000;
connect().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Backend is running on port ${port}`);
    });
});
