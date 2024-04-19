import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Countrys.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useEffect, useState } from 'react';
import AdminService from '~/utils/AdminService';

const cx = classNames.bind(styles);
function Country(props) {
    /* const countrys = [
        'nha-trang-doc_1653646161.jpg',
        'quang-ninh_1653646313.jpg',
        'ho_chi_minh.jpeg',
        'da-nang_1653644753.jpg',
        'du-lich-ho-hoan-kiem-gan-ha-noi_1653635697.jpeg',
        'sapa_1653647016.jpg',
    ]; */
    const [provinceList, setProvinceList] = useState([]);
    useEffect(() => {
        AdminService.getAllProvince()
            .then((res) => {
                setProvinceList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner-wrapper')}>
                <img src={images.banner} alt="banner" />
            </div>

            <div className={cx('content-wrapper')}>
                <div className={cx('content-inner')}>
                    <h1>ĐIỂM ĐẾN NỔI BẬT</h1>
                    <div className={cx('inner')}>
                        {provinceList.map((province, index) => {
                            let imageSrc = null;
                            if (province.img) {
                                try {
                                    imageSrc = require(`../../assets/images/${province.img}`);
                                } catch (error) {}
                            }

                            return (
                                <Link
                                    to={config.routes.pagelisthotel1 + province.id}
                                    className={cx('link')}
                                    key={index}
                                >
                                    <div className={cx('item')}>
                                        <img src={imageSrc} alt="404" />
                                        <div className={cx('countryName')}>{province.name}</div>
                                        <hr />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Country;
