import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ThanhSreach.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import AdminService from '~/utils/AdminService';
import config from '~/config';
const cx = classNames.bind(styles);

function Search() {
    const [startDate, setStartDate] = useState(() => {
        const start = new Date(localStorage.getItem('startDate'));

        return start;
    });
    const [endDate, setEndDate] = useState(() => {
        const end = new Date(localStorage.getItem('endDate'));

        /*   const today = new Date();
        const futureDate = new Date(today.setDate(today.getDate() + 2)); */
        return end;
    });
    const [provinceList, setProvinceList] = useState([]);
    const navigate = useNavigate();
    const [province, setProvince] = useState('');

    useEffect(() => {
        AdminService.getAllProvince()
            .then((res) => {
                setProvinceList(res.data);
                /*  res.data.forEach((element) => {
                    setProvince((prevHotels) => element.id);
                }); */
                setProvince(localStorage.getItem('provinceId'));
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

    function onChangeDateHandler(value) {
        setStartDate(value);
    }
    function onChangeDateHandler2(value1) {
        setEndDate(value1);
    }

    const handleClick = (event) => {
        event.preventDefault();
        const test = new Date();
        if (endDate > startDate && startDate >= test) {
            localStorage.setItem('startDate', startDate.toISOString());
            localStorage.setItem('endDate', endDate.toISOString());
            localStorage.setItem('provinceId', province);
            navigate(config.routes.searchpage1 + province);
        } else if (startDate < test) {
            alert('Ngày nhận phải lớn hơn ngày hiện tại ');
        } else {
            alert(' Ngày trả phải lớn hơn ngày nhận phòng');
        }
    };
    return (
        <div className={cx('SreachBar')}>
            <div>
                <h1>Vui lòng chọn tỉnh</h1>
                {/*    <input type="text2" autoComplete="off" placeholder="Chọn địa điểm" /> */}
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
            <div>
                <h1>Vui lòng chọn ngày nhận phòng </h1>
                <div className={cx('frameSearch')}>
                    <i className="fa-sharp fa-solid fa-table"></i>
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
                <h1>Vui lòng chọn ngày trả phòng </h1>
                <div className={cx('frameSearch')}>
                    <i className="fa-sharp fa-solid fa-table"></i>
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
                <button className={cx('button')} type="sumbit" onClick={handleClick}>
                    <i className="fa-solid fa-magnifying-glass-arrow-right"></i>
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
}

export default Search;
