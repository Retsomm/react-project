import React from 'react'
import Categories from '../subcomponents/Categories'
import PostCards from '../subcomponents/PostCards'
import PopularHotels from '../subcomponents/PopularHotels'
import { CategoriesCities, CategoriesType, PopularHotelsData} from '../data'
import "./feature.scss"
import useFetch from '../hooks/useFetch'
const Feature = () => {
    const { data = [], loading, error } = useFetch("/hotels?popularHotel=true");
    console.log(data)
    const typeUrl =`/hotels/amountoftype?type=${CategoriesType.map((type)=>type.namw)}`
    const citiesUrl = `/hotels/amountofcities?cities=${CategoriesCities.map((city)=>city.name)}`
    return (
        <div className='feature'>
            <div className="container">
                <div className="listTitle">
                    <h2>依住宿類型瀏覽</h2>
                </div>
                <div className="listItems">
                    <Categories dataArray={CategoriesType} url={typeUrl}/>
                </div>
                <div className="listItems">
                    <PostCards />
                </div>
                <div className="listTitle">
                    <h3>探索臺灣</h3>
                    <p>這些熱門目的地魅力無窮，等你來體驗！</p>
                </div>
                <div className="listItems">
                    <Categories dataArray={CategoriesCities} url={citiesUrl}/>
                </div>
                <div className="listTitle">
                    <h2>人氣民宿、公寓類型住宿</h2>
                </div>
                {error && <p className="error">載入失敗：{error}</p>}
                <div className="listItems">
                    {loading ? <p>載入中...</p> : <PopularHotels dataArray={data} />}
                </div>
            </div>
        </div>
    );
};


export default Feature