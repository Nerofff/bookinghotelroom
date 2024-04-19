import { useEffect, useRef, useState } from 'react';
import Styles from '../PageRoomAdmin/PageRoomAdmin.module.scss';

import AdminService from '~/utils/AdminService';

function UserAdmin() {
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);
    const [accountName, setAccountName] = useState('');

    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    /*  const [role, setRole] = useState(''); */

    const [showUserList, setShowUserList] = useState([]);
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
        AdminService.getAllUser()
            .then((res) => {
                setUserList(res.data);
                setShowUserList(res.data.slice(0, pageSize));
                setButton(Math.ceil(res.data.length / pageSize));
            })
            .catch((error) => {
                console.log(error);
            });
        AdminService.getAllRole()
            .then((res) => {
                setRoleList(res.data);
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

        /*   if (element === 1) {
            setPage(1);
        } else {
            var t = (element - page2) * 3;
            setPage(page + t);
            setPage2(element);
        } */

        setShowUserList(userList.slice(end - pageSize, end));
    };

    const EditRole = (id) => {
        /*  const user = {
            id: id,
        }; */

        const userId = id; // ID của user cần tìm
        const user = showUserList.find((u) => u.id === userId);
        console.log(user);
        AdminService.editRoleUser(user)
            .then((res) => {
                if (res.data.message === 'Role exits') {
                    setMsg('Tài khoản người dùng hiện đã là quyền ' + user.roleName);
                } else if (res.data.message === 'User not exits') {
                    setMsg('Tài khoản người dùng hiện đã bị xóa ');
                } else {
                    setMsg('Tài khoản người dùng hiện đã cập nhật quyền thành công ');
                    setPage(1);
                    init();
                }
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

        AdminService.getSearchUser(search)
            .then((res) => {
                setPage(1);
                setUserList(res.data);
                setShowUserList(res.data.slice(0, pageSize));
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
                                    Danh Sách Tất Cả Các Tài Khoản
                                    {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                                </div>

                                <div className="card-body">
                                    {/* <div className={Styles.new}>
                                        <Link to={config.routes.AddProvince} className={Styles.Link}>
                                            <div className={Styles.newinner}>
                                                Create new Province <i className="fa-solid fa-circle-plus"></i>
                                            </div>
                                        </Link>
                                    </div>
                                    <hr /> */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên Người Dùng</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Số Điện Thoại</th>
                                                <th scope="col">Quyền Hạn</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showUserList.map((p, num) => {
                                                /*  let role = p.roleName; */
                                                /* setRole(); */
                                                return (
                                                    <tr key={num + 1}>
                                                        <td>{num + page}</td>
                                                        <td>{p.userName}</td>
                                                        <td>{p.email}</td>
                                                        <td>{p.phone}</td>
                                                        <td>
                                                            <select
                                                                value={p.roleName}
                                                                name="role"
                                                                onChange={(event) => {
                                                                    /*  role = event.target.value;
                                                                    console.log(role); */
                                                                    const newRole = event.target.value;
                                                                    /*  setUserList((prevUserList) =>
                                                                        prevUserList.map((user) =>
                                                                            user.id === p.id
                                                                                ? { ...user, roleName: newRole }
                                                                                : user,
                                                                        ),
                                                                    ); */

                                                                    setShowUserList((prevUserList) =>
                                                                        prevUserList.map((user) =>
                                                                            user.id === p.id
                                                                                ? { ...user, roleName: newRole }
                                                                                : user,
                                                                        ),
                                                                    );
                                                                }}
                                                                className="form-control"
                                                            >
                                                                {roleList.map((role, num) => {
                                                                    return (
                                                                        <option value={role} key={num + 1}>
                                                                            {role}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => EditRole(p.id)}
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                Chỉnh sửa
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

export default UserAdmin;
