import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import React ,{userContext,useState}from 'react'
import { useContext } from 'react'
import { OptionsContext } from '../context/OptionsContext'
import {LoginContext} from '../context/LoginContext'
import useFetch from '../hooks/useFetch'
import "./reservation.scss"
import {motion} from "framer-motion";

const Reservation = ({ openSetting, hotelid,DatesLength }) => {
    const { data, loading, error } = useFetch(`/rooms/findHotel/${hotelid}`)
    const {date,options} = useContext(OptionsContext)
    const {user} = userContext(LoginContext)
    const [roomNumber,setRoomNumber]=useState([])
    const [orderData, setOrderData]=useState({
        userId:user._id,
        hotelId: hotelid,
        ReservationDates:[
            {
                startDate:date[0].startDate,
                endDate:date[0].endDate,
            }
        ],
        totalPrice:0,
        options:{
            adult: options.adult,
            children: options.children,
            rooms:options.room,
        }
    })
    const handleCheckBox = (e)=>{
        const roomNumberId = e.target.value
        const checked = e.target.checked
        setRoomNumber(
            checked
                ? [...roomNumber, roomNumberId]
                : roomNumber.filter((item)=> item !== roomNumberId)
        );
    }
    return (
        <div className='Reservation'>
            <motion.div className="container"
            initial={{ scale:0}}
            animate={{ scale:1}}
            transition={{
                type:"spring",
                stiffness:260,
                damping:20
            }}>
            <div className="wrapper">
                <div className="title">
                    <h2>空房情況</h2>
                    <p>{format(date[0]?.startDate, "MM/dd/yyyy")} - {format(date[0]?.endDate, "MM/dd/yyyy")} 入住 {DatesLength} 晚 </p>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={() => openSetting(false)} />
                </div>
                <div className="body">
                    <div className="roomTitle">
                        <div>客房類型</div>
                        <div>適合人數</div>
                        <div>房型今日價格</div>
                        <div>住宿總價格</div>
                        <div>選擇房型編號</div>
                    </div>
                    <div className='roomData'>
                        <div className='roomColumn'>
                        {loading && <></>}
                                {data.map((room, i) =>
                                (
                                <div className="roomInfo" key={i}>
                                     <div >
                                        {room.title}<br/><p>{room.desc}</p>
                                    </div>
                                    <div >
                                        {room.maxPeople}
                                    </div>
                                    <div >
                                        TWD {room.price}
                                    </div>

                                    <div >
                                        TWD {room.price*DatesLength}
                                    </div>

                                    <div >
                                        {room.roomNumbers?.map((item, i) => (
                                            <span key={i}>
                                                <input type="checkbox" value={item._id} onChange={(e)=>setRoomNumber(e.target.value)}/>
                                                {item.number}<br/>
                                            </span>
                                        ))}
                                    </div>
                                    </div>)
                                )}
                        </div>
                        <button className='reservationbtn'> 現在預訂</button>
                    </div>
                </div >
            </div>
            </motion.div>
        </div >
    )
}

export default Reservation

