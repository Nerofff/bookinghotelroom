import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Content from './contents/contents';
import 'bootstrap/dist/css/bootstrap.min.css';
import images from '~/assets/images';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import NewsL from './news/newsL/newsL';
import NewsR from './news/newsR/newsR';
import AdminService from '~/utils/AdminService';
import config from '~/config';

const cx = classNames.bind(styles);
function Home() {
    const [provinceList, setProvinceList] = useState([]);
    const navigate = useNavigate();
    const [province, setProvince] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const today = new Date();
        const futureDate = new Date(today.setDate(today.getDate() + 1));
        return futureDate;
    });

    useEffect(() => {
        AdminService.getAllProvince()
            .then((res) => {
                setProvinceList(res.data);
                res.data.forEach((element) => {
                    setProvince((prevHotels) => element.id);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleChange(event) {
        const province = event.target.value;

        setProvince(province);
        console.log(province);
    }
    /*  let IselectedValue = ' ';
    if (province !== ' ') {
        IselectedValue = province;
    } */
    function onChangeDateHandler(value) {
        setStartDate(value);
        /* console.log(startDate); */
    }
    function onChangeDateHandler2(value1) {
        setEndDate(value1);
    }

    const handleClick = (event) => {
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
            localStorage.setItem('provinceId', province);
            navigate(config.routes.searchpage1 + province);
        } else {
            alert(' Ngày trả phải lớn hơn ngày nhận phòng');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('carousel-wrapper')}>
                <Carousel className={cx('Carousel')}>
                    <Carousel.Item className={cx('Carousel-item')}>
                        <img className="d-block w-100" src={images.dalat} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item className={cx('Carousel-item')}>
                        <img className="d-block w-100" src={images.hanoi} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item className={cx('Carousel-item')}>
                        <img className="d-block w-100" src={images.hue} alt="Third slide" />
                    </Carousel.Item>
                    <Carousel.Item className={cx('Carousel-item')}>
                        <img className="d-block w-100" src={images.danang} alt="four slide" />
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className={cx('sreach-wrapper')}>
                <form className={cx('sreach-inner')}>
                    <div>
                        <h6>Bạn muốn nghĩ dưỡng ở đâu ?</h6>

                        <div className={cx('inner-input')}>
                            <i className="fa-solid fa-location-dot"></i>
                            {/*  <input type="text"></input> */}
                            <select value={province} name="province" onChange={handleChange} className={cx('Province')}>
                                {provinceList.map((h, num) => {
                                    return (
                                        <option value={h.id} key={num + 1}>
                                            {h.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
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
                        {/* <Link to={config.routes.searchpage1 + province}> */}
                        <button className={cx('button')} type="sumbit" onClick={handleClick}>
                            <i className="fa-solid fa-magnifying-glass"> </i>
                            Tìm kiếm
                        </button>
                        {/* </Link> */}
                    </div>
                </form>
            </div>
            <div className={cx('certification-wrapper')}>
                <div className={cx('certification-inner')}>
                    <div className={cx('inner-item')}>
                        <i className="fa-solid fa-circle-check">
                            <h5>Đảm bảo giá tốt nhất</h5>
                        </i>
                    </div>
                    <div className={cx('inner-item')}>
                        <i className="fa-solid fa-map-location-dot">
                            <h5 className={cx('item2')}>Đa dạng điểm điếm và lựa chọn tốt nhất</h5>
                        </i>
                    </div>
                    <div className={cx('inner-item')}>
                        <i className="fa-solid fa-ranking-star">
                            <h5 className={cx('item2')}>Đảm bảo chất lượng phục vụ tốt nhất</h5>
                        </i>
                    </div>
                    <div className={cx('inner-item')}>
                        <i className="fa-solid fa-headset">
                            <h5 className={cx('item2')}> Hỗ trợ khách hàng nhanh nhất</h5>
                        </i>
                    </div>
                </div>
            </div>

            <div className={cx('country-wrapper')}>
                <Content />
            </div>

            <div className={cx('news-wrapper')}>
                <div className={cx('news-inner')}>
                    <h2 className={cx('heading')}>Tin tức nổi bật</h2>
                    <div className={cx('inner')}>
                        <NewsL />
                        <NewsR />
                    </div>
                </div>
            </div>

            <div className={cx('map-wrapper')}>
                <div className={cx('map-inner')}>
                    <div className={cx('inner-img')}>
                        <img src={images.vn} alt="map" />
                    </div>
                    <div className={cx('inner-text')}>
                        <div className={cx('text')}>
                            <img src={images.hotel} alt="hotel" />
                            <div className={cx('text1')}>
                                <h1>60</h1>
                                <p>KHÁCH SẠN</p>
                                <h1>33</h1>
                                <p>TỈNH THÀNH</p>
                            </div>
                        </div>
                        <div className={cx('text2')}>
                            <p>
                                Tập đoàn khách sạn Mường Thanh được công nhận là "Chuỗi Khách sạn tư nhân lớn nhất Đông
                                Dương" với 60 khách sạn cao cấp đạt chuẩn quốc tế trải dài trên 33 tỉnh thành tại Việt
                                Nam và nước bạn Lào. Hệ thống khách sạn Mường Thanh với 4 phân khúc: Mường Thanh Luxury,
                                Mường Thanh Grand, Mường Thanh Holiday và Mường Thanh hướng đến việc phục vụ đa dạng nhu
                                cầu của mọi du khách trong nước và quốc tế.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
