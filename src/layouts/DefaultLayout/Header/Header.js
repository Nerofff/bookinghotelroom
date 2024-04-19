import images from '~/assets/images';
import config from '~/config';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
const cx = classNames.bind(styles);

const Login = styled.div`
    display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;
const Account = styled.div`
    display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

function Header() {
    const [showAccount, setShowAccount] = useState(false);

    const [showLogin, setShowLogin] = useState(true);
    const [accountName, setAccountName] = useState('');
    console.log(showAccount.toString());

    const init = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (userId !== null) {
            setShowAccount(true);
            setShowLogin(false);
            setAccountName(userId.loginName);
        } else {
            setShowAccount(false);
            setShowLogin(true);
        }
    };

    useEffect(() => {
        init();
    }, []);
    const handleClick = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('Token');
        init();
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div>
                    <i className="fa-solid fa-phone"> </i>
                    <i>0393109756</i>

                    <a href={'https://www.facebook.com/profile.php?id=100055445435650'}>
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href={'https://www.instagram.com/'}>
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href={'https://www.youtube.com/watch?v=jxEz8ZPVpAU&list=RDjxEz8ZPVpAU&start_radio=1'}>
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                </div>
                <div>
                    <Link to={config.routes.home} className={cx('item2')}>
                        <img className={cx('img')} src={images.download} alt="logo" />
                    </Link>
                </div>
                <div>
                    <div className={cx('item3')}>
                        <Account isVisible={showAccount}>
                            <Dropdown className={cx('color')}>
                                <Dropdown.Toggle variant="Warning" id="dropdown-basic" className={cx('color1')}>
                                    <i className="fa-solid fa-user-large"> </i>
                                    {accountName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="div">
                                        <Link to={config.routes.RoomAdmin} className={cx('link')}>
                                            Trang Admin
                                        </Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item as="div" onClick={handleClick}>
                                        Đăng Xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Account>
                        <Login isVisible={showLogin}>
                            <Link to={config.routes.login} className={cx('link')}>
                                Đăng Nhập
                            </Link>
                        </Login>

                        <Dropdown className={cx('color')}>
                            <Dropdown.Toggle variant="Warning" id="dropdown-basic">
                                <img src={images.language} alt="language" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Vietnamese</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className={cx('color')}>
                            <Dropdown.Toggle variant="Warning" id="dropdown-basic">
                                <img src={images.all} alt="all" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as="div">
                                    <Link to={config.routes.country} className={cx('link')}>
                                        Điểm đến
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>Ưu đãi</Dropdown.Item>
                                <Dropdown.Item>Combo</Dropdown.Item>
                                <Dropdown.Item>Tin tức</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
