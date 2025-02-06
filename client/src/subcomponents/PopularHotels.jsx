import React from 'react'
import { Link } from 'react-router-dom'
import "./popularHotels.scss"
const PopularHotels = ({ dataArray }) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return <div className="popularHotels">目前沒有熱門飯店資訊</div>;
    }

    return (
        <div className='popularHotels'>
            {dataArray.map((item, index) => (
                <Link to={`/hotels/${item._id}`} style={{ textDecoration: "none", color: "inherit" }} key={index}>
                    <div className="item">
                        <img src={item.photos?.[0] || "/placeholder.jpg"} alt={item.name || "飯店圖片"} />
                        <div className="itemInfo">
                            <div className="title">{item.name || "未提供名稱"}</div>
                            <div className="subTitle">{item.city || "未提供城市"}</div>
                            <div className="price">TWD {item.cheapestPrice?.toLocaleString() || "N/A"} 起</div>
                            <div className="rate">
                                <button>{item.rating ?? "N/A"}</button>
                                <span>{item.rating >= 9.5 ? "好極了" : "傑出"}</span>
                                <p>{item.comments?.toLocaleString() || "0"} 則評論</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};


export default PopularHotels