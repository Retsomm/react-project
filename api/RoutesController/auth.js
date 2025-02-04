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


//account number 張號可以輸入 信箱與使用者姓名
export const login = async (req,res,next)=>{
    const loginData = req.body
    try{
    const userData =  await User.findOne({username:loginData.account}) || await User.findOne({email:loginData.account});
    if(!userData)return(next(errorMessage(404,"沒有此使用者")))
    const isPasswordCorrect = await bcrypt.compare(loginData.password,userData.password)
    if(!isPasswordCorrect)return(next(errorMessage(404, "輸入密碼錯誤")))
    //這邊雖然知道是密碼錯誤、但也可以輸入為 "輸入帳號密碼錯誤" 來防止有心人破解密碼
    //  現在要來處理登入以後產生一個專屬於這個用戶的TOKEN憑證jwt
    const token = JWT.sign({
        id:userData._id, 
        isAdmin: userData.isAdmin},process.env.JWT) //process.env.JWT
    res.cookie('JWT_token',token,{
        httpOnly: true
    })
    res.status(200).json(`${userData.username}登入成功`)
    }catch(error)
    {
        next(errorMessage(500, "登入失敗",error))
    }
}


// export const register =(req,res,next)=>{
//     const registerData = req.body
//     try{
//         const salt = bcrypt.genSaltSync(10);
//         //所以我們會單獨利用到password分離並加密
//         const hash = bcrypt.hashSync(registerData.password, salt);
//         //原本是與創建hotel的資料一樣
//         const newUser = new User({ //這邊在合併
//             username: registerData.username,
//             email: registerData.email,
//             password: hash,
//         }
//         )
//         const saveUser = await newUser.save();
//         //但這邊要分離處理來保護我們的使用者資料 
//         res.status(200).json("註冊成功"+saveUser)
       
//     }catch(error)
//     {
//         next(errorMessage(500, "註冊失敗",error))
//     }
// }

// export const login =(req,res,next)=>{
//     const loginData = req.body
//     try{
//    const userData =  await User.findOne(loginData.username)|| User.findOne(loginData.email);
//     if(!userData){return next(errorMessage(500, "找不到此用戶",error))}
//     const isPasswordCorrect = await bcrypt.compare(loginData.password,userData.password)
//     if(!isPasswordCorrect){return next(errorMessage(500, "輸入密碼錯誤",error))}
//     //這邊雖然知道是密碼錯誤、但也可以輸入為 "輸入帳號密碼錯誤" 來防止有心人破解密碼
//     res.status(200).json(`${loginData.username}登入成功`)
//     }catch(error)
//     {
//         next(errorMessage(500, "登入失敗",error))
//     }
// }