import { useEffect, useRef, useState } from 'react';
import Styles from './PageRoomAdmin.module.scss';
import { Link } from 'react-router-dom';

import config from '~/config';
import AdminService from '~/utils/AdminService';

function RoomAdmin() {
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);
    const [accountName, setAccountName] = useState('');

    const [roomtList, setRoomtList] = useState([]);
    const [showRoomtList, setShowRoomtList] = useState([]);
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
        AdminService.getAllProduct()
            .then((res) => {
                setRoomtList(res.data);

                setShowRoomtList(res.data.slice(0, pageSize));
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
        setShowRoomtList(roomtList.slice(end - pageSize, end));
    };

    const deleteRoom = (id) => {
        AdminService.deleteRoom(id)
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

        AdminService.getSearchRoom(search)
            .then((res) => {
                setPage(1);
                setRoomtList(res.data);
                setShowRoomtList(res.data.slice(0, pageSize));
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
                                    Danh Sách Tất Cả Các Phòng
                                    {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                                </div>

                                <div className="card-body">
                                    <div className={Styles.new}>
                                        <Link to={config.routes.AddRoom} className={Styles.Link}>
                                            <div className={Styles.newinner}>
                                                Tạo Phòng Mới <i className="fa-solid fa-circle-plus"></i>
                                            </div>
                                        </Link>
                                    </div>
                                    <hr />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên Phòng</th>

                                                <th scope="col">Gía Cả / Đêm</th>
                                                <th scope="col">Số Lượng</th>
                                                <th scope="col">Diện Tích (m²)</th>
                                                <th scope="col">Khách Sạn</th>
                                                <th scope="col">Hành Động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showRoomtList.map((p, num) => (
                                                <tr key={num + 1}>
                                                    <td>{num + page}</td>
                                                    <td>{p.name}</td>
                                                    <td>{p.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </td>
                                                    <td>{p.numberRoom}</td>
                                                    <td>{p.acreage}</td>
                                                    <td>{p.hotelName}</td>
                                                    <td>
                                                        <Link
                                                            /* to={'editProduct/' + p.id} */
                                                            to={config.routes.editRoom1 + p.id}
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            Sửa
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteRoom(p.id)}
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

export default RoomAdmin;
