import React from 'react'
import "./categories.scss"
import useFetch from '../hooks/useFetch'
const Categories = ({dataArray,url}) => {
    const{data,loading,error}=useFetch(url)
  return (
    <div className="categories">
        {dataArray.map((item, index) => 
            <div className="item" key={index}>
                <img src={item.img} alt="" />
                <div className="itemInfo">
                    <div className="title">
                        {item.name}
                    </div>
                    <div className="desc">
                        {`${data[index]}間住宿`} 
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Categories