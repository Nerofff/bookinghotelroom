//import clsx from 'clsx';

import Styles from './SreachConteiner.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HomeService from '~/utils/HomeService';
import config from '~/config';
import ShoppingCartService from '~/utils/ShoppingCartService';

function SreachPage() {
    const [hotelList, setHotelList] = useState([]);
    const [numberHotel, setNumberHotel] = useState('');
    const start = new Date(localStorage.getItem('startDate'));
    const end = new Date(localStorage.getItem('endDate'));
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        HomeService.getAllHotelByProvinceId(id)
            .then((res) => {
                setHotelList(res.data);
                setNumberHotel(res.data.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const calculateDays = () => {
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    const handleClick = (id1) => {
        const sodem = Math.floor(parseFloat(calculateDays()));
        console.log(sodem);
        ShoppingCartService.clearCart(sodem)
            .then(
                (res) => {
                    if (res.data === 'clear success') {
                        navigate(config.routes.showroom1 + id1);
                    }
                },
                (fail) => {
                    console.error(fail);
                },
            )
            .catch((error) => {
                console.log(error);
            });
    };

    /* const loggedInUser = localStorage.getItem('startDate');
    console.log(loggedInUser); */

    return (
        <>
            <div className={Styles.count}>
                <div>
                    <h2>Có {numberHotel} khách sạn được tìm thấy</h2>
                </div>
                <div>
                    <h2>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.33 4.538L3.21004 2.65799V15.2196C3.21004 15.6496 3.55798 15.9977 3.98808 15.9977C4.41804 15.9977 4.76612 15.6497 4.76612 15.2196V2.65799L6.64616 4.538C6.79822 4.69006 6.99814 4.76595 7.19609 4.76595C7.39404 4.76595 7.59413 4.68992 7.74602 4.538C8.05001 4.23401 8.05001 3.74001 7.74602 3.43605L4.54008 0.230016C4.46809 0.158031 4.38006 0.0999961 4.28408 0.0599573C4.28003 0.0580042 4.27613 0.0580042 4.27208 0.0559116C4.18405 0.0199192 4.08807 -3.05176e-05 3.98804 -3.05176e-05C3.88801 -3.05176e-05 3.79203 0.0199188 3.704 0.0559116C3.69996 0.0578647 3.69605 0.0578648 3.692 0.0599573C3.59602 0.0999961 3.50799 0.157892 3.436 0.230016L0.227993 3.43798C-0.0759976 3.74196 -0.0759976 4.23597 0.227993 4.53993C0.531983 4.84182 1.026 4.84182 1.32996 4.53784L1.33 4.538Z"
                                fill="black"
                                fillOpacity="0.6"
                            ></path>
                            <path
                                d="M14.67 11.4622L12.79 13.3422V0.778423C12.79 0.348464 12.4421 0.000396729 12.012 0.000396729C11.582 0.000396729 11.2339 0.348328 11.2339 0.778423V13.3401L9.35389 11.46C9.0499 11.1561 8.55785 11.1561 8.25192 11.46C7.94793 11.764 7.94793 12.258 8.25192 12.562L11.4599 15.77C11.5319 15.8419 11.6199 15.9 11.7159 15.94C11.72 15.942 11.7239 15.942 11.7279 15.9441C11.816 15.9801 11.9119 16 12.012 16C12.112 16 12.208 15.9801 12.296 15.9441C12.3001 15.9421 12.304 15.9421 12.308 15.94C12.404 15.9 12.492 15.8421 12.564 15.77L15.772 12.562C16.076 12.258 16.076 11.764 15.772 11.46C15.468 11.1582 14.974 11.1582 14.67 11.4621L14.67 11.4622Z"
                                fill="black"
                                fillOpacity="0.6"
                            ></path>
                        </svg>
                        <b>Sắp xếp:</b>
                        <select name="" id="">
                            <option value="">Giá tăng dần</option>
                            <option value="">Giá giảm dần</option>
                        </select>
                    </h2>
                </div>
            </div>
            {hotelList.map((hotel, index) => {
                let imageSrc = null;
                if (hotel.img) {
                    try {
                        imageSrc = require(`../../assets/images/${hotel.img}`);
                    } catch (error) {}
                }
                return (
                    <div className={Styles.container} key={index}>
                        <div>
                            <img src={imageSrc} alt="404" />
                        </div>
                        <div className={Styles.title}>
                            <h2>{hotel.name}</h2>
                            <h3>
                                <i className="fa-solid fa-location-dot"></i>
                                {hotel.address}
                            </h3>
                        </div>
                        <div className={Styles.price}>
                            <div className={Styles.contentprice}>
                                <div className={Styles.dprice}>
                                    <h4>Chỉ từ</h4>
                                    <h5>
                                        {hotel.minPrice.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}{' '}
                                        \VNĐ
                                    </h5>
                                    <h6>phòng/đêm</h6>
                                </div>

                                <button className={Styles.button} onClick={() => handleClick(hotel.id)}>
                                    ĐẶT NGAY
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default SreachPage;
