export const ReservationDatesAndPrice = (startDate, endDate, hotelsPrice, roomsPrice)=>{
    const MSecond_per_day=1000*86400; // 一天的毫秒數
    const DatesLength = (Math.abs(endDate?.getTime()-startDate?.getTime())||0 )/MSecond_per_day // 顯示幾晚
    const totalHotelsPrice = DatesLength*hotelsPrice||0
    const totalRoomsPrice = DatesLength*roomsPrice||0
    return{DatesLength,totalHotelsPrice,totalRoomsPrice}
}
