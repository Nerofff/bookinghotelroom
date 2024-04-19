import { useEffect, useRef, useState } from 'react';
import Styles from '../PageRoomAdmin/PageRoomAdmin.module.scss';
import { Link } from 'react-router-dom';

import config from '~/config';
import AdminService from '~/utils/AdminService';

function ProvinceAdmin() {
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);
    const [accountName, setAccountName] = useState('');

    const [provinceList, setProvinceList] = useState([]);
    const [showProvinceList, setShowprovinceList] = useState([]);
    const [pageSize] = useState(2);
    const [page, setPage] = useState(1);
    const [pageButton, setButton] = useState(1);

    const [msg, setMsg] = useState('');
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        setAccountName(userId.loginName);
        AdminService.getAllProvince()
            .then((res) => {
                setProvinceList(res.data);
                setShowprovinceList(res.data.slice(0, pageSize));
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
        setShowprovinceList(provinceList.slice(end - pageSize, end));
    };

    const deleteProvince = (id) => {
        AdminService.deleteProvince(id)
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
                            /* onChange={handleChange} */
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
                                    Danh Sách Tất Cả Các Tỉnh Thành
                                    {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                                </div>

                                <div className="card-body">
                                    <div className={Styles.new}>
                                        <Link to={config.routes.AddProvince} className={Styles.Link}>
                                            <div className={Styles.newinner}>
                                                Thêm Tỉnh <i className="fa-solid fa-circle-plus"></i>
                                            </div>
                                        </Link>
                                    </div>
                                    <hr />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tỉnh Thành</th>
                                                <th scope="col">Ảnh</th>
                                                <th scope="col">Hành Động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showProvinceList.map((p, num) => {
                                                let imageSrc = null;
                                                if (p.img) {
                                                    try {
                                                        imageSrc = require(`../../assets/images/${p.img}`);
                                                    } catch (error) {}
                                                }
                                                return (
                                                    <tr key={num + 1}>
                                                        <td>{num + page}</td>
                                                        <td>{p.name}</td>
                                                        <td>
                                                            <img className={Styles.imgProvince} src={imageSrc} alt="" />
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={config.routes.editProvince1 + p.id}
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                Sửa
                                                            </Link>
                                                            <button
                                                                onClick={() => deleteProvince(p.id)}
                                                                className="btn btn-sm btn-danger ms-1"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
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

export default ProvinceAdmin;
