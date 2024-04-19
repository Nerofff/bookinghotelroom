import { Link } from 'react-router-dom';
import Styles from './Sidebar.module.scss';
import React, { useState } from 'react';
import config from '~/config';

function SideBar() {
    const [activeLink, setActiveLink] = useState('ContentArena');

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };
    return (
        <>
            <div className={Styles.sidebar}>
                <Link to={config.routes.home} className={Styles.sidebar__nav__item__text}>
                    <div className={Styles.sidebar__header}>Trang Admin </div>
                </Link>
                <ul className={Styles.sidebar__nav}>
                    <Link to={config.routes.RoomAdmin} className={Styles.sidebar__nav__item__text}>
                        <li
                            className={`${Styles.sidebar__nav__item} ${
                                activeLink === 'ContentArena' ? Styles['sidebar__nav__item--active'] : ''
                            }`}
                            onClick={() => handleLinkClick('ContentArena')}
                        >
                            <i className={`fa-solid fa-hotel ${Styles.sidebar__nav__item__icon}`}></i>
                            <span>Quản lý Phòng</span>
                        </li>
                    </Link>
                    <Link to={config.routes.HotelAdmin} className={Styles.sidebar__nav__item__text}>
                        <li
                            className={`${Styles.sidebar__nav__item} ${
                                activeLink === 'users' ? Styles['sidebar__nav__item--active'] : ''
                            }`}
                            onClick={() => handleLinkClick('users')}
                        >
                            <i className={`fas fa-users ${Styles.sidebar__nav__item__icon}`}></i>
                            <span>Quản lý khách sạn</span>
                        </li>
                    </Link>
                    <Link to={config.routes.ProvinceAdmin} className={Styles.sidebar__nav__item__text}>
                        <li
                            className={`${Styles.sidebar__nav__item} ${
                                activeLink === 'Province' ? Styles['sidebar__nav__item--active'] : ''
                            }`}
                            onClick={() => handleLinkClick('Province')}
                        >
                            <i className={`fas fa-users ${Styles.sidebar__nav__item__icon}`}></i>
                            <span>Quản lý Tỉnh</span>
                        </li>
                    </Link>
                    <Link to={config.routes.UserAdmin} className={Styles.sidebar__nav__item__text}>
                        <li
                            className={`${Styles.sidebar__nav__item} ${
                                activeLink === 'products' ? Styles['sidebar__nav__item--active'] : ''
                            }`}
                            onClick={() => handleLinkClick('products')}
                        >
                            <i className={`fa-solid fa-file-invoice ${Styles.sidebar__nav__item__icon}`}></i>
                            <span className={Styles.sidebar__nav__item__text}>Quản lý Tài khoản</span>
                        </li>
                    </Link>
                    <li
                        className={`${Styles.sidebar__nav__item} ${
                            activeLink === 'settings' ? Styles['sidebar__nav__item--active'] : ''
                        }`}
                        onClick={() => handleLinkClick('settings')}
                    >
                        <i className={`fas fa-cog ${Styles.sidebar__nav__item__icon}`}></i>
                        <span className={Styles.sidebar__nav__item__text}>Settings</span>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SideBar;
