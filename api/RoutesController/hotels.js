import Hotel from "../models/Hotel.js"
import { errorMessage } from "../errorMessage.js"

export const createHotel = async(req,res,next)=>{ //新增next
    const newHotel = new Hotel(req.body) 
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        next(errorMessage(500,"資料上傳錯誤請確認格式")) //後來我們想要客製化的
    }
}
export const getHotel = async(req,res,next)=>{
    const id = req.params.id;
    next()
    try{
       const getHotel = await Hotel.findById(id)
        res.status(200).json(getHotel)
    }catch(error){
        next(errorMessage(500,"找不到資料，請檢查使否有此id",error)) //後來我們想要客製化的
    }
}
export const updatedHotel =async(req,res,next)=>{
    const id = req.params.id;
    const body = req.body
    try{
       const updatedHotel = await Hotel.findByIdAndUpdate(id,{$set:body},{new:true})
        res.status(200).json(updatedHotel)
    }catch(error){
        next(errorMessage(500,"修改失敗，請確認是否有其id與是否欄位輸入格式正確",error)) //後來我們想要客製化的
    }
}
export const deleteHotel = async(req,res,next)=>{
    const id = req.params.id;
    try{
        await Hotel.findByIdAndDelete(id)
        res.status(200).json("刪除資料成功")
    }catch(error){
        next(errorMessage(500,"刪除失敗，請確認是否有其id",error)) //後來我們想要客製化的
    }
}
export const getAllHotels = async (req, res, next) => {
    try {
        // 確保 lowestPrice 和 highestPrice 為數字
        const lowestPrice = Number(req.query.lowestPrice) || 0;
        const highestPrice = Number(req.query.highestPrice) || 9999;
        
        // 其他查詢條件
        const { popularHotel, ...withQuery } = req.query;

        // Mongoose 查詢
        const hotelsList = await Hotel.find({
            ...withQuery,
            cheapestPrice: { $gte: lowestPrice, $lte: highestPrice }
        }).limit(7);

        res.status(200).json(hotelsList);
    } catch (error) {
        next(errorMessage(500, "無法抓取所有飯店資料", error));
    }
};

export const amountOfType = async(req,res,next)=>{
    const type = req.query.type.split(",")
    try{
        const list = await Promise.all(type.map(type=>{
            return Hotel.countDocuments({type:type})
        }))
        res.status(200).json(list)
    } catch(error) {
        next(errorMessage(500,"無法抓取住宿種類",error))
    }
}
// 來統計各個cities的種類
export const amountOfCities = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch(error) {
        next(errorMessage(500,"無法統計各個城市的提供住宿的數量",error))
    }
}