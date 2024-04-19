import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('footer-col-1')}>
                        <h3>Tải Ngay Tại</h3>
                        <p>Có thể tại trên Google Play hoặc App Store </p>
                        <div className={cx('app-logo')}>
                            <a
                                href={
                                    'https://chrome.google.com/webstore/detail/google-play/komhbcfkdcgmcdoenjcjheifdiabikfi?hl=vi'
                                }
                            >
                                <img src={images.ggplay} alt="google play" />
                            </a>
                            <a href={'https://www.apple.com/app-store/'}>
                                <img src={images.appstore} alt="app store" />
                            </a>
                        </div>
                    </div>

                    <div className={cx('footer-col-2')}>
                        <img src={images.download} alt="logo" />
                        <p>
                            Mục đích của chúng tôi là làm cho niềm vui và lợi ích của du lịch có thể tiếp cận được với
                            nhiều người một cách bền vững
                        </p>
                    </div>

                    <div className={cx('footer-col-3')}>
                        <h3>Liên Kết</h3>
                        <ul>
                            <li>Giảm Giá</li>
                            <li>Bài Đăng</li>
                            <li>Chính Sách</li>
                        </ul>
                    </div>

                    <div className={cx('footer-col-4')}>
                        <h3>Theo Dõi</h3>
                        <ul>
                            <li>
                                <a href={'https://www.facebook.com/profile.php?id=100055445435650'}>Facebook</a>
                            </li>
                            <li>
                                <a href={'https://twitter.com/?lang=vi'}>Twitter</a>
                            </li>
                            <li>
                                <a href={'https://www.instagram.com/'}>Instagram</a>
                            </li>
                            <li>
                                <a
                                    href={
                                        'https://www.youtube.com/watch?v=jxEz8ZPVpAU&list=RDjxEz8ZPVpAU&start_radio=1'
                                    }
                                >
                                    Youtube
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className={cx('copyright')}>Bản Quyền Thuộc Về - Nguyễn Huy Hoàng Codes</p>
            </div>
        </div>
    );
}

export default Footer;
