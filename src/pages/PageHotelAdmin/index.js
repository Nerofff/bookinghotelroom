import { useEffect, useRef, useState } from 'react';
import Styles from '../PageRoomAdmin/PageRoomAdmin.module.scss';
import { Link } from 'react-router-dom';

import config from '~/config';
import AdminService from '~/utils/AdminService';

function HotelAdmin() {
    // Này là trang show Hotel
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);
    const [accountName, setAccountName] = useState('');

    const [hotelList, setHotelList] = useState([]);
    const [showHotelList, setShowHotelList] = useState([]);
    const [pageSize] = useState(4);
    const [page, setPage] = useState(1);
    const [pageButton, setButton] = useState(1);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        setAccountName(userId.loginName);
        AdminService.getAllHotel()
            .then((res) => {
                setHotelList(res.data);
                setShowHotelList(res.data.slice(0, pageSize));
                setButton(Math.ceil(res.data.length / pageSize));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const taoDaySo = (number) => {
        var arr = [];
        for (let i = 1; i <= number; i++) {
            arr.push(i);
        }
        return arr.map((element) => {
            return (
                <div key={element} onClick={() => chuyen(element)}>
                    <button>{element}</button>
                </div>
            );
        });
    };

    const chuyen = (element) => {
        var end = pageSize * element;
        var t = 0;
        for (var i = 1; i < element; i++) {
            t = t + pageSize - 1;
        }
        setPage(element + t);
        setShowHotelList(hotelList.slice(end - pageSize, end));
    };

    const deleteHotel = (id) => {
        AdminService.deleteHotel(id)
            .then((res) => {
                setMsg('Xóa Thành Công');
                setPage(1);
                init();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClick = () => {
        setIsActive(!isActive);
        inputRef.current.focus();
    };

    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        const search = event.target.value;

        AdminService.getSearchHotel(search)
            .then((res) => {
                setPage(1);
                setHotelList(res.data);
                setShowHotelList(res.data.slice(0, pageSize));
                setButton(Math.ceil(res.data.length / pageSize));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div>
                <div className={Styles.AreaHeader}>
                    <div className={`${Styles.parent} ${isActive ? Styles.active : ''}`}>
                        <input
                            className={Styles.input}
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            onChange={handleChange}
                        />

                        <button className={Styles.btnnn} onClick={handleClick}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <div className={Styles.user}>
                        <h1>{accountName}</h1>
                        <i className="fa-solid fa-building-user fa-flip-horizontal fa-2xl"></i>
                    </div>
                </div>

                <div className="mt-0">
                    <div className="row">
                        <div className="col-md-13">
                            <div className="card">
                                <div className="card-header fs-1 text-center">
                                    Danh Sách Tất Cả Khách Sạn
                                    {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                                </div>

                                <div className="card-body">
                                    <div className={Styles.new}>
                                        <Link to={config.routes.AddHotel} className={Styles.Link}>
                                            <div className={Styles.newinner}>
                                                Tạo Khách Sạn Mới <i className="fa-solid fa-circle-plus"></i>
                                            </div>
                                        </Link>
                                    </div>
                                    <hr />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên Khách Sạn</th>
                                                <th scope="col">Email</th>
                                                <th scope="col1" className={Styles.Address}>
                                                    Địa Chỉ
                                                </th>
                                                <th scope="col">Số Điện Thoại</th>
                                                <th scope="col">Tỉnh Thành</th>
                                                <th scope="col">Hành Động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showHotelList.map((h, num) => (
                                                <tr key={num + 1}>
                                                    <td>{num + page}</td>
                                                    <td>{h.name}</td>
                                                    <td>{h.email}</td>
                                                    <td>{h.address}</td>
                                                    <td>{h.phone}</td>
                                                    <td>{h.provinceName}</td>
                                                    <td className={Styles.btn}>
                                                        <Link
                                                            /* to={'editProduct/' + p.id} */
                                                            to={config.routes.editHotel1 + h.id}
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            Sửa
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteHotel(h.id)}
                                                            className="btn btn-sm btn-danger ms-1"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className={Styles.daySo}>{taoDaySo(pageButton)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelAdmin;
