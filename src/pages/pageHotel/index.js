import images from '~/assets/images';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames/bind';
import styles from './Hotel.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from '~/config';

import styled from 'styled-components';
import HomeService from '~/utils/HomeService';
import ShoppingCartService from '~/utils/ShoppingCartService';

const cx = classNames.bind(styles);

const Dates = styled.div`
    display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;
function Hotel(props) {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const today = new Date();
        const futureDate = new Date(today.setDate(today.getDate() + 1));
        return futureDate;
    });
    const [roomList, setRoomList] = useState([]);
    const [hotel, sethotel] = useState('');
    const { id } = useParams();

    useEffect(() => {
        HomeService.getHotelById(id)
            .then((res) => {
                sethotel(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        HomeService.getAllRoomByHotelId(id)
            .then((res) => {
                setRoomList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const calculateDays = () => {
        const timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };
    function onChangeDateHandler(value) {
        setStartDate(value);
    }
    function onChangeDateHandler2(value1) {
        setEndDate(value1);
    }
    let imageSrc = null;
    if (hotel.img) {
        try {
            imageSrc = require(`../../assets/images/${hotel.img}`);
        } catch (error) {}
    }

    const handleClickBooking = (event) => {
        event.preventDefault();
        const test = new Date();

        if (
            startDate.getDate() === endDate.getDate() &&
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getYear() === endDate.getYear()
        ) {
            alert(' Ngày trả phải lớn hơn ngày nhận phòng');
        } else if (startDate < test) {
            alert('Ngày nhận phải lớn hơn ngày hiện tại ');
        } else if (startDate.valueOf() < endDate.valueOf() && startDate >= test) {
            localStorage.setItem('startDate', startDate.toISOString());
            localStorage.setItem('endDate', endDate.toISOString());
            /*  localStorage.setItem('provinceId', province); */

            const sodem = Math.floor(parseFloat(calculateDays()));
            console.log(sodem);
            ShoppingCartService.clearCart(sodem)
                .then(
                    (res) => {
                        if (res.data === 'clear success') {
                            navigate(config.routes.showroom1 + hotel.id);
                        }
                    },
                    (fail) => {
                        console.error(fail);
                    },
                )
                .catch((error) => {
                    console.log(error);
                });

            /* navigate(config.routes.showroom1 + hotel.id); */
        } else {
            alert(' Ngày trả phải lớn hơn ngày nhận phòng');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner-wrapper')}>
                <img src={imageSrc} alt="banner" />
            </div>

            <div className={cx('tittle-wrapper')}>
                <div className={cx('tittle-inner')}>
                    <div className={cx('inner-col1')}>
                        <h3 className={cx('tittle')}>{hotel.name}</h3>
                        <h6 className={cx('address')}>
                            <i className="fa-solid fa-location-dot"></i> {hotel.address}
                        </h6>
                        <div className={cx('email')}>
                            <h6>Email: {hotel.email}</h6>
                            <h6>Tel: +{hotel.phone}</h6>
                        </div>
                    </div>
                    <div className={cx('inner-col2')}>
                        <div className={cx('Evaluate')}>
                            <i className={'fa-solid fa-car-side ' + ' ' + cx('car')}></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <p>(122 view)</p>
                        </div>
                        <div>
                            <button className={cx('button')} onClick={handleClick}>
                                <h4>ĐẶT PHÒNG NGAY</h4>
                            </button>
                        </div>
                    </div>
                </div>
                <Dates className={cx('date-wrapper')} isVisible={isVisible}>
                    <div className={cx('date-inner')}>
                        <div>
                            <h6>Ngày nhận</h6>
                            <div className={cx('inner-input')}>
                                <i className="fa-solid fa-calendar"></i>
                                <DatePicker
                                    minDate={startDate}
                                    selected={startDate}
                                    startDate={startDate}
                                    onChange={onChangeDateHandler}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText={'Chọn ngày nhập'}
                                />
                            </div>
                        </div>
                        <div>
                            <h6>Ngày trả</h6>
                            <div className={cx('inner-input')}>
                                <i className="fa-solid fa-calendar"></i>
                                <DatePicker
                                    minDate={startDate}
                                    selected={endDate}
                                    endDate={endDate}
                                    onChange={onChangeDateHandler2}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText={'Chọn ngày trả'}
                                />
                            </div>
                        </div>
                        <div>
                            <Link>
                                <button className={cx('button')} type="sumbit" onClick={handleClickBooking}>
                                    ĐẶT PHÒNG
                                </button>
                            </Link>
                        </div>
                    </div>
                </Dates>
            </div>

            <div className={cx('description-wrapper')}>
                <div className={cx('description-inner')}>
                    <div className={cx('inner-col1')}>
                        <h5>{hotel.description}</h5>
                        <h5>{hotel.description1}</h5>
                        <h5>{hotel.description2}</h5>
                    </div>
                    <div className={cx('inner-col2')}>
                        <h5 className={cx('heading')}>VÌ SAO NÊN CHỌN MƯỜNG THANH?</h5>
                        <h5>Giá không thể tốt hơn</h5>
                        <h5>Đặt phòng an toàn</h5>
                        <h5>Quản lý đặt phòng trực tuyến</h5>
                        <h5>Tiện nghi và vị trí tuyệt vời</h5>
                        <h5>Nhân viên nói tiếng Việt & Anh</h5>
                    </div>
                </div>
            </div>

            <div className={cx('room-wrapper')}>
                <div className={cx('room-inner')}>
                    <h3>CÁC HẠNG PHÒNG</h3>
                    <div className={cx('inner')}>
                        {roomList.map((room, index) => {
                            let imageSrc = null;
                            if (room.img) {
                                try {
                                    imageSrc = require(`../../assets/images/${room.img}`);
                                } catch (error) {}
                            }
                            return (
                                <div key={index} className={cx('item')}>
                                    <img src={imageSrc} alt="aaa" />
                                    <div className={cx('roomName')}>{room.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={cx('map-wrapper')}>
                <div className={cx('map-inner')}>
                    <h1>VỊ TRÍ TUYỆT VỜI CỦA MƯỜNG THANH LUXURY VIỄN TRIỀU</h1>
                    <div className={cx('inner')}>
                        <img src={images.map} alt="map" />
                    </div>
                </div>
            </div>

            <div className={cx('Evaluate-wrapper')}>
                <div className={cx('Evaluate-inner')}>
                    <h1>ĐÁNH GIÁ CỦA KHÁCH HÀNG VỀ MƯỜNG THANH LUXURY VIỄN TRIỀU</h1>
                    <div className={cx('inner')}>
                        <div className={cx('item1')}>
                            <h3>5</h3>
                            <div className={cx('item1-1')}>
                                <div>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <h3>122 đánh giá</h3>
                            </div>
                        </div>
                        <div className={cx('item2')}>
                            <h3>Vị trí</h3>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div className={cx('item2')}>
                            <h3>Sạch sẽ</h3>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div className={cx('item2')}>
                            <h3>Dịch vụ</h3>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div className={cx('item2')}>
                            <h3>Giá tiền</h3>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Hotel;
