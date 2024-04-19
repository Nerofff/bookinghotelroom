import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import config from '~/config';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            await axios
                .post('http://localhost:8080/api/v1/user/login', {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.userDTO.roleName === 'ADMIN') {
                        const user = { email, role: 'admin' };
                        localStorage.setItem('user', JSON.stringify(user));
                    } else {
                        localStorage.removeItem('user');
                    }
                    const userId = { email, loginName: res.data.userDTO.userName, id: res.data.userDTO.id };
                    localStorage.setItem('userId', JSON.stringify(userId));
                    localStorage.setItem('Token', JSON.stringify(res.data.token));
                    navigate(config.routes.home);
                });
        } catch (err) {
            alert('Tên tài khoản hoặc mật khẩu không đúng');
        }
    }

    return (
        <div className={cx('login-wapper')}>
            <div className={cx('img')}>
                <img src={images.login} alt="" />
            </div>
            <div className={cx('login-box')}>
                <Link to={config.routes.home} className={cx('Link')}>
                    <h2>Đăng Nhập</h2>
                </Link>
                <form>
                    <div className={cx('user-box')}>
                        <label>Email Đăng Nhập</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('user-box')}>
                        <label>Mật Khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('button')}>
                        <div className={cx('lgsi')}>
                            <button type="submit" className={cx('snip1582')} onClick={login}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <div className={cx('lgsi')}>
                            <Link to={config.routes.register}>
                                <button className={cx('snip1582')}>Đăng kí</button>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <div className={cx('lgsi')}>
                            <button className={cx('snip1582')}>Quên mật khẩu?</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;
