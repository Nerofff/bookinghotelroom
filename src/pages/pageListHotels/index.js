import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './ListHotel.module.scss';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomeService from '~/utils/HomeService';

const cx = classNames.bind(styles);
function ListHotels(props) {
    /* const ListHotel = [
        'muong-thanh-grand-nt_1678348809.jpg',
        'muong-thanh-vien-trieu-1417x796_1663925639.jpg',
        'z4146179582292_f75c4a00824025478db5722185b4f700_1678347924.jpg',
        'nha-trang-doc_1653646161.jpg',
    ]; */
    const [hotelList, setHotelList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        HomeService.getAllHotelByProvinceId(id)
            .then((res) => {
                setHotelList(res.data);
                localStorage.setItem('provinceId', id);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner-wrapper')}>
                <img src={images.banner} alt="banner" />
            </div>

            <div className={cx('content-wrapper')}>
                <div className={cx('content-inner')}>
                    <h1>KHÁCH SẠN TẠI...</h1>
                    <div className={cx('inner')}>
                        {hotelList.map((hotel, index) => {
                            let imageSrc = null;
                            if (hotel.img) {
                                try {
                                    imageSrc = require(`../../assets/images/${hotel.img}`);
                                } catch (error) {}
                            }
                            return (
                                <Link to={config.routes.pagehotel1 + hotel.id} className={cx('Link')} key={index}>
                                    <div className={cx('item')}>
                                        <img src={imageSrc} alt="" />
                                        <div className={cx('hotelName')}>{hotel.name}</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
}
export default ListHotels;
