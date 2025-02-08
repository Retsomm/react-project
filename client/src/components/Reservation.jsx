import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import React from 'react'
import { useContext } from 'react'
import { OptionsContext } from '../context/OptionsContext'
import useFetch from '../hooks/useFetch'
import "./reservation.scss"
const Reservation = ({ openSetting, hotelid,DatesLength }) => {
    const { data, loading, error } = useFetch(`/rooms/findHotel/${hotelid}`)
    const {date,options} = useContext(OptionsContext)
    return (
        <div className='Reservation'>
            <div className="container">
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
                                                <input type="checkbox" value={item._id} />
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
            </div>
        </div >
    )
}

export default Reservation

