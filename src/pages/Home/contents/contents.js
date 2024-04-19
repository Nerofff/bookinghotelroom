import styled from 'styled-components';
import styles from './contents.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { SmoothHorizontalScrolling } from '~/utils';
import config from '~/config';
import { Link } from 'react-router-dom';
import AdminService from '~/utils/AdminService';

/* const countrys = [
    'sapa_1653647016.jpg',
    'da-nang_1653644753.jpg',
    'du-lich-ho-hoan-kiem-gan-ha-noi_1653635697.jpeg',
    'nha-trang-doc_1653646161.jpg',
    'ho_chi_minh.jpeg',
    'quang-ninh_1653646313.jpg',
]; */
let CountrysSlider = styled.div`
    grid-template-columns: repeat(1, 400px);
`;

/* AdminService.getAllProvince()
    .then((res) => {
        CountrysSlider = styled.div`
            grid-template-columns: repeat(${res.data.length}, 400px);
        `;
    })
    .catch((error) => {
        console.log(error);
    });
 */
const cx = classNames.bind(styles);
function Content(props) {
    const [provinceList, setProvinceList] = useState([]);
    const sliderRef = useRef();
    const countryRef = useRef();
    const [dragDown, setDragDown] = useState(0);
    const [dragMove, setDragMove] = useState(0);
    const [isDrag, setIsDrag] = useState(false);

    useEffect(() => {
        AdminService.getAllProvince()
            .then((res) => {
                setProvinceList(res.data);
                CountrysSlider = styled.div`
                    grid-template-columns: repeat(${res.data.length}, 33%);
                `;
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    /* useEffect(() => {
        item = 6;
        console.log(item);
    }); */

    const handleScrollRight = () => {
        try {
            const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

            if (sliderRef.current.scrollLeft < maxScrollLeft) {
                SmoothHorizontalScrolling(
                    sliderRef.current,
                    250,
                    countryRef.current.clientWidth * 2,
                    sliderRef.current.scrollLeft,
                );
            }
        } catch (error) {}
    };

    const handleScrollLeft = () => {
        if (sliderRef.current.scrollLeft > 0) {
            SmoothHorizontalScrolling(
                sliderRef.current,
                250,
                -countryRef.current.clientWidth * 2,
                sliderRef.current.scrollLeft,
            );
        }
    };

    useEffect(() => {
        if (isDrag) {
            if (dragMove < dragDown) {
                handleScrollRight();
            }
            if (dragMove > dragDown) {
                handleScrollLeft();
            }
        }
    }, [dragDown, dragMove, isDrag]);
    const onDragStart = (e) => {
        setIsDrag(true);
        setDragDown(e.screenX);
    };

    const onDragEnd = (e) => {
        setIsDrag(false);
    };

    const onDragEnter = (e) => {
        setDragMove(e.screenX);
    };

    return (
        <CountrysRowContainer className={cx('RowContainer')} draggable="false">
            <Link to={config.routes.country} className={cx('Link')}>
                <h3 className={cx('heading')}> Điểm đến nổi bật</h3>
            </Link>

            <CountrysSlider
                className={cx('Slider')}
                ref={sliderRef}
                draggable="true"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
            >
                {provinceList.map((province, index) => {
                    let imageSrc = null;
                    if (province.img) {
                        try {
                            imageSrc = require(`../../../assets/images/${province.img}`);
                        } catch (error) {}
                    }
                    return (
                        <Link key={index} to={config.routes.pagelisthotel1 + province.id} className={cx('Link')}>
                            <div className={cx('countryItem')} ref={countryRef} draggable="false">
                                <img src={imageSrc} alt="" draggable="false" />
                                <div className={cx('countryName')}>{province.name}</div>
                            </div>
                        </Link>
                    );
                })}
            </CountrysSlider>
            <div className={cx('left')} onClick={handleScrollLeft}>
                <i className="fa-solid fa-angles-left"></i>
            </div>
            <div className={cx('right')} onClick={handleScrollRight}>
                <i className="fa-solid fa-angles-right"></i>
            </div>
        </CountrysRowContainer>
    );
}

/* export { countrys }; */
export default Content;

const CountrysRowContainer = styled.div``;
