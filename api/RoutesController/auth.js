import bcrypt from "bcryptjs"
import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";
import JWT from "jsonwebtoken";
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) return next(errorMessage(400, "此帳號或信箱已被註冊"));

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        return res.status(201).json({ message: "註冊成功", user: savedUser });

    } catch (error) {
        return next(errorMessage(500, "註冊失敗", error));
    }
};


export const login = async (req, res, next) => {
    const loginData = req.body;
    try {
        const userData = await User.findOne({ username: loginData.account }) ||
                         await User.findOne({ email: loginData.account });
        if (!userData) return next(errorMessage(404, "沒有此使用者"));

        const isPasswordCorrect = await bcrypt.compare(loginData.password, userData.password);
        if (!isPasswordCorrect) return next(errorMessage(404, "輸入密碼錯誤"));

        // 產生 JWT Token
        const token = JWT.sign(
            { id: userData._id, isAdmin: userData.isAdmin },
            process.env.JWT
        );

        res.cookie('JWT_token', token, { httpOnly: true });

        // **✅ 這裡回傳 JSON，而不是字串**
        res.status(200).json({
            message: `${userData.username}登入成功`,
            user: {
                id: userData._id,
                username: userData.username,
                email: userData.email,
                isAdmin: userData.isAdmin
            }
        });
    } catch (error) {
        next(errorMessage(500, "登入失敗", error));
    }
};
